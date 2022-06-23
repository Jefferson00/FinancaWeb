import * as S from "./styles";

import { MdAccountBalance, MdAccountBalanceWallet } from "react-icons/md";
import { getCurrencyFormat } from "../../utils/getCurrencyFormat";
import { IAccount } from "../../store/interfaces";

interface CardProps {
  account: IAccount;
  censored?: boolean;
}

const Card = ({ account, censored }: CardProps) => {
  return (
    <S.Container>
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
          {censored ? "************" : getCurrencyFormat(0)}
        </S.Text>
        <S.Text fontSize="0.875rem" fontWeight={400}>
          Previsto {censored ? "**********" : "R$ 800,00"}
        </S.Text>
      </S.Main>
    </S.Container>
  );
};

export default Card;
