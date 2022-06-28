import { useState, useEffect, useCallback } from "react";
import * as S from "./styles";

import { Colors } from "../../../styles/global";
import { FaEye, FaEyeSlash, FaBan } from "react-icons/fa";
import { getMounthAndYear } from "../../../utils/dateFormats";
import { observer } from "mobx-react-lite";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { getItemsInThisMonth } from "../../../utils/listByDate";
import { addMonths, isSameMonth } from "date-fns";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";

interface IEstimate {
  id: string | number;
  month: string;
  value: number;
  indicator: number;
}

const Estimates = observer(() => {
  const { accounts, loading: accountLoading } = useSelector(
    (state: State) => state.accounts
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

  const backgroundColor = Colors.BLUE_SOFT_LIGHTER;
  const graphColor = Colors.ORANGE_SECONDARY_LIGHTER;
  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const regularColor = Colors.BLUE_SECONDARY_LIGHTER;

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

      /* const invoicesInThisMonth: Invoice[] = [];

    creditCards.map(card => {
      const foundInvoice = card.Invoice.find(
        invoice =>
          isSameMonth(new Date(invoice.month), currentMonth) && invoice.paid,
      );
      if (foundInvoice) invoicesInThisMonth.push(foundInvoice);
    });

    if (invoicesInThisMonth) {
      invoicesInThisMonth.map(invoice => {
        invoice.ExpanseOnInvoice.map(expanse => {
          expansesOnAccountInThisMonth.push(expanse as any);
        });
      });
    } */

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
    [expanses, expansesOnAccount]
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
        <S.Title color={titleColor}>Estimativas</S.Title>

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ? (
            <FaEye color={titleColor} size={26} />
          ) : (
            <FaEyeSlash color={titleColor} size={26} />
          )}
        </S.ViewButton>
      </S.Header>

      <S.GraphContainer backgroundColor={backgroundColor}>
        {censored ? (
          <FaBan size={40} color={regularColor} />
        ) : incomeLoading || accountLoading || expanseLoading || calculating ? (
          <p>Carregando...</p>
        ) : (
          estimates.map((estimate) => (
            <S.GraphItem
              key={estimate.id}
              strongColor={textColor}
              regularColor={regularColor}
            >
              <strong>
                {getMounthAndYear(new Date(estimate.month), true)}
              </strong>
              <p>{getCurrencyFormat(estimate.value)}</p>
              <S.GraphIndicator
                heightIndicator={estimate.indicator.toString()}
                color={graphColor}
              />
            </S.GraphItem>
          ))
        )}
      </S.GraphContainer>
    </S.Container>
  );
});

export default Estimates;
