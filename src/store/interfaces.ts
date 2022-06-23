export interface IAccount {
  id?: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
  initial_value: number;
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
