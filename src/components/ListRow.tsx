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
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
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
              backgroundColor: danger ? '#f8fafc' : '#eef5ff',
              color: danger ? '#64748b' : '#2e83ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${danger ? '#e2e8f0' : '#d6e6ff'}`,
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
              color: danger ? '#475569' : '#0f172a',
            }}
          >
            {label}
          </div>
          {subLabel && (
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
              {subLabel}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {rightElement}
        {onClick && !rightElement && <ChevronRight size={18} color="#94a3b8" />}
      </div>
    </div>
  );
};
