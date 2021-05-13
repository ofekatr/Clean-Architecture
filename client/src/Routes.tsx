import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Layout from "./layout/Layout";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));

const Router: React.FC = () => {
  return (
    <>
      <React.Suspense fallback={<PageLoader />}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/register" component={RegisterPage}></Route>
              <Route exact path="/login" component={LoginPage}></Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      </React.Suspense>
    </>
  );
};

export default Router;
