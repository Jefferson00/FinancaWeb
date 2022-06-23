import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/Auth";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
