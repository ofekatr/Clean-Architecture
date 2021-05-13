import React from "react";
import { User } from "../generated/graphql";

interface UsersListProps {
  users: ({
    __typename?: "User" | undefined;
  } & Pick<User, "id" | "email" | "refreshTokenVersion">)[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <>
      {
        <ul>
          {users.map(({ id, email }) => (
            <li key={id}>{`User ID - ${id}, Email: ${email}`}</li>
          ))}
        </ul>
      }
    </>
  );
};

export default UsersList;
