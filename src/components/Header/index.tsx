import { Colors } from '../../styles/global';
import * as S from './styles';

import LogoImg from '../../assets/logo.svg';
import DefaultAvatar from '../../assets/icons/user.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  const backgroundColor = Colors.BLUE_PRIMARY_LIGHTER;

  return (
    <S.Container backgroundColor={backgroundColor}>
      <Link to="/">
        <S.Logo src={LogoImg} />
      </Link>

      <S.UserContainer>
        <S.Welcome>
          <S.Text>Bem vindo,</S.Text>
          <S.BoldText>Fulano</S.BoldText>
        </S.Welcome>

        <S.Avatar src={DefaultAvatar} />
      </S.UserContainer>
    </S.Container>
  )
}