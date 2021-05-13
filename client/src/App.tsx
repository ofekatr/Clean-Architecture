import React from "react";
import PageLoader from "./components/PageLoader";
import useRefreshToken from "./hooks/useRefreshToken";
import Router from "./Routes";

function App() {
  const loading = useRefreshToken();

  if (loading) {
    return <PageLoader />;
  }

  return <Router />;
}

export default App;
