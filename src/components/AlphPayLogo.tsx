import React from 'react';

interface AlphPayLogoProps {
  variant?: 'full' | 'horizontal' | 'icon' | 'splash' | 'header';
  size?: number;
  themeMode?: 'light' | 'dark';
}

export const AlphPayLogo: React.FC<AlphPayLogoProps> = ({
  variant = 'full',
  size,
  themeMode = 'dark',
}) => {
  const isDark = themeMode === 'dark';
  const primaryGreen = '#7FE87F';
  const textColor = isDark ? '#FFFFFF' : '#000000';

  if (variant === 'icon') {
    const iconDim = size || 36;
    return (
      <svg
        width={iconDim}
        height={iconDim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Diamond / Rhombus Brand Shape */}
        <path
          d="M24 4L42 24L24 44L6 24L24 4Z"
          fill={primaryGreen}
        />
        {/* Inner geometric accent */}
        <path
          d="M24 13L35 24L24 35L13 24L24 13Z"
          fill="#000000"
        />
        <circle cx="24" cy="24" r="4" fill={primaryGreen} />
      </svg>
    );
  }

  const height = size || (variant === 'splash' ? 48 : variant === 'header' ? 24 : 32);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
      }}
    >
      {/* Rhombus Icon */}
      <svg
        width={height}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M24 4L42 24L24 44L6 24L24 4Z"
          fill={primaryGreen}
        />
        <path
          d="M24 14L34 24L24 34L14 24L24 14Z"
          fill="#1A1A2E"
        />
        <circle cx="24" cy="24" r="3.5" fill={primaryGreen} />
      </svg>

      {/* Lowercase "alph pay" Typography */}
      <span
        style={{
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
          fontSize: `${height * 0.75}px`,
          fontWeight: 800,
          color: textColor,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'baseline',
          gap: '4px',
        }}
      >
        <span>alph</span>
        <span style={{ color: primaryGreen }}>pay</span>
      </span>
    </div>
  );
};
