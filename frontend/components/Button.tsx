import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-klyro-dark';

  const variantClasses = {
    primary: 'bg-klyro-primary text-white hover:bg-indigo-500 focus:ring-klyro-primary',
    secondary: 'bg-klyro-secondary text-white hover:bg-emerald-500 focus:ring-klyro-secondary',
    outline: 'bg-transparent border-2 border-klyro-primary text-klyro-primary hover:bg-klyro-primary hover:text-white focus:ring-klyro-primary',
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
