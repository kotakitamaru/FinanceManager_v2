import React from 'react';
import {RegisterForm} from "@components/auth/RegisterForm.tsx";

const Register: React.FC = () => {
  return (
      <div className={"auth-container"}>
          <div className={"auth-header"}>
              <h1>Create Account</h1>
              <h2>Start managing your finances today</h2>
          </div>
          <RegisterForm />
      </div>
  );
};

export default Register;
