import { useEffect, useState } from "react";
import * as S from "./styles";

import { Colors } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash } from "react-icons/fa";
import { getCategoryIcon } from "../../../utils/getCategoryIcon";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";

import { getDayOfTheMounth } from "../../../utils/dateFormats";
import { useDispatch, useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { listLastTransactions } from "../../../store/modules/Transactions/fetchActions";
import Loader from "../../utils/Loader";

export default function Transactions() {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: State) => state.auth);
  const { lastTransactions, loading } = useSelector(
    (state: State) => state.transactions
  );

  const [censored, setCensored] = useState(false);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const itemBackground = Colors.BLUE_SOFT_LIGHTER;
  const strongColor = Colors.MAIN_TEXT_LIGHTER;
  const expanseColor = Colors.RED_PRIMARY_LIGHTER;
  const incomeColor = Colors.GREEN_PRIMARY_LIGHTER;

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      "financaWeb.censored.transactions"
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem("financaWeb.censored.transactions", String(!censored));
  };

  useEffect(() => {
    if (user.id) {
      dispatch(listLastTransactions(user.id));
    }
  }, [dispatch, user]);

  return (
    <S.Container>
      <S.Header>
        <S.Title color={titleColor}>Últimas Transações</S.Title>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ? (
            <FaEye color={titleColor} size={26} />
          ) : (
            <FaEyeSlash color={titleColor} size={26} />
          )}
        </S.ViewButton>
      </S.Header>

      {censored ? (
        <S.CensoredContainer>
          <FaBan size={40} color={titleColor} />
        </S.CensoredContainer>
      ) : loading ? (
        <Loader
          height="150"
          width="400"
          color="#D4E3F5"
          rectLength={3}
          rectProps={{
            height: "40",
            rx: "20",
            ry: "20",
            y: "0",
            x: "0",
            width: "400",
          }}
        />
      ) : (
        <S.TransactionsList>
          {lastTransactions.map((transaction) => {
            return (
              <S.TransactionItem
                backgroundColor={itemBackground}
                textOpacity={0.8}
                key={transaction.id}
              >
                {getCategoryIcon(transaction.category, titleColor, 20)}
                <S.TextContainer
                  strongColor={strongColor}
                  regularColor={
                    transaction.type === "Expanse" ? expanseColor : incomeColor
                  }
                >
                  <strong>{transaction.title}</strong>
                  <p>
                    {transaction.type === "Expanse" && "- "}
                    {getCurrencyFormat(transaction.value)}
                  </p>
                </S.TextContainer>
                <p>{getDayOfTheMounth(new Date(transaction.paymentDate))}</p>
              </S.TransactionItem>
            );
          })}
          {!loading && lastTransactions.length === 0 && (
            <S.EmptyItem backgroundColor={itemBackground}>
              <p>Nenhuma transação por enquanto</p>
            </S.EmptyItem>
          )}
        </S.TransactionsList>
      )}
    </S.Container>
  );
}
