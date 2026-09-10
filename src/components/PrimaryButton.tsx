import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      style={{
        width: fullWidth ? '100%' : 'auto',
        backgroundColor: disabled ? 'rgba(17, 17, 68, 0.12)' : '#F98513',
        color: disabled ? 'rgba(17, 17, 68, 0.4)' : '#FFFFFF',
        border: 'none',
        borderRadius: '16px',
        padding: '16px 24px',
        fontSize: '16px',
        fontWeight: '800',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 6px 20px rgba(249, 133, 19, 0.35)',
        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
