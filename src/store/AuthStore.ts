import { flow, makeObservable, observable } from "mobx";

type User = {
  id?: string;
  name: string;
  avatar?: string | null;
  email: string;
  phone: string;
};

export interface IAuth {
  user: User | null;
}

export class AuthStore {
  public auth: IAuth = {
    user: null,
  };

  constructor() {
    makeObservable(this, {
      auth: observable,
    });
  }

  public setUser = (user: User | null) => {
    this.auth.user = user;
  };
}
