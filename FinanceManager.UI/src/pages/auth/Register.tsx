import React from 'react';
import './Auth.css';
import { RegisterForm } from "@components/auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <RegisterForm />
      </div>
      
    </div>
  );
};

export default Register;
