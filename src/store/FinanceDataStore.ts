import { makeObservable, observable } from "mobx";
import { accounts } from "./fakeDatas";
import { IAccount } from './interfaces';

export interface IFinanceData {
  month: Date;
  accounts: IAccount[];
}

export class FinanceDataStore {
  public financeData: IFinanceData = {
    month: new Date(),
    accounts,
  }

  constructor() {
    makeObservable(this, {
      financeData: observable,
    });
  }

  public handleNextMonth = () => {
    const currentMonth = this.financeData.month.getMonth()
    this.financeData.month = new Date(this.financeData.month.setMonth(currentMonth + 1))
  }

  public handlePrevMonth = () => {
    const currentMonth = this.financeData.month.getMonth()
    this.financeData.month = new Date(this.financeData.month.setMonth(currentMonth - 1))
  }
}

