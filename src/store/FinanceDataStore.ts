import { makeObservable, observable } from "mobx";
import { accounts, expansesAccount, incomesAccount } from "./fakeDatas";
import { IAccount } from './interfaces';

export interface IFinanceData {
  month: Date;
  accounts: IAccount[];
  accountsCurrentBalance: {
    account_id: string;
    balance: number;
  }[];
}

export class FinanceDataStore {
  public financeData: IFinanceData = {
    month: new Date(),
    accounts,
    accountsCurrentBalance: [],
  }

  constructor() {
    makeObservable(this, {
      financeData: observable,
    });
  }

  public handleCalculateBalanceByMonth = (id: string) => {
    const currentMonth = this.financeData.month;

    const incomesByAccount = incomesAccount.filter(
      income => income.account_id === id &&
        currentMonth.getMonth() === new Date(income.month).getMonth() &&
        currentMonth.getFullYear() === new Date(income.month).getFullYear()
    )
    const expansesByAccount = expansesAccount.filter(
      expanse => expanse.account_id === id &&
        currentMonth.getMonth() === new Date(expanse.month).getMonth() &&
        currentMonth.getFullYear() === new Date(expanse.month).getFullYear()
    )

    let incomesSum = 0;
    incomesByAccount.map(income => {
      incomesSum = incomesSum + income.value;
    });

    let expansesSum = 0;
    expansesByAccount.map(expanse => {
      expansesSum = expansesSum + expanse.value;
    });

    return incomesSum - expansesSum;
  }

  public handleAccountBalance = () => {
    const balanceArray = accounts.map(account => {
      return {
        account_id: account.id || '',
        balance: this.handleCalculateBalanceByMonth(account.id || ''),
      }
    })
    return balanceArray;
  }

  public handleNextMonth = () => {
    const currentMonth = this.financeData.month.getMonth()
    this.financeData.month = new Date(this.financeData.month.setMonth(currentMonth + 1));
    this.financeData.accountsCurrentBalance = this.handleAccountBalance();
  }

  public handlePrevMonth = () => {
    const currentMonth = this.financeData.month.getMonth()
    this.financeData.month = new Date(this.financeData.month.setMonth(currentMonth - 1))
    this.financeData.accountsCurrentBalance = this.handleAccountBalance();
  }
}

