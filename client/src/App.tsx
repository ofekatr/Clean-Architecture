import React from "react";
import { useHelloQuery } from "./generated/graphql";

function App() {
  const { data, loading } = useHelloQuery();

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data.hello)}</div>;
}

export default App;
