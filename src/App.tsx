import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";

import { GlobalStyle } from "./styles/global";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Routes />
    </Provider>
  );
}

export default App;
