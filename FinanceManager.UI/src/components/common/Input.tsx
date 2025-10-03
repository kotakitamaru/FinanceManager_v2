import type { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'error';
}

export const Input = ({ 
  label, 
  error, 
  className, 
  variant = 'default',
  ...props 
}: InputProps) => {
  const containerClassName = `input-container ${error || variant === 'error' ? 'error' : ''}`;
  const inputClassName = className ? `input ${className}` : 'input';

  return (
    <div className={containerClassName}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <input 
        className={inputClassName}
        {...props}
      />
      {error && (
        <span className="input-error">
          {error}
        </span>
      )}
    </div>
  );
};