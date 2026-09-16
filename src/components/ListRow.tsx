import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../state/AppContext';

interface ListRowProps {
  icon?: React.ReactNode;
  label: string;
  subLabel?: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  isLast?: boolean;
}

export const ListRow: React.FC<ListRowProps> = ({
  icon,
  label,
  subLabel,
  rightElement,
  onClick,
  danger = false,
  isLast = false,
}) => {
  const { t, isRtl } = useApp();
  const displayLabel = t(label, label);
  const displaySubLabel = subLabel ? t(subLabel, subLabel) : undefined;

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
      className={onClick ? 'interactive-tap' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: isLast ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease',
        boxShadow: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {icon && (
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: danger ? 'rgba(255, 71, 87, 0.12)' : 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
              color: danger ? '#FF4757' : 'var(--brand-green, #7FE87F)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: danger ? '#FF6B7A' : '#FFFFFF',
            }}
          >
            {displayLabel}
          </div>
          {displaySubLabel && (
            <div style={{ fontSize: '11.5px', color: '#8E9BAE', marginTop: '2px' }}>
              {displaySubLabel}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {rightElement}
        {onClick && !rightElement && (
          <ChevronRight size={18} color="#8E9BAE" style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
        )}
      </div>
    </div>
  );
};
