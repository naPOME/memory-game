import React from 'react';

type ButtonProps = {
  label: string; 
  onClick?: () => void; 
  className?: string; 
  disabled?: boolean;
};

export function Button({ label, onClick, className = '', disabled = false }: ButtonProps) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
