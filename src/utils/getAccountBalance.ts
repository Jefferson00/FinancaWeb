import { isSameMonth } from "date-fns";
import {
  IAccount,
  ICreditCard,
  IExpanses,
  IIncomes,
  IInvoice,
} from "../store/interfaces";
import { getItemsInThisMonth } from "./listByDate";

export function getEstimateBalance(
  incomes: IIncomes[],
  expanses: IExpanses[],
  currentBalance: number
): number {
  const incomeValuesSum = incomes.reduce((a, b) => a + (b["value"] || 0), 0);
  const expanseValuesSum = expanses.reduce((a, b) => a + (b["value"] || 0), 0);
  return incomeValuesSum + currentBalance - expanseValuesSum;
}

export const getAccountEstimateBalance = (
  account: IAccount,
  currentBalance: number,
  incomes: IIncomes[],
  expanses: IExpanses[],
  selectedMonth: Date,
  creditCards: ICreditCard[]
) => {
  const incomesInThisMonth = getItemsInThisMonth(incomes, selectedMonth);
  const expansesInThisMonth = getItemsInThisMonth(expanses, selectedMonth);
  const incomesOnAccountInThisMonth = account.incomesOnAccount.filter((i) =>
    isSameMonth(new Date(i.month), selectedMonth)
  );
  const expansesOnAccountInThisMonth = account.expansesOnAccount.filter((exp) =>
    isSameMonth(new Date(exp.month), selectedMonth)
  );

  const invoicesInThisMonth: IInvoice[] = [];

  creditCards.map((card) => {
    const foundInvoice = card.Invoice.find(
      (invoice) =>
        isSameMonth(new Date(invoice.month), selectedMonth) &&
        invoice.accountId === account.id &&
        invoice.paid
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

  const incomesWithoutAccount = incomesInThisMonth.filter(
    (i) =>
      !incomesOnAccountInThisMonth.find(
        (inOnAccount) => inOnAccount.incomeId === i.id
      )
  );

  const expansesWithoutAccount = expansesInThisMonth.filter(
    (e) =>
      !expansesOnAccountInThisMonth.find(
        (exOnAccount) => exOnAccount.expanseId === e.id
      )
  );

  const allIncomesInThisAccount = incomesWithoutAccount.filter(
    (i) => i.receiptDefault === account.id
  );

  //buscar todas despesas da conta e dos cartões da conta
  const allExpansesInThisAccount = expansesWithoutAccount.filter(
    (i) =>
      i.receiptDefault === account.id ||
      creditCards.find(
        (c) => c.receiptDefault === account.id && c.id === i.receiptDefault
      )
  );

  const estimateBalance = getEstimateBalance(
    allIncomesInThisAccount,
    allExpansesInThisAccount,
    currentBalance
  );

  localStorage.setItem(
    `@FinancaAppBeta:LastMonthEstimateBalance@${account.id}`,
    String(estimateBalance)
  );

  return estimateBalance;
};
