import './Auth.css';
import { LoginForm } from "@components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <LoginForm />
      </div>
      
    </div>
  );
};

export default Login;
