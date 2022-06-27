export interface IAccount {
  id?: string;
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

export interface ICreateIncome {
  name: string;
  userId: string;
  value: number;
  category: string;
  iteration: string;
  receiptDate: string;
  startDate: string;
  endDate: string;
  receiptDefault: string;
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
}
