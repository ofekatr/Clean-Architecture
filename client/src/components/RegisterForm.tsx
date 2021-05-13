import React from "react";
import { RouteComponentProps } from "react-router";
import { useRegisterMutation } from "../generated/graphql";
import useForm from "../hooks/useForm";
import { GeneralObjectFunction } from "../types/general";

interface IFormValues {
  email: string;
  password: string;
}

const RegisterForm: React.FC<RouteComponentProps> = ({ history }) => {
  const [register] = useRegisterMutation();

  const onSubmitCallback = async (values: IFormValues) => {
    const { data, errors } = await register({
      variables: values,
    });

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

export default RegisterForm;
