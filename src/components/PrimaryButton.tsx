import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  fullWidth = true,
  className = '',
  disabled,
  style,
  size = 'lg',
  ...props
}) => {
  return (
    <button
      className={`interactive-tap ${className}`}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        minHeight: size === 'sm' ? '38px' : size === 'md' ? '44px' : '52px',
        backgroundColor: disabled ? '#1E1E32' : '#7FE87F',
        color: disabled ? '#6E6E85' : '#0B0B14',
        border: disabled ? '1px solid #2C2C44' : 'none',
        borderRadius: '14px',
        padding: size === 'sm' ? '0 14px' : '0 20px',
        fontSize: size === 'sm' ? '13px' : '15px',
        fontWeight: 800,
        letterSpacing: '-0.01em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 4px 14px rgba(127, 232, 127, 0.25)',
        transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        userSelect: 'none',
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
