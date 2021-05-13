import React from "react";
import Bye from "../components/Bye";
import PageLoader from "../components/PageLoader";
import UsersList from "../components/UsersList";
import { useGetAllUsersQuery } from "../generated/graphql";

const HomePage: React.FC = () => {
  const { data, loading } = useGetAllUsersQuery({
    fetchPolicy: "network-only",
  });

  if (loading || !data) {
    return <PageLoader />;
  }

  return (
    <>
      <div>Home</div>
      <UsersList users={data.getAllUsers} />
      <Bye />
    </>
  );
};

export default HomePage;
