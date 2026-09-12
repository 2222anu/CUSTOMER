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
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className="interactive-tap"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        flex: 1,
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '16px',
          backgroundColor: highlighted ? '#2e83ff' : '#eef5ff',
          border: `1px solid ${highlighted ? '#2e83ff' : '#d6e6ff'}`,
          color: highlighted ? '#ffffff' : '#2e83ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'none',
          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: '11.5px',
          fontWeight: 700,
          color: '#0f172a',
          textAlign: 'center',
          lineHeight: '14px',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
    </div>
  );
};
