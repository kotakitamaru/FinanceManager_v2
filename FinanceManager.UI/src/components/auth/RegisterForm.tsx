import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { Input } from '../common/Input.tsx';
import { Button } from "@components/common/Button.tsx";
import { Link } from "react-router-dom";
import { useAuth } from '@contexts/AuthContext.tsx';
import { validateEmail, validatePassword, validatePasswordConfirmation, validateName } from '../../utils/validation';
import { ROUTES } from '@/constants';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const { register, isLoading, error, clearError } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        const nameValidation = validateName(formData.name);
        if (!nameValidation.isValid) {
            newErrors.name = nameValidation.error!;
        }
        
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) {
            newErrors.email = emailValidation.error!;
        }
        
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.error!;
        }
        
        const confirmPasswordValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword);
        if (!confirmPasswordValidation.isValid) {
            newErrors.confirmPassword = confirmPasswordValidation.error!;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            // Reset form on successful registration
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            setErrors({});
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            // Error is handled by AuthContext
            console.error('Registration failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormDisabled = isLoading || isSubmitting;

    return (
        <div className="login-form">
            <div>
                <label>Create Account</label><br/>
                <span className="text-muted">Enter your details to create a new account</span>
            </div>
            
            {error && (
                <div className="error-message text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate>
                <Input 
                    label="Name" 
                    name="name"
                    type="text"
                    placeholder='Enter your name'
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    disabled={isFormDisabled}
                    autoComplete="name"
                    required
                />
                
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
                    autoComplete="new-password"
                    required
                />
                
                <Input 
                    label="Confirm Password" 
                    name="confirmPassword"
                    type="password"
                    placeholder='Confirm your password'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    disabled={isFormDisabled}
                    autoComplete="new-password"
                    required
                />
                
                <Button 
                    type="submit" 
                    disabled={isFormDisabled}
                    className={isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                    aria-label={isSubmitting ? 'Creating account...' : 'Create account'}
                >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>
            </form>
            
            <span className="auth-bottom-text text-muted">
                Already have an account? <Link to='/login'>Sign in</Link>
            </span>
        </div>
    );
};