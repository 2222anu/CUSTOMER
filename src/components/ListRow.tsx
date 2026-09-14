import React from 'react';
import { ChevronRight } from 'lucide-react';

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
      className={onClick ? 'interactive-tap' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        backgroundColor: '#2A2A3E',
        border: '1px solid #4D4D6B',
        borderRadius: '12px',
        marginBottom: '10px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.15s ease, background-color 0.15s ease',
        boxShadow: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon && (
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: danger ? 'rgba(255, 71, 87, 0.12)' : '#3A3A52',
              color: danger ? '#FF4757' : '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${danger ? '#FF4757' : '#4D4D6B'}`,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <div
            style={{
              fontSize: '14.5px',
              fontWeight: 700,
              color: danger ? '#FF6B7A' : '#FFFFFF',
            }}
          >
            {label}
          </div>
          {subLabel && (
            <div style={{ fontSize: '11.5px', color: '#B3B3C2', marginTop: '2px' }}>
              {subLabel}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {rightElement}
        {onClick && !rightElement && <ChevronRight size={18} color="#808099" />}
      </div>
    </div>
  );
};
