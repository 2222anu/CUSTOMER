import React from 'react';
import { designSystem } from '../design-system';

interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  highlighted?: boolean;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  label,
  icon,
  onClick,
  highlighted = false,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: designSystem.spacing.sm,
        cursor: 'pointer',
        flex: 1,
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: designSystem.radii.full,
          backgroundColor: highlighted ? designSystem.colors.primary : designSystem.colors.primaryLight,
          border: `1px solid ${highlighted ? designSystem.colors.primary : designSystem.colors.primaryBorder}`,
          color: highlighted ? designSystem.colors.textOnPrimary : designSystem.colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: designSystem.shadows.none,
          transition: 'transform 0.15s ease',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: '11px',
          fontWeight: designSystem.typography.weights.extrabold,
          letterSpacing: '0.04em',
          color: designSystem.colors.textPrimary,
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </div>
  );
};
