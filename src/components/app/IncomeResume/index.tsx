import { isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { Colors } from "../../../styles/global";
import {
  getItemsInThisMonth,
  getItemsOnAccountThisMonth,
} from "../../../utils/listByDate";
import BalanceCard from "../BalanceCard";
import * as S from "./styles";

const IncomeResume = () => {
  const { incomes, incomesOnAccount } = useSelector(
    (state: State) => state.incomes
  );
  const { selectedMonth } = useSelector((state: State) => state.dates);

  const [totalCurrentIncomes, setTotalCurrentIncomes] = useState(0);
  const [totalEstimateIncomes, setTotalEstimateIncomes] = useState(0);
  const primaryColor = Colors.GREEN_PRIMARY_LIGHTER;
  const secondColor = Colors.ORANGE_SECONDARY_LIGHTER;

  useEffect(() => {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setUTCHours(0, 0, 0, 0);

    const currentIncomes = getItemsInThisMonth(incomes, selectedMonth);
    const currentIncomesOnAccount = getItemsOnAccountThisMonth(
      incomesOnAccount,
      selectedMonth
    );
    const currentTotal = currentIncomes.reduce(
      (a, b) => a + (b["value"] || 0),
      0
    );
    setTotalCurrentIncomes(currentTotal);

    if (isBefore(selectedMonth, currentMonth)) {
      setTotalEstimateIncomes(currentTotal);
    } else {
      const incomesWithoutAccount = currentIncomes.filter(
        (i) =>
          !currentIncomesOnAccount.find(
            (inOnAccount) => inOnAccount.incomeId === i.id
          )
      );
      setTotalEstimateIncomes(
        [...incomesWithoutAccount, ...currentIncomesOnAccount].reduce(
          (a, b) => a + (b["value"] || 0),
          0
        )
      );
    }
  }, [incomes, incomesOnAccount, selectedMonth]);

  return (
    <S.Container>
      <BalanceCard
        primaryColor={primaryColor}
        secondColor={secondColor}
        type="INCOME"
        balance={{
          currentBalance: totalCurrentIncomes,
          estimateBalance: totalEstimateIncomes,
        }}
      />
    </S.Container>
  );
};

export default IncomeResume;
