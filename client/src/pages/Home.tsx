import React from "react";
import PageLoader from "../components/PageLoader";
import { useGetAllUsersQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data, loading } = useGetAllUsersQuery({
    fetchPolicy: "network-only",
  });

  if (loading || !data) {
    return <PageLoader />;
  }

  return (
    <>
      <div>Home</div>
      {
        <ul>
          {data.getAllUsers.map(({ id, email }) => (
            <li key={id}>{`User ID - ${id}, Email: ${email}`}</li>
          ))}
        </ul>
      }
    </>
  );
};

export default Home;
