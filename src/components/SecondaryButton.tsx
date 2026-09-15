import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'surface' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  fullWidth = true,
  variant = 'surface',
  size = 'lg',
  className = '',
  disabled,
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    if (variant === 'outline') {
      return {
        backgroundColor: 'transparent',
        color: disabled ? '#6E6E85' : '#7FE87F',
        border: disabled ? '1px solid #2C2C44' : '1.5px solid #7FE87F',
      };
    }
    if (variant === 'ghost') {
      return {
        backgroundColor: 'transparent',
        color: disabled ? '#6E6E85' : '#A2A2BA',
        border: 'none',
      };
    }
    // Default: 'surface' (Dark Obsidian button)
    return {
      backgroundColor: disabled ? '#151524' : '#1E1E32',
      color: disabled ? '#6E6E85' : '#FFFFFF',
      border: '1px solid #2C2C44',
    };
  };

  return (
    <button
      className={`interactive-tap ${className}`}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        minHeight: size === 'sm' ? '38px' : size === 'md' ? '44px' : '52px',
        borderRadius: '14px',
        padding: size === 'sm' ? '0 14px' : '0 20px',
        fontSize: size === 'sm' ? '13px' : '14.5px',
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: 'none',
        transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        userSelect: 'none',
        boxSizing: 'border-box',
        ...getVariantStyles(),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
