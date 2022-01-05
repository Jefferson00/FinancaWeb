import { useEffect, useState, useRef } from "react";
import * as S from './styles';
import { observer } from "mobx-react-lite";
import { Colors } from "../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import ItemView from "../ItemView";
import { useStores } from "../../store";
import { getFullDayOfTheMounth } from "../../utils/dateFormats";
import Button from "../Button";

const IncomeList = observer(() => {
  const [censored, setCensored] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const { financeStore } = useStores();
  const { financeData } = financeStore;
  const { incomes } = financeData;

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const primaryGreen = Colors.GREEN_PRIMARY_LIGHTER;
  const secondaryGreen = Colors.GREEN_SECONDARY_LIGHTER;

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(`financaWeb.censored.incomeList`);

    setCensored(censoredStatusStoraged === 'true' ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.incomeList`, String(!censored));
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
  }, [])

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Title color={titleColor}>
            Receitas
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
        title="Nova receita"
        icon={() => <FaPlus color="#FFF" size={25} />}
        colors={{
          PRIMARY_BACKGROUND: primaryGreen,
          SECOND_BACKGROUND: secondaryGreen,
          TEXT: '#fff'
        }}
      />

      {censored ?
        <S.CensoredContainer>
          <FaBan size={40} color={titleColor} />
        </S.CensoredContainer>
        :
        <S.ItemsList ref={listRef}>
          {incomes.map((item, index) => {
            return (
              <div key={index}>
                <S.DateText color={textColor}>
                  {getFullDayOfTheMounth(item.day)}
                </S.DateText>
                {item.items.map((i, index) => {
                  return (
                    <ItemView key={index} type={'INCOME'} item={i} />
                  )
                })}
              </div>
            )
          })}
        </S.ItemsList>
      }
    </S.Container>
  )
});

export default IncomeList;