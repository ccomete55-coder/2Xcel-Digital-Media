import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({ children, className = '' }) => (
  <span className={`text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-gray-500 ${className}`}>
    {children}
  </span>
);
