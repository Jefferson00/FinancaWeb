import { makeObservable, observable } from "mobx";

export interface IMenu {
  item: string;
}

export class MenuStore {
  public menu: IMenu = {
    item: 'Home'
  }

  constructor() {
    makeObservable(this, {
      menu: observable,
    });
  }

  public selectItem = (item: string) => {
    this.menu.item = item;
  }
}

