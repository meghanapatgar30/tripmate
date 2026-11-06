import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] tracking-tight';

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-4.5 py-2.5 text-xs sm:text-sm gap-2',
    lg: 'px-6 py-3.5 text-sm sm:text-base gap-2.5 font-extrabold',
  };

  const variantClasses = {
    primary: 'bg-[#E10600] text-white hover:bg-[#C40500] focus:ring-[#E10600] shadow-2xs hover:shadow-xs',
    secondary: 'bg-[#2A2A2A] text-white hover:bg-black focus:ring-[#2A2A2A] shadow-2xs',
    accent: 'bg-[#E10600] text-white hover:bg-[#C40500] focus:ring-[#E10600] shadow-2xs',
    outline: 'border border-[#C0C0C0] bg-white text-[#2A2A2A] hover:bg-zinc-100 hover:border-[#2A2A2A] focus:ring-[#2A2A2A]',
    ghost: 'text-[#2A2A2A] hover:text-black hover:bg-zinc-200/60 focus:ring-zinc-400',
    danger: 'bg-[#E10600] text-white hover:bg-[#C40500] focus:ring-[#E10600]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
