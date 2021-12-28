import * as S from './styles';

import { MdAccountBalance, MdAccountBalanceWallet } from 'react-icons/md';
import { IAccount } from '../../store/interfaces';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store';
import { useEffect, useCallback, useState } from 'react';


interface CardProps {
  account: IAccount;
  censored?: boolean;
}

const Card = observer(({ account, censored }: CardProps) => {
  const { financeStore } = useStores();
  const { financeData, handleAccountBalance } = financeStore;
  const { accountsCurrentBalance } = financeData;
  const [balance, setBalance] = useState(accountsCurrentBalance.find(balance => balance.account_id === account.id))

  useEffect(() => {
    const calcBalance = handleAccountBalance();
    setBalance(calcBalance.find(balance => balance.account_id === account.id))
  }, [account.id, accountsCurrentBalance, handleAccountBalance]);

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
            }).format(balance?.balance ? balance?.balance / 100 : 0)
        }</S.Text>
        <S.Text fontSize="0.875rem" fontWeight={400}>
          Previsto {censored ? '**********' : 'R$ 800,00'}
        </S.Text>
      </S.Main>
    </S.Container>
  )
})

export default Card