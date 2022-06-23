import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/Auth";
import accountReducer from "./modules/Accounts";

export default configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
  },
});
