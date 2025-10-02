import type {InputHTMLAttributes} from 'react';
import './Input.css';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({label, error, className, ...props}: InputProps) => {
    return (
        <div className="input-container">
            {label && (
                <label className="">
                    {label}
                </label>
            )}
            <input className={className}{...props}/>
            {error && (<span className="text-sm text-red-500">{error}</span>)}
        </div>
    );
};