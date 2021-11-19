import { useState } from 'react';
import * as S from './styles';

import { Colors } from '../../styles/global';
import { FaEye, FaEyeSlash, FaBan } from 'react-icons/fa';
import { getMounthAndYear } from '../../utils/dateFormats';

export default function Estimates() {
  const [censored, setCensored] = useState(false);

  const backgroundColor = Colors.BLUE_SOFT_LIGHTER;
  const graphColor = Colors.ORANGE_SECONDARY_LIGHTER;
  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const regularColor = Colors.BLUE_SECONDARY_LIGHTER;


  return (
    <S.Container>
      <S.Header>
        <S.Title color={titleColor}>Estimativas</S.Title>

        <S.ViewButton onClick={() => setCensored(!censored)}>
          {censored ?
            <FaEye color={titleColor} size={26} />
            :
            <FaEyeSlash color={titleColor} size={26} />
          }
        </S.ViewButton>
      </S.Header>

      <S.GraphContainer backgroundColor={backgroundColor}>
        {censored ?
          <FaBan size={40} color={regularColor} />
          :
          <>
            <S.GraphItem strongColor={textColor} regularColor={regularColor}>
              <strong>
                {getMounthAndYear(new Date(), true)}
              </strong>
              <p>R$ 1.000,00</p>
              <S.GraphIndicator heightIndicator="50" color={graphColor} />
            </S.GraphItem>

            <S.GraphItem strongColor={textColor} regularColor={regularColor}>
              <strong>
                {getMounthAndYear(new Date(), true)}
              </strong>
              <p>R$ 1.000,00</p>
              <S.GraphIndicator heightIndicator="80" color={graphColor} />
            </S.GraphItem>

            <S.GraphItem strongColor={textColor} regularColor={regularColor}>
              <strong>
                {getMounthAndYear(new Date(), true)}
              </strong>
              <p>R$ 1.000,00</p>
              <S.GraphIndicator heightIndicator="50" color={graphColor} />
            </S.GraphItem>

            <S.GraphItem strongColor={textColor} regularColor={regularColor}>
              <strong>
                {getMounthAndYear(new Date(), true)}
              </strong>
              <p>R$ 1.000,00</p>
              <S.GraphIndicator heightIndicator="50" color={graphColor} />
            </S.GraphItem>

            <S.GraphItem strongColor={textColor} regularColor={regularColor}>
              <strong>
                {getMounthAndYear(new Date(), true)}
              </strong>
              <p>R$ 1.000,00</p>
              <S.GraphIndicator heightIndicator="30" color={graphColor} />
            </S.GraphItem>

            <S.GraphItem strongColor={textColor} regularColor={regularColor}>
              <strong>
                {getMounthAndYear(new Date(), true)}
              </strong>
              <p>R$ 1.000,00</p>
              <S.GraphIndicator heightIndicator="20" color={graphColor} />
            </S.GraphItem>
          </>
        }
      </S.GraphContainer>
    </S.Container>
  )
}