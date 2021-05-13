import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Layout from "./layout/Layout";
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

const Router: React.FC = () => {
  return (
    <>
      <React.Suspense fallback={<PageLoader />}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      </React.Suspense>
    </>
  );
};

export default Router;
