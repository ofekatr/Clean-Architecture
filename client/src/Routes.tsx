import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <div>Hi!</div>}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
