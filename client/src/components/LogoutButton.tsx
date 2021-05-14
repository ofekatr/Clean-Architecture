import React from "react";
import { MeDocument, MeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../services/jwt.service";

const LogoutButton: React.FC = () => {
  const [logout, { client }] = useLogoutMutation({
      update: (cache) => {
          cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                  me: null,
              },

          })
      }
  });
  const onClick = async () => {
    await logout();
    setAccessToken("");
    await client.resetStore();
  };
  return <button onClick={onClick}>Logout</button>;
};

export default LogoutButton;
