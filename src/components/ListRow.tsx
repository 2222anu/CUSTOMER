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
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 18px',
        backgroundColor: '#FFFFFF',
        border: '1.5px solid #DAD1C8',
        borderRadius: '16px',
        marginBottom: '10px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease',
        boxShadow: '0 2px 10px rgba(17, 17, 68, 0.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {icon && (
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: danger ? '#FDE8D7' : '#FDE8D7',
              color: danger ? '#D96404' : '#F98513',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <div
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: danger ? '#D96404' : '#111144',
            }}
          >
            {label}
          </div>
          {subLabel && (
            <div style={{ fontSize: '12px', color: '#5C564D', marginTop: '2px' }}>
              {subLabel}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {rightElement}
        {onClick && !rightElement && <ChevronRight size={18} color="#5C564D" />}
      </div>
    </div>
  );
};
