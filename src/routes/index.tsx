import { BrowserRouter, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Route from './Route';

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} isPrivate />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}