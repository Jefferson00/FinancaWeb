export interface IAccount {
  id?: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
  initial_value: number;
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
export default interface State {
  auth: IAuthState;
  accounts: IAccount[];
}
