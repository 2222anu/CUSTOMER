import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  fullWidth = true,
  className = '',
  ...props
}) => {
  return (
    <button
      style={{
        width: fullWidth ? '100%' : 'auto',
        backgroundColor: '#FFFFFF',
        color: '#111144',
        border: '1.5px solid #DAD1C8',
        borderRadius: '16px',
        padding: '14px 20px',
        fontSize: '15px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(17, 17, 68, 0.04)',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
      {...props}
    >
      {children}
    </button>
  );
};
