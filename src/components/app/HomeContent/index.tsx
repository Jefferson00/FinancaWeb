import Estimates from "../EstimatesView";
import Transactions from "../Transactions";
import RemindView from "../RemindView";
import { useSelector } from "react-redux";
import State, { IExpanses, IIncomes } from "../../../store/interfaces";
import {
  addDays,
  differenceInMonths,
  isBefore,
  isSameDay,
  isSameMonth,
} from "date-fns";
import {
  getItemsInThisMonth,
  getItemsOnAccountThisMonth,
} from "../../../utils/listByDate";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ItemProps extends IIncomes, IExpanses {
  type: "EXPANSE" | "INCOME";
}

interface RemindItemProps {
  day: Date;
  items: ItemProps[];
}

const HomeContent = () => {
  const {
    incomes,
    incomesOnAccount,
    loading: loadingIncomes,
  } = useSelector((state: State) => state.incomes);
  const {
    expanses,
    expansesOnAccount,
    loading: loadingExpanses,
  } = useSelector((state: State) => state.expanses);
  const { accounts, loading: loadingAccounts } = useSelector(
    (state: State) => state.accounts
  );
  const [nextDaysItems, setNextDaysItems] = useState<RemindItemProps[]>([]);
  const [lateItems, setLateItems] = useState<ItemProps[]>([]);
  const [loadingLateItems, setLoadingLateItems] = useState(true);
  const [loadingNextItems, setLoadingNextItems] = useState(true);

  const expansesWithoutInvoice = useMemo(() => {
    return expanses.filter((exp) =>
      accounts.find((acc) => acc.id === exp.receiptDefault)
    );
  }, [accounts, expanses]);

  const getItemsNextDays = useCallback(() => {
    setLoadingNextItems(true);
    const incomesInThisMonth = getItemsInThisMonth(incomes, new Date());
    const incomesOnAccountInThisMonth = getItemsOnAccountThisMonth(
      incomesOnAccount,
      new Date()
    );
    const expansesInThisMonth = getItemsInThisMonth(expanses, new Date());
    const expansesOnAccountInThisMonth = getItemsOnAccountThisMonth(
      expansesOnAccount,
      new Date()
    );

    const incomesWithoutAccount = incomesInThisMonth.filter(
      (i) =>
        !incomesOnAccountInThisMonth.find(
          (inOnAccount) => inOnAccount.incomeId === i.id
        )
    );
    const expansesWithoutAccount = expansesInThisMonth.filter(
      (i) =>
        !expansesOnAccountInThisMonth.find(
          (inOnAccount) => inOnAccount.expanseId === i.id
        )
    );

    let nextDays = [];

    for (let i = 1; i <= 5; i++) {
      const nextDay = addDays(new Date(), i);

      const incomesNextDay = incomesWithoutAccount.filter((income) =>
        isSameDay(
          new Date().setDate(new Date(income.receiptDate).getDate()),
          nextDay
        )
      );
      const expansesNextDay = expansesWithoutAccount.filter((expanse) =>
        isSameDay(
          new Date().setDate(new Date(expanse.receiptDate).getDate()),
          nextDay
        )
      );

      const incomes = incomesNextDay.map((i) => ({ ...i, type: "INCOME" }));
      const expanses = expansesNextDay.map((i) => ({ ...i, type: "EXPANSE" }));

      nextDays.push({
        day: nextDay,
        items: [...incomes, ...expanses],
      });
    }

    const nextDaysWithItems = nextDays.filter((n) => n.items.length > 0);

    setNextDaysItems(nextDaysWithItems);
    setLoadingNextItems(false);
  }, [expanses, expansesOnAccount, incomes, incomesOnAccount]);

  const getLateItems = useCallback(() => {
    setLoadingLateItems(true);
    const incomesInPrevMonths = incomes.filter(
      (i) =>
        isBefore(new Date(i.startDate), new Date()) ||
        (isSameMonth(new Date(i.startDate), new Date()) &&
          new Date(i.startDate).getDate() <= new Date().getDate())
    );

    const expansesInPrevMonths = expansesWithoutInvoice.filter(
      (i) =>
        isBefore(new Date(i.startDate), new Date()) ||
        (isSameMonth(new Date(i.startDate), new Date()) &&
          new Date(i.startDate).getDate() <= new Date().getDate())
    );

    const incomesOnAccountInPrevMonths = incomesOnAccount.filter(
      (i) =>
        isBefore(new Date(i.month), new Date()) ||
        isSameMonth(new Date(i.month), new Date())
    );

    const expansesOnAccountInPrevMonths = expansesOnAccount.filter(
      (i) =>
        isBefore(new Date(i.month), new Date()) ||
        isSameMonth(new Date(i.month), new Date())
    );

    const expansesInPrevMonthsCopy = expansesInPrevMonths.map((i) => {
      let differenceStartToEnd = 0;
      const differenceBetweenMonths =
        differenceInMonths(new Date(i.startDate), new Date()) + 1;
      if (i.endDate) {
        differenceStartToEnd =
          differenceInMonths(new Date(i.endDate), new Date(i.startDate)) + 1;
      }

      return {
        ...i,
        numberOfMonths:
          differenceBetweenMonths > differenceStartToEnd &&
          differenceStartToEnd !== 0
            ? differenceStartToEnd
            : differenceBetweenMonths,
      };
    });

    const incomesInPrevMonthsCopy = incomesInPrevMonths.map((i) => {
      let differenceStartToEnd = 0;
      const differenceBetweenMonths =
        differenceInMonths(new Date(i.startDate), new Date()) + 1;
      if (i.endDate) {
        differenceStartToEnd =
          differenceInMonths(new Date(i.endDate), new Date(i.startDate)) + 1;
      }

      return {
        ...i,
        numberOfMonths:
          differenceBetweenMonths > differenceStartToEnd &&
          differenceStartToEnd !== 0
            ? differenceStartToEnd
            : differenceBetweenMonths,
      };
    });

    const incomesWithoutAccount = incomesInPrevMonthsCopy.filter(
      (i) =>
        !incomesOnAccountInPrevMonths.find(
          (inOnAccount) => inOnAccount.incomeId === i.id
        ) ||
        incomesOnAccountInPrevMonths.filter(
          (inOnAccount) => inOnAccount.incomeId === i.id
        ).length < i.numberOfMonths
    );

    const expansesWithoutAccount = expansesInPrevMonthsCopy.filter(
      (i) =>
        !expansesOnAccountInPrevMonths.find(
          (inOnAccount) => inOnAccount.expanseId === i.id
        ) ||
        expansesOnAccountInPrevMonths.filter(
          (inOnAccount) => inOnAccount.expanseId === i.id
        ).length < i.numberOfMonths
    );

    const lateIncomes = incomesWithoutAccount.map((i) => ({
      ...i,
      type: "INCOME",
    }));
    const lateExpanses = expansesWithoutAccount.map((i) => ({
      ...i,
      type: "EXPANSE",
    }));

    setLateItems(
      [...lateIncomes, ...lateExpanses].sort(
        (a, b) =>
          new Date(a.receiptDate).getDate() - new Date(b.receiptDate).getDate()
      ) as ItemProps[]
    );
    setLoadingLateItems(false);
  }, [incomes, expansesWithoutInvoice, incomesOnAccount, expansesOnAccount]);

  useEffect(() => {
    getItemsNextDays();
    getLateItems();
  }, [getItemsNextDays, getLateItems]);

  return (
    <>
      <Estimates />

      <Transactions />

      <RemindView
        type="LATE"
        lateItems={lateItems}
        loading={
          loadingLateItems ||
          loadingAccounts ||
          loadingExpanses ||
          loadingIncomes
        }
      />

      <RemindView
        type="NEXTDAYS"
        items={nextDaysItems}
        loading={
          loadingNextItems ||
          loadingAccounts ||
          loadingExpanses ||
          loadingIncomes
        }
      />
    </>
  );
};

export default HomeContent;
