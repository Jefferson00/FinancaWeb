import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/Auth";
import accountReducer from "./modules/Accounts";
import menuReducer from "./modules/Menus";
import dateReducer from "./modules/Dates";
import incomesReducer from "./modules/Incomes";
import expansesReducer from "./modules/Expanses";
import transactionsReducer from "./modules/Transactions";
import creditCardReducer from "./modules/CreditCards";

export default configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    menus: menuReducer,
    dates: dateReducer,
    incomes: incomesReducer,
    expanses: expansesReducer,
    transactions: transactionsReducer,
    creditCards: creditCardReducer,
  },
});
