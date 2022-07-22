import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";

import { GlobalStyle } from "./styles/global";
import store from "./store";
import ToastComponent from "./components/utils/Toast";
import ThemeStateProvider from "./providers/theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeStateProvider>
        <GlobalStyle />
        <Routes />
        <ToastComponent />
      </ThemeStateProvider>
    </Provider>
  );
}

export default App;
