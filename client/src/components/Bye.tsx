import React from "react";
import { useByeQuery } from "../generated/graphql";
import PageLoader from "./PageLoader";

const Bye: React.FC = () => {
  const { data, loading, error } = useByeQuery();

  if (error) {
    return <div>Error.</div>;
  }

  if (loading) {
    return <PageLoader />;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default Bye;
