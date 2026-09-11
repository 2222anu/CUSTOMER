import React from 'react';
import { designSystem } from '../design-system';

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
        backgroundColor: disabled ? designSystem.colors.borderStrong : designSystem.colors.primary,
        color: disabled ? designSystem.colors.textMuted : designSystem.colors.textOnPrimary,
        border: 'none',
        borderRadius: designSystem.radii.md,
        padding: '14px 20px',
        fontSize: '15px',
        fontWeight: designSystem.typography.weights.extrabold,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: designSystem.shadows.none,
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: designSystem.spacing.sm,
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
