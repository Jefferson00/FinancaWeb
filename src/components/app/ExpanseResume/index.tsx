import { isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { RED_PRIMARY, RED_SOFT } from "../../../styles/global";
import {
  getItemsInThisMonth,
  getItemsOnAccountThisMonth,
  getPaidInvoicesThisMonth,
} from "../../../utils/listByDate";
import BalanceCard from "../BalanceCard";
import * as S from "./styles";

const ExpanseResume = () => {
  const { expanses, expansesOnAccount } = useSelector(
    (state: State) => state.expanses
  );
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const { creditCards } = useSelector((state: State) => state.creditCards);

  const [totalCurrentExpanses, setTotalCurrentExpanses] = useState(0);
  const [totalEstimateExpanses, setTotalEstimateExpanses] = useState(0);

  useEffect(() => {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setUTCHours(0, 0, 0, 0);

    const paidInvoices = getPaidInvoicesThisMonth(creditCards, selectedMonth);

    const currentExpanses = getItemsInThisMonth(expanses, selectedMonth);
    const currentExpansesOnAccount = getItemsOnAccountThisMonth(
      expansesOnAccount,
      selectedMonth
    );

    const totalInvoice = paidInvoices.reduce(
      (a, b) => a + (b["value"] || 0),
      0
    );
    const currentTotal = currentExpansesOnAccount.reduce(
      (a, b) => a + (b["value"] || 0),
      0
    );
    setTotalCurrentExpanses(currentTotal + totalInvoice);

    if (isBefore(selectedMonth, currentMonth)) {
      setTotalEstimateExpanses(currentTotal);
    } else {
      const expansesWithoutAccount = currentExpanses.filter(
        (i) =>
          !currentExpansesOnAccount.find(
            (expOnAccount) => expOnAccount.expanseId === i.id
          )
      );
      setTotalEstimateExpanses(
        [...expansesWithoutAccount, ...currentExpansesOnAccount].reduce(
          (a, b) => a + (b["value"] || 0),
          0
        )
      );
    }
  }, [expanses, expansesOnAccount, selectedMonth, creditCards]);

  return (
    <S.Container>
      <BalanceCard
        primaryColor={RED_PRIMARY}
        secondColor={RED_SOFT}
        type="EXPANSE"
        balance={{
          currentBalance: totalCurrentExpanses,
          estimateBalance: totalEstimateExpanses,
        }}
      />
    </S.Container>
  );
};

export default ExpanseResume;
