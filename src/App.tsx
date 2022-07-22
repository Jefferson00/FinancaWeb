import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";

import { GlobalStyle } from "./styles/global";
import store from "./store";
import ToastComponent from "./components/utils/Toast";
import ThemeStateProvider from "./providers/theme";
import EnvironmentMessage from "./components/app/EnvironmentMessage";

function App() {
  return (
    <Provider store={store}>
      <ThemeStateProvider>
        <GlobalStyle />
        <Routes />
        <ToastComponent />
        {process.env.REACT_APP_ENV !== "production" && <EnvironmentMessage />}
      </ThemeStateProvider>
    </Provider>
  );
}

export default App;
