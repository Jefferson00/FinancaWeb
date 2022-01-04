import { useEffect, useState } from 'react';
import * as S from './styles';

import { Colors } from '../../styles/global';
import { FaBan, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getCategoryIcon } from '../../utils/getCategoryIcon';
import { getCurrencyFormat } from '../../utils/getCurrencyFormat';

import { getDayOfTheMounth } from '../../utils/dateFormats';

export default function Transactions() {
  const [censored, setCensored] = useState(false);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const itemBackground = Colors.BLUE_SOFT_LIGHTER;
  const strongColor = Colors.MAIN_TEXT_LIGHTER;
  const expanseColor = Colors.RED_PRIMARY_LIGHTER;
  const incomeColor = Colors.GREEN_PRIMARY_LIGHTER;

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem('financaWeb.censored.transactions');

    setCensored(censoredStatusStoraged === 'true' ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem('financaWeb.censored.transactions', String(!censored));
  }

  const latestTransactions = [
    {
      id: 'f015df05d',
      category: 'Casa',
      name: 'Compras do mês',
      value: 58590,
      created_at: new Date(),
      type: 'despesa'
    },
    {
      id: 'ddsfsdfdg',
      category: 'Lazer',
      name: 'Ida ao cinema',
      value: 158590,
      created_at: new Date(),
      type: 'despesa'
    },
    {
      id: 'hththnrn',
      category: 'Outros',
      name: 'Pagamento do agiota',
      value: 8590,
      created_at: new Date(),
      type: 'entrada',
    },
  ]

  return (
    <S.Container>
      <S.Header>
        <S.Title color={titleColor}>Últimas Transações</S.Title>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ?
            <FaEye color={titleColor} size={26} />
            :
            <FaEyeSlash color={titleColor} size={26} />
          }
        </S.ViewButton>
      </S.Header>

      {censored ?
        <S.CensoredContainer>
          <FaBan size={40} color={titleColor} />
        </S.CensoredContainer>
        :
        <S.TransactionsList>
          {latestTransactions.map((transaction) => {

            return (
              <S.TransactionItem backgroundColor={itemBackground} textOpacity={0.8} key={transaction.id}>
                {getCategoryIcon(transaction.category, titleColor, 20)}
                <S.TextContainer
                  strongColor={strongColor}
                  regularColor={transaction.type === 'despesa' ? expanseColor : incomeColor}
                >
                  <strong>{transaction.name}</strong>
                  <p>
                    {transaction.type === 'despesa' && '- '}
                    {getCurrencyFormat(transaction.value)}
                  </p>
                </S.TextContainer>
                <p>
                  {getDayOfTheMounth(transaction.created_at)}
                </p>
              </S.TransactionItem>
            )
          })}
        </S.TransactionsList>
      }
    </S.Container>
  )
}