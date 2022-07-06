/* eslint-disable array-callback-return */
import { useState, useEffect, useCallback } from "react";
import * as S from "./styles";

import { FaEye, FaEyeSlash, FaBan } from "react-icons/fa";
import { getMounthAndYear } from "../../../utils/dateFormats";
import { observer } from "mobx-react-lite";
import { useSelector } from "react-redux";
import State, { IInvoice } from "../../../store/interfaces";
import { getItemsInThisMonth } from "../../../utils/listByDate";
import { addMonths, isSameMonth } from "date-fns";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import Loader from "../../utils/Loader";

interface IEstimate {
  id: string | number;
  month: string;
  value: number;
  indicator: number;
}

const Estimates = observer(() => {
  const { theme } = useSelector((state: State) => state.themes);
  const { accounts, loading: accountLoading } = useSelector(
    (state: State) => state.accounts
  );
  const { creditCards, loading: creditCardsLoading } = useSelector(
    (state: State) => state.creditCards
  );
  const {
    incomes,
    incomesOnAccount,
    loading: incomeLoading,
  } = useSelector((state: State) => state.incomes);
  const {
    expanses,
    expansesOnAccount,
    loading: expanseLoading,
  } = useSelector((state: State) => state.expanses);

  const [censored, setCensored] = useState(false);
  const [estimates, setEstimates] = useState<IEstimate[]>([]);
  const [calculating, setCalculating] = useState(true);

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      "financaWeb.censored.estimates"
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem("financaWeb.censored.estimates", String(!censored));
  };

  const calculateEstimateIncomes = useCallback(
    (currentMonth: Date) => {
      const incomesInThisMonth = getItemsInThisMonth(incomes, currentMonth);

      const incomesOnAccountInThisMonth = incomesOnAccount.filter((i) =>
        isSameMonth(new Date(i.month), currentMonth)
      );

      const incomesWithoutAccount = incomesInThisMonth.filter(
        (i) =>
          !incomesOnAccountInThisMonth.find(
            (inOnAccount) => inOnAccount.incomeId === i.id
          )
      );

      const estimateIncomes = incomesWithoutAccount.reduce(
        (a, b) => a + (b["value"] || 0),
        0
      );

      return estimateIncomes;
    },
    [incomes, incomesOnAccount]
  );

  const calculateEstimateExpanses = useCallback(
    (currentMonth: Date) => {
      const expansesInThisMonth = getItemsInThisMonth(expanses, currentMonth);

      const expansesOnAccountInThisMonth = expansesOnAccount.filter((i) =>
        isSameMonth(new Date(i.month), currentMonth)
      );

      const invoicesInThisMonth: IInvoice[] = [];

      creditCards.map((card) => {
        const foundInvoice = card.Invoice.find(
          (invoice) =>
            isSameMonth(new Date(invoice.month), currentMonth) && invoice.paid
        );
        if (foundInvoice) invoicesInThisMonth.push(foundInvoice);
      });

      if (invoicesInThisMonth) {
        invoicesInThisMonth.map((invoice) => {
          invoice.ExpanseOnInvoice.map((expanse) => {
            expansesOnAccountInThisMonth.push(expanse as any);
          });
        });
      }

      const expansesWithoutAccount = expansesInThisMonth.filter(
        (i) =>
          !expansesOnAccountInThisMonth.find(
            (expOnAccount) => expOnAccount.expanseId === i.id
          )
      );

      const estimateExpanses = expansesWithoutAccount.reduce(
        (a, b) => a + (b["value"] || 0),
        0
      );

      return estimateExpanses;
    },
    [creditCards, expanses, expansesOnAccount]
  );

  useEffect(() => {
    setCalculating(true);
    let count = 0;
    let currentMonth = new Date();
    let sumBalanceLastMonth = 0;
    let estimatesArr: any[] = [];
    let values: any[] = [];

    accounts.map((account) => {
      sumBalanceLastMonth = sumBalanceLastMonth + account.balance;
    });

    let balanceInThisMonth = sumBalanceLastMonth;

    while (count < 5) {
      const estimateIncomes = calculateEstimateIncomes(currentMonth);
      const estimateExpanses = calculateEstimateExpanses(currentMonth);
      balanceInThisMonth =
        balanceInThisMonth + (estimateIncomes - estimateExpanses);
      values.push(balanceInThisMonth);
      estimatesArr.push({
        id: count,
        month: currentMonth,
        value: balanceInThisMonth,
        indicator: 0,
      });
      currentMonth = addMonths(currentMonth, 1);
      count++;
    }

    const maxValue = Math.max.apply(Math, values);

    estimatesArr = estimatesArr.map((e) => {
      if (e.value === maxValue && maxValue !== 0) {
        return {
          ...e,
          indicator: 100,
        };
      }
      if (e.value === 0) {
        return {
          ...e,
          indicator: 0,
        };
      }
      return {
        ...e,
        indicator: Math.round((100 * e.value) / maxValue),
      };
    });
    setEstimates(estimatesArr);
    setCalculating(false);
  }, [accounts, calculateEstimateExpanses, calculateEstimateIncomes]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Estimativas</S.Title>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ? <FaEye size={26} /> : <FaEyeSlash size={26} />}
        </S.ViewButton>
      </S.Header>

      {incomeLoading ||
      accountLoading ||
      expanseLoading ||
      creditCardsLoading ||
      calculating ? (
        <Loader
          height="150"
          width="400"
          color={theme === "dark" ? "#262626" : "#D4E3F5"}
        />
      ) : (
        <S.GraphContainer>
          {censored ? (
            <FaBan size={40} />
          ) : (
            estimates.map((estimate) => (
              <S.GraphItem key={estimate.id}>
                <strong>
                  {getMounthAndYear(new Date(estimate.month), true)}
                </strong>
                <p>{getCurrencyFormat(estimate.value)}</p>
                <S.GraphIndicator
                  heightIndicator={estimate.indicator.toString()}
                />
              </S.GraphItem>
            ))
          )}
        </S.GraphContainer>
      )}
    </S.Container>
  );
});

export default Estimates;
