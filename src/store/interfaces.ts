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

export interface IIncomes {
  id?: string;
  name: string;
  category: string;
  value: number;
  received: boolean;
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

export default interface State {
  auth: IAuthState;
  accounts: AccountState;
  menus: string;
  dates: DatesState;
}
