import React from 'react';
import { ChevronRight } from 'lucide-react';
import { designSystem } from '../design-system';

interface ListRowProps {
  icon?: React.ReactNode;
  label: string;
  subLabel?: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export const ListRow: React.FC<ListRowProps> = ({
  icon,
  label,
  subLabel,
  rightElement,
  onClick,
  danger = false,
}) => {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        backgroundColor: designSystem.colors.surface,
        border: `1px solid ${danger ? designSystem.colors.dangerLight : designSystem.colors.borderHairline}`,
        borderRadius: designSystem.radii.md,
        marginBottom: designSystem.spacing.sm,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease',
        boxShadow: designSystem.shadows.none,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing.md }}>
        {icon && (
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: designSystem.radii.md,
              backgroundColor: danger ? designSystem.colors.dangerLight : designSystem.colors.primaryLight,
              color: danger ? designSystem.colors.danger : designSystem.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${danger ? designSystem.colors.dangerLight : designSystem.colors.primaryBorder}`,
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <div
            style={{
              fontSize: '15px',
              fontWeight: designSystem.typography.weights.bold,
              color: danger ? designSystem.colors.danger : designSystem.colors.textPrimary,
            }}
          >
            {label}
          </div>
          {subLabel && (
            <div style={{ fontSize: '12px', color: designSystem.colors.textSecondary, marginTop: '2px' }}>
              {subLabel}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {rightElement}
        {onClick && !rightElement && <ChevronRight size={18} color={designSystem.colors.textMuted} />}
      </div>
    </div>
  );
};
