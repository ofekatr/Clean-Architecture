import React from "react";
import LogoutButton from "../components/LogoutButton";
import Me from "../components/Me";
import PageLoader from "../components/PageLoader";
import UsersList from "../components/UsersList";
import { useGetAllUsersQuery } from "../generated/graphql";
import { getAccessToken } from "../services/jwt.service";

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
      <Me />
      <hr />
      <UsersList users={data.getAllUsers} />
      {getAccessToken() && (
        <>
          <hr />
          <LogoutButton />
        </>
      )}
    </>
  );
};

export default HomePage;
