import { useEffect, useState, useRef } from "react";
import * as S from './styles';
import { observer } from "mobx-react-lite";
import { Colors } from "../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import Button from "../Button";
import Card from "../Card";

const CardsList = observer(() => {
  const [censored, setCensored] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const primaryColor = Colors.RED_PRIMARY_LIGHTER;
  const secondaryColor = Colors.RED_SECONDARY_LIGHTER;

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(`financaWeb.censored.cardslist`);

    setCensored(censoredStatusStoraged === 'true' ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.cardslist`, String(!censored));
  }

  useEffect(() => {
    listRef.current?.addEventListener('mouseenter', () => {
      if (listRef.current)
        listRef.current.style.overflowY = 'scroll'
    });
    listRef.current?.addEventListener('mouseleave', () => {
      if (listRef.current)
        listRef.current.style.overflowY = 'hidden'
    });
  }, []);

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Title color={titleColor}>
            Cartões
          </S.Title>
        </div>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ?
            <FaEye color={titleColor} size={26} />
            :
            <FaEyeSlash color={titleColor} size={26} />
          }
        </S.ViewButton>
      </S.Header>

      <Button
        title="Novo cartão"
        icon={() => <FaPlus color="#FFF" size={25} />}
        colors={{
          PRIMARY_BACKGROUND: primaryColor,
          SECOND_BACKGROUND: secondaryColor,
          TEXT: '#fff'
        }}
      />

      {censored ?
        <S.CensoredContainer>
          <FaBan size={40} color={titleColor} />
        </S.CensoredContainer>
        :
        <S.ItemsList ref={listRef}>
          <Card
            card={{
              limit: 700000,
              color: '#612F74',
              name: 'Nubank',
              pay_date: new Date()
            }}
            invoice={{
              value: 20000
            }}
          />
          <Card
            card={{
              limit: 200000,
              color: '#FF8C00',
              name: 'Inter',
              pay_date: new Date()
            }}
            invoice={{
              value: 0
            }}
          />
        </S.ItemsList>
      }
    </S.Container>
  )
});

export default CardsList;