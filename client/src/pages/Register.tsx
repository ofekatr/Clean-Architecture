import React from "react";
import { RouteComponentProps } from "react-router";
import RegisterForm from "../components/RegisterForm";

const Register: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return <RegisterForm {...props} />;
};

export default Register;
