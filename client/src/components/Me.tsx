import React from "react";
import { useMeQuery } from "../generated/graphql";
import PageLoader from "./PageLoader";

const Me: React.FC = () => {
  const { data, loading, error } = useMeQuery();
  if (error) {
      return <></>
  }

  if (loading) {
      return <PageLoader />
  }

  if (!data?.me) {
    return <div>Not Logged In</div>
  }

  return <div>{`Currently Logged In: ${data.me?.id} - Email: ${data.me?.email}`}</div>;
};

export default Me;
