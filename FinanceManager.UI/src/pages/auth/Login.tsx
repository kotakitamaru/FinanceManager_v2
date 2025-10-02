import React from 'react';
import './Auth.css';
import {LoginForm} from "@components/auth/LoginForm.tsx";

const Login: React.FC = () => {
  return (
    <div className={"auth-container"}>
        <div className={"auth-header"}>
            <h1>Welcome back</h1>
            <h2>Sign in to your finance account</h2>
        </div>
        <LoginForm />
    </div>
  );
};

export default Login;
