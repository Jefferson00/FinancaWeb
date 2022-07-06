import { useEffect, useState } from "react";
import * as S from "./styles";

import { GREEN_PRIMARY, RED_PRIMARY } from "../../../styles/global";
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
  const { theme } = useSelector((state: State) => state.themes);
  const { lastTransactions, loading } = useSelector(
    (state: State) => state.transactions
  );

  const [censored, setCensored] = useState(false);

  const iconsColor = theme === "dark" ? "#2673CE" : "#4876AC";

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
        <S.Title>Últimas Transações</S.Title>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ? (
            <FaEye color={iconsColor} size={26} />
          ) : (
            <FaEyeSlash color={iconsColor} size={26} />
          )}
        </S.ViewButton>
      </S.Header>

      {censored ? (
        <S.CensoredContainer>
          <FaBan size={40} color={iconsColor} />
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
              <S.TransactionItem textOpacity={0.8} key={transaction.id}>
                {getCategoryIcon(transaction.category, iconsColor, 20)}
                <S.TextContainer
                  regularColor={
                    transaction.type === "Expanse" ? RED_PRIMARY : GREEN_PRIMARY
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
            <S.EmptyItem>
              <p>Nenhuma transação por enquanto</p>
            </S.EmptyItem>
          )}
        </S.TransactionsList>
      )}
    </S.Container>
  );
}
