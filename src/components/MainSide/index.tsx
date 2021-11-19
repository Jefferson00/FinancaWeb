import { Colors } from '../../styles/global';
import * as S from './styles';
import { FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa';
import Card from '../AccountCard';
import Button from '../Button';
import { useState } from 'react';
import { getMounthAndYear } from '../../utils/dateFormats';

export default function MainSide() {
  const firstBackgroundColor = Colors.ORANGE_PRIMARY_LIGHTER;
  const secondBackgroundColor = Colors.ORANGE_SECONDARY_LIGHTER;
  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const expenseColor = Colors.RED_PRIMARY_LIGHTER;
  const incomeColor = Colors.GREEN_PRIMARY_LIGHTER;

  const [accountSelected, setAccountSelected] = useState(0);
  const [censored, setCensored] = useState(false);

  const accounts = [
    {
      name: 'Banco do Brasil',
      type: 'Corrente',
      balance: 100000,
    },
    {
      name: 'Nubank',
      type: 'Corrente',
      balance: 1000000,
    },
    {
      name: 'Carteira',
      type: 'Carteira',
      balance: 200000,
    },
  ]

  return (
    <S.Container linearGradient={{
      first: firstBackgroundColor,
      second: secondBackgroundColor
    }}>
      <S.Header>
        <S.MonthSelector>
          <S.Prev>
            <FaChevronLeft color="#fff" />
          </S.Prev>
          <S.Month>
            {getMounthAndYear(new Date())}
          </S.Month>
          <S.Next>
            <FaChevronRight color="#fff" />
          </S.Next>
        </S.MonthSelector>

        <S.ViewButton onClick={() => setCensored(!censored)}>
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
}