import * as S from './styles';

import { MdAccountBalance, MdAccountBalanceWallet } from 'react-icons/md';

interface Account {
  name: string,
  type: string,
  balance: number,
}

interface CardProps {
  account: Account;
  censored?: boolean;
}

export default function Card({ account, censored }: CardProps) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>{account.name}</S.Title>
        {account.type === 'Carteira' &&
          <MdAccountBalanceWallet color="#fff" size={30} />
        }
        {account.type === 'Corrente' &&
          <MdAccountBalance color="#fff" size={30} />
        }
      </S.Header>

      <S.Main>
        <S.Text fontSize="0.875rem">Saldo</S.Text>
        <S.Text fontSize="1.125rem">{
          censored ?
            '************'
            :
            Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
            }).format(account.balance / 100)
        }</S.Text>
        <S.Text fontSize="0.875rem" fontWeight={400}>
          Previsto {censored ? '**********' : 'R$ 800,00'}
        </S.Text>
      </S.Main>
    </S.Container>
  )
}