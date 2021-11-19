import { createContext, useContext } from "react";
import { MenuStore } from "./MenuStore";

export const rootStoreContext = createContext({
  menuStore: new MenuStore()
});

export const useStores = () => useContext(rootStoreContext);