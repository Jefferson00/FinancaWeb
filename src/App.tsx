import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";

import { GlobalStyle } from "./styles/global";
import store from "./store";
import ToastComponent from "./components/utils/Toast";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Routes />
      <ToastComponent />
    </Provider>
  );
}

export default App;
