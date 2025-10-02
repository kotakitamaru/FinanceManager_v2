import { type ButtonHTMLAttributes, type ReactNode } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = ({ className, children, ...rest }: ButtonProps) => {
  const mergedClassName = className ? `button ${className}` : "button";

  return (
    <button className={mergedClassName} {...rest}>
      {children}
    </button>
  );
};