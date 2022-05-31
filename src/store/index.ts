import { createContext, useContext } from "react";
import { FinanceDataStore } from "./FinanceDataStore";
import { MenuStore } from "./MenuStore";
import { AuthStore } from "./AuthStore";

export const rootStoreContext = createContext({
  menuStore: new MenuStore(),
  financeStore: new FinanceDataStore(),
  authStore: new AuthStore(),
});

export const useStores = () => useContext(rootStoreContext);