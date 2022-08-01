import * as S from "./styles";

import { MdAccountBalance, MdAccountBalanceWallet } from "react-icons/md";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import { IAccount } from "../../../store/interfaces";
import { HTMLAttributes } from "react";

interface IBalances {
  accountId: string;
  currentBalance: number;
  estimateBalance: number;
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  account: IAccount;
  balances: IBalances;
  censored?: boolean;
}

const Card = ({ account, censored, balances, ...rest }: CardProps) => {
  return (
    <S.Container {...rest}>
      <S.Header>
        <S.Title>{account.name}</S.Title>
        {account.type === "Carteira" && (
          <MdAccountBalanceWallet color="#fff" size={30} />
        )}
        {account.type === "Conta Corrente" && (
          <MdAccountBalance color="#fff" size={30} />
        )}
      </S.Header>

      <S.Main>
        <S.Text fontSize="0.875rem">Saldo</S.Text>
        <S.Text fontSize="1.125rem">
          {censored
            ? "************"
            : getCurrencyFormat(balances?.currentBalance || 0)}
        </S.Text>
        <S.Text fontSize="0.875rem" fontWeight={400}>
          Previsto{" "}
          {censored
            ? "**********"
            : getCurrencyFormat(balances?.estimateBalance || 0)}
        </S.Text>
      </S.Main>
    </S.Container>
  );
};

export default Card;
