import React from 'react';

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
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        flex: 1,
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '20px',
          backgroundColor: highlighted ? '#F98513' : '#FFFFFF',
          border: highlighted ? 'none' : '1.5px solid #DAD1C8',
          color: highlighted ? '#FFFFFF' : '#111144',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: highlighted
            ? '0 8px 20px rgba(249, 133, 19, 0.35)'
            : '0 4px 14px rgba(17, 17, 68, 0.05)',
          transition: 'transform 0.15s ease',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: '11px',
          fontWeight: '800',
          letterSpacing: '0.04em',
          color: '#111144',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
};
