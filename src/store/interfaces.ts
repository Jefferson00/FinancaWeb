import { CreditCardsState } from "./modules/CreditCards";
import { ExpansesState } from "./modules/Expanses";
import { TransactionsState } from "./modules/Transactions";

export interface IAccount {
  id: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
  initialValue: number;
  balance: number;
  createdAt: string;
  Invoice: any[];
  incomesOnAccount: any[];
  expansesOnAccount: any[];
}

export interface IIncomes {
  id: string;
  name: string;
  category: string;
  value: number;
  receiptDate: string;
  iteration: string;
  receiptDefault: string;
  startDate: string;
  endDate: string;
}

export interface IIncomesOnAccount {
  id: string;
  paymentDate: string;
  month: string;
  recurrence: string;
  incomeId: string;
  accountId: string;
  value: number;
  name: string;
  income: IIncomes;
}

export interface IExpanses {
  id: string;
  name: string;
  category: string;
  value: number;
  receiptDate: string;
  iteration: string;
  receiptDefault: string;
  startDate: string;
  endDate: string;
}

export interface IExpansesOnAccount {
  id: string;
  paymentDate: string;
  month: string;
  recurrence: string;
  expanseId: string;
  accountId: string;
  value: number;
  name: string;
  expanse: IExpanses;
}

export interface IExpanseOnInvoice {
  id: string;
  recurrence?: string;
  expanseId: string;
  value: number;
  name: string;
  invoiceId: string;
  day: number;
}

export interface IInvoice {
  id: string;
  month: string;
  closingDate: string;
  paymentDate: string;
  paid: boolean;
  closed: boolean;
  value: number;
  creditCardId: string;
  accountId: string;
  updatedAt: string;
  ExpanseOnInvoice: IExpanseOnInvoice[];
}

export interface ICreditCard {
  id: string;
  name: string;
  limit: number;
  paymentDate: string;
  invoiceClosing: string;
  color: string;
  receiptDefault: string;
  userId: string;
  Invoice: IInvoice[];
}

export interface ICreateIncome {
  name: string;
  userId: string;
  value: number;
  category: string;
  iteration: string;
  receiptDate: Date;
  startDate: Date;
  endDate?: Date | null;
  receiptDefault: string;
}

export interface ICreateIncomeOnAccount {
  userId: string;
  incomeId: string;
  accountId: string;
  name: string;
  month: Date;
  value: number;
  recurrence: string;
}

export interface IUpdateIncome {
  userId: string;
  name?: string;
  value?: number;
  category?: string;
  iteration?: string;
  receiptDate?: Date;
  startDate?: Date;
  endDate?: Date | null;
  receiptDefault?: string;
}

export interface ICreateAccount {
  name: string;
  type: string;
  status: string;
  initialValue: number;
  userId: string;
}

export interface IUpdateAccount {
  userId: string;
  type?: string;
  status?: string;
  name?: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  user: any;
}

export interface AccountState {
  accounts: IAccount[];
  loading: boolean;
}

export interface DatesState {
  selectedMonth: Date;
}

export interface IncomesState {
  incomes: IIncomes[];
  incomesOnAccount: IIncomesOnAccount[];
  loading: boolean;
}

export default interface State {
  auth: IAuthState;
  accounts: AccountState;
  menus: string;
  dates: DatesState;
  incomes: IncomesState;
  expanses: ExpansesState;
  transactions: TransactionsState;
  creditCards: CreditCardsState;
}
