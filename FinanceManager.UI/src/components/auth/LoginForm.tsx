import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { Input } from '../common/Input.tsx';
import { Button } from "@components/common/Button.tsx";
import { Link } from "react-router-dom";
import { useAuth } from '@contexts/AuthContext.tsx';
import { ROUTES } from '@/constants';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear field-specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Clear general auth error when user starts typing
        if (error) {
            clearError();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        
        try {
            await login(formData.email, formData.password);
            // Reset form on successful login
            setFormData({ email: '', password: '' });
            setErrors({});
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            // Error is handled by AuthContext
            console.error('Login failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormDisabled = isLoading || isSubmitting;

    return (
        <div className="login-form">
            <div>
                <label>Sign In</label><br/>
                <span className="text-muted">Enter your email and password to access your account</span>
            </div>
            
            {error && (
                <div className="error-message text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate>
                <Input 
                    label="Email" 
                    name="email"
                    type="email"
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    disabled={isFormDisabled}
                    autoComplete="email"
                    required
                />
                
                <Input 
                    label="Password" 
                    name="password"
                    type="password"
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    disabled={isFormDisabled}
                    autoComplete="current-password"
                    required
                />
                
                <Button 
                    type="submit" 
                    disabled={isFormDisabled}
                    className={isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                    aria-label={isSubmitting ? 'Signing in...' : 'Sign in'}
                >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
            
            <span className="auth-bottom-text text-muted">
                Don't have an account? <Link to='/register'>Sign up</Link>
            </span>
        </div>
    );
};