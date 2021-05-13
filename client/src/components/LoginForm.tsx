import React from "react";
import { RouteComponentProps } from "react-router";
import { useLoginMutation } from "../generated/graphql";
import useForm from "../hooks/useForm";
import { setAccessToken } from "../services/jwt.service";
import { GeneralObjectFunction } from "../types/general";

interface IFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();

  const onSubmitCallback = async (values: IFormValues) => {
    const { data } = await login({
      variables: values,
    });

    const accessToken = data?.login?.accessToken;
    if (accessToken) {
      setAccessToken(accessToken);
    }

    history.push("/");
  };

  const { onChange, onSubmit } = useForm(
    { email: "", password: "" },
    onSubmitCallback as GeneralObjectFunction
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          Email: 
          <input name="email" type="text" onChange={onChange} />
        </div>
        <div>
          Password: 
          <input name="password" type="password" onChange={onChange} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
