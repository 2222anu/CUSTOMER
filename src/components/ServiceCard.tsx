import React from 'react';

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
  bgColor = '#FFFFFF',
  iconBg = '#FDE8D7',
  iconColor = '#F98513',
  borderColor = '#DAD1C8',
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 6px',
        backgroundColor: bgColor,
        border: `1.5px solid ${borderColor}`,
        borderRadius: '18px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.15s ease',
        textAlign: 'center',
        boxShadow: '0 4px 14px rgba(17, 17, 68, 0.04)',
      }}
    >
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: '4px',
            fontSize: '9px',
            fontWeight: '800',
            backgroundColor: '#F98513',
            color: '#FFFFFF',
            padding: '2px 6px',
            borderRadius: '10px',
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
          borderRadius: '50%',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconColor,
          marginBottom: '8px',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: '12px',
          fontWeight: '700',
          color: '#111144',
          lineHeight: '1.2',
        }}
      >
        {label}
      </span>
    </div>
  );
};
