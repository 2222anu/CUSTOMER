import React from 'react';
import { designSystem } from '../design-system';

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
        backgroundColor: designSystem.colors.surface,
        color: designSystem.colors.textPrimary,
        border: `1px solid ${designSystem.colors.borderStrong}`,
        borderRadius: designSystem.radii.md,
        padding: '14px 20px',
        fontSize: '15px',
        fontWeight: designSystem.typography.weights.bold,
        cursor: 'pointer',
        boxShadow: designSystem.shadows.none,
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: designSystem.spacing.sm,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
