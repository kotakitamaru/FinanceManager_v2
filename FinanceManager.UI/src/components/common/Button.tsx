import { type ButtonHTMLAttributes, type ReactNode } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = ({ 
  className, 
  children, 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled,
  ...rest 
}: ButtonProps) => {
  const sizeClass = size === 'medium' ? '' : size;
  const variantClass = variant === 'primary' ? '' : variant;
  
  const classes = [
    'button',
    variantClass,
    sizeClass,
    fullWidth ? 'full-width' : '',
    loading ? 'loading' : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classes} 
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  );
};