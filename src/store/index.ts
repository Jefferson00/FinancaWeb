import { createContext, useContext } from "react";
import { FinanceDataStore } from "./FinanceDataStore";
import { MenuStore } from "./MenuStore";

export const rootStoreContext = createContext({
  menuStore: new MenuStore(),
  financeStore: new FinanceDataStore(),
});

export const useStores = () => useContext(rootStoreContext);