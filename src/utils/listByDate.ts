import { isAfter, isBefore, isSameMonth } from "date-fns";

export const getItemsInThisMonth = (item: any[], selectedDate: Date) => {
  return item.filter((i) =>
    i.endDate
      ? (isBefore(selectedDate, new Date(i.endDate)) ||
          isSameMonth(new Date(i.endDate), selectedDate)) &&
        (isAfter(selectedDate, new Date(i.startDate)) ||
          isSameMonth(new Date(i.startDate), selectedDate))
      : i.endDate === null &&
        (isAfter(selectedDate, new Date(i.startDate)) ||
          isSameMonth(new Date(i.startDate), selectedDate))
  );
};

export const getItemsOnAccountThisMonth = (
  itemsOnAccount: any[],
  selectedDate: Date
) => {
  return itemsOnAccount.filter((i) =>
    isSameMonth(new Date(i.month), selectedDate)
  );
};

export const getItemsOrderByDay = (items: any[], itemsOrderedByDay: any[]) => {
  items.filter((entry) => {
    if (
      itemsOrderedByDay.find(
        (item) =>
          item.day === new Date(entry.receiptDate || entry.month).getDate()
      )
    ) {
      return false;
    }
    itemsOrderedByDay.push({
      day: new Date(entry.receiptDate || entry.month).getDate(),
    });
    return true;
  });
};

export const listByDate = (
  items: any[],
  itemsOnAccount: any[],
  selectedDate: Date
) => {
  let itemsOrderedByDay: any[] = [];
  const itemsInThisMonth = getItemsInThisMonth(items, selectedDate);
  const itemsOnAccountInThisMonth = getItemsOnAccountThisMonth(
    itemsOnAccount,
    selectedDate
  );

  const itemsWithoutAccount = itemsInThisMonth.filter((item) => {
    if (
      itemsOnAccountInThisMonth.find(
        (i) => i.incomeId === item.id || i.expanseId === item.id
      )
    ) {
      return false;
    } else {
      return true;
    }
  });

  const itemsOrdered = itemsWithoutAccount.sort(
    (a, b) =>
      new Date(a.receiptDate).getDate() - new Date(b.receiptDate).getDate()
  );

  getItemsOrderByDay(itemsOrdered, itemsOrderedByDay);
  getItemsOrderByDay(itemsOnAccountInThisMonth, itemsOrderedByDay);

  itemsOrderedByDay.map((item) => {
    item.items = itemsWithoutAccount.filter(
      (entry) => new Date(entry.receiptDate).getDate() === item.day
    );
    item.items = [
      ...item.items,
      ...itemsOnAccountInThisMonth.filter((entry) => {
        if (new Date(entry.month).getDate() === item.day) {
          return entry;
        }
      }),
    ];
  });

  return itemsOrderedByDay.sort((a, b) => a.day - b.day);
};
