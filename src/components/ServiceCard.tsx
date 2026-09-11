import React from 'react';
import { designSystem } from '../design-system';

interface ServiceCardProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
  bgColor?: string;
  iconBg?: string;
  iconColor?: string;
  borderColor?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  label,
  icon,
  onClick,
  badge,
  bgColor = designSystem.colors.surface,
  iconBg = designSystem.colors.primaryLight,
  iconColor = designSystem.colors.primary,
  borderColor = designSystem.colors.borderHairline,
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
      aria-label={label}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 6px',
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: designSystem.radii.md,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.15s ease',
        textAlign: 'center',
        boxShadow: designSystem.shadows.none,
      }}
    >
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: '4px',
            fontSize: '9px',
            fontWeight: designSystem.typography.weights.extrabold,
            backgroundColor: designSystem.colors.primary,
            color: designSystem.colors.textOnPrimary,
            padding: '2px 6px',
            borderRadius: designSystem.radii.xs,
            textTransform: 'uppercase',
          }}
        >
          {badge}
        </span>
      )}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: designSystem.radii.full,
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconColor,
          marginBottom: designSystem.spacing.sm,
          border: `1px solid ${designSystem.colors.primaryBorder}`,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: '11px',
          fontWeight: designSystem.typography.weights.bold,
          color: designSystem.colors.textPrimary,
          lineHeight: '1.2',
        }}
      >
        {label}
      </span>
    </div>
  );
};
