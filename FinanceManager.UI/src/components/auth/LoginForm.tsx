import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
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
            navigate(ROUTES.HOME);
        } catch {
            // Error is handled by AuthContext
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormDisabled = isLoading || isSubmitting;

    return (
        <div className={`auth-form ${isFormDisabled ? 'auth-form__loading' : ''}`}>
            <div className="auth-form__header">
                <h1 className="auth-form__title">Welcome back</h1>
                <p className="auth-form__subtitle">Sign in to your finance account</p>
            </div>
            
            {error && (
                <div className="auth-form__error">
                    <span className="auth-form__error-icon">⚠</span>
                    <p className="auth-form__error-text">{error}</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate className="auth-form__form">
                <Input 
                    label="Email" 
                    name="email"
                    type="email"
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    disabled={isFormDisabled}
                    autoComplete="current-password"
                    required
                />
                
                <div className="auth-form__actions">
                    <Button 
                        type="submit" 
                        disabled={isFormDisabled}
                        loading={isSubmitting}
                        fullWidth
                        className="auth-form__button"
                        aria-label={isSubmitting ? 'Signing in...' : 'Sign in'}
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>
                </div>
            </form>
            
            <div className="auth-form__bottom">
                <p className="auth-form__bottom-text">
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-form__link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};