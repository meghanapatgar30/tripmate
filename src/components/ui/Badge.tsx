import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'charcoal' | 'silver' | 'slate' | 'teal' | 'amber'; // legacy mappings map safely
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'charcoal',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs font-bold tracking-tight',
  };

  const variantClasses = {
    red: 'bg-red-50 text-[#E10600] border border-red-200',
    charcoal: 'bg-[#2A2A2A] text-white',
    silver: 'bg-zinc-100 text-[#2A2A2A] border border-zinc-300',
    slate: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
    // Fallback safe mapping for legacy calls
    teal: 'bg-zinc-100 text-[#2A2A2A] border border-zinc-300',
    amber: 'bg-red-50 text-[#E10600] border border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.charcoal} ${className}`}
    >
      {children}
    </span>
  );
};
