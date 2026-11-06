import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-zinc-200 shadow-2xs transition-all duration-200 ${
        hoverable ? 'hover:border-[#2A2A2A] hover:shadow-xs hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
