import { useState, useEffect } from 'react';
import { Colors } from '../../styles/global';
import * as S from './styles';
import Card from '../AccountCard';
import Button from '../Button';
import { useStores } from '../../store';
import { getMounthAndYear } from '../../utils/dateFormats';
import { observer } from 'mobx-react-lite';
import { FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa';

const MainSide = observer(() => {
  const { financeStore } = useStores();
  const { financeData, handleNextMonth, handlePrevMonth } = financeStore;
  const { month, accounts } = financeData;

  const firstBackgroundColor = Colors.ORANGE_PRIMARY_LIGHTER;
  const secondBackgroundColor = Colors.ORANGE_SECONDARY_LIGHTER;
  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const expenseColor = Colors.RED_PRIMARY_LIGHTER;
  const incomeColor = Colors.GREEN_PRIMARY_LIGHTER;

  const [accountSelected, setAccountSelected] = useState(0);
  const [censored, setCensored] = useState(false);

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem('financaWeb.censored.mainside');

    setCensored(censoredStatusStoraged === 'true' ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem('financaWeb.censored.mainside', String(!censored));
  }

  return (
    <S.Container linearGradient={{
      first: firstBackgroundColor,
      second: secondBackgroundColor
    }}>
      <S.Header>
        <S.MonthSelector>
          <S.Prev onClick={handlePrevMonth}>
            <FaChevronLeft color="#fff" />
          </S.Prev>
          <S.Month>
            {getMounthAndYear(month)}
          </S.Month>
          <S.Next onClick={handleNextMonth}>
            <FaChevronRight color="#fff" />
          </S.Next>
        </S.MonthSelector>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ?
            <FaEye color="#fff" size={26} />
            :
            <FaEyeSlash color="#fff" size={26} />
          }
        </S.ViewButton>
      </S.Header>

      <S.Balances>
        <S.Row>
          <S.Balance>
            <S.Title color={titleColor}>Saldo atual</S.Title>
            {censored ?
              <S.Value color={textColor}>***********</S.Value>
              :
              <S.Value color={textColor}>R$ 15.000,00</S.Value>
            }
          </S.Balance>
          <S.Balance>
            <S.Title color={titleColor} opacity={0.5}>Saldo previsto</S.Title>
            {censored ?
              <S.Value color={textColor} opacity={0.5}>***********</S.Value>
              :
              <S.Value color={textColor} opacity={0.5}>R$ 14.300,00</S.Value>
            }
          </S.Balance>
        </S.Row>

        <S.Row>
          <S.Balance>
            <S.Title color={incomeColor}>Receitas</S.Title>
            {censored ?
              <S.Value color={incomeColor}>***********</S.Value>
              :
              <S.Value color={incomeColor}>R$ 15.000,00</S.Value>
            }
          </S.Balance>
          <S.Balance>
            <S.Title color={expenseColor}>Despesas</S.Title>
            {censored ?
              <S.Value color={expenseColor}>***********</S.Value>
              :
              <S.Value color={expenseColor}>R$ 14.300,00</S.Value>
            }
          </S.Balance>
        </S.Row>
      </S.Balances>


      <S.AccountContainer>
        <h4>Contas</h4>

        <S.AccountCardList>
          <Card account={accounts[accountSelected]} censored={censored} />
        </S.AccountCardList>

        <S.CardDots>
          {accounts.map((account, index) => (
            <S.Dot
              key={index}
              selected={accountSelected === index}
              onClick={() => {
                setAccountSelected(index)
              }}
            />
          ))}
        </S.CardDots>
      </S.AccountContainer>

      <S.ButtonContainer>
        <Button
          title="Criar nova conta"
          icon={() => <FaPlus color="#FFF" size={25} />}
          colors={{
            PRIMARY_BACKGROUND: "#FFF",
            SECOND_BACKGROUND: "#2673CE",
            TEXT: "#2673CE"
          }}
        />
      </S.ButtonContainer>


    </S.Container>
  )
})

export default MainSide