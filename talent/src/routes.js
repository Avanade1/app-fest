import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./pages/cadastro/cadastros";
import Login from "./pages/login/login";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route componete={() => <div>Página 404</div>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
