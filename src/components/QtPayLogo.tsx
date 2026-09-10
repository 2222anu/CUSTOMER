import React from 'react';

interface QtPayLogoProps {
  variant?: 'full' | 'horizontal' | 'icon' | 'splash' | 'header';
  size?: number;
  showTagline?: boolean;
  themeMode?: 'light' | 'dark';
}

export const QtPayLogo: React.FC<QtPayLogoProps> = ({
  variant = 'full',
  size,
  showTagline = true,
  themeMode = 'light',
}) => {
  const isDark = themeMode === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#111144';
  const subTextColor = '#F98513';

  const renderSymbolSVG = (symbolDim: number) => (
    <svg
      width={symbolDim}
      height={symbolDim}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Aster Flower Blue Gradient for Q */}
        <linearGradient id="asterBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A4BCEE" />
          <stop offset="50%" stopColor="#7B96D4" />
          <stop offset="100%" stopColor="#5872B8" />
        </linearGradient>

        {/* Deep Space Royal Gradient for T */}
        <linearGradient id="deepSpaceRoyalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A3D9E" />
          <stop offset="60%" stopColor="#223382" />
          <stop offset="100%" stopColor="#111144" />
        </linearGradient>

        {/* Habanero Orange Gradient for Sweeping Arrow */}
        <linearGradient id="habaneroOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9E1B" />
          <stop offset="50%" stopColor="#F98513" />
          <stop offset="100%" stopColor="#D96404" />
        </linearGradient>
      </defs>

      {/* Outer Q Circle Loop (Aster Flower Blue) */}
      <path
        d="M 56 26 C 32 26 16 44 16 70 C 16 96 34 112 60 112 C 74 112 86 104 94 93"
        stroke="url(#asterBlueGrad)"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {/* Inner Q Tail (Aster Flower Blue) */}
      <path
        d="M 50 84 C 62 84 76 92 94 104 C 102 108 108 100 102 92 C 86 76 72 62 56 48"
        stroke="url(#asterBlueGrad)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* T Horizontal Bar (Deep Space Royal) */}
      <path
        d="M 62 32 L 110 32"
        stroke="url(#deepSpaceRoyalGrad)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* T Stem (Deep Space Royal) */}
      <path
        d="M 94 102 L 94 36"
        stroke="url(#deepSpaceRoyalGrad)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Sweeping Habanero Orange Arrow arching under Q and over T */}
      <path
        d="M 22 72 C 22 100 52 116 88 88 C 106 74 122 52 134 32"
        stroke="url(#habaneroOrangeGrad)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Arrowhead Pointing Up-Right (Habanero Orange) */}
      <path
        d="M 118 30 L 138 24 L 132 46 Z"
        fill="url(#habaneroOrangeGrad)"
      />
    </svg>
  );

  if (variant === 'icon') {
    const iconDim = size || 44;
    return (
      <div
        style={{
          width: `${iconDim}px`,
          height: `${iconDim}px`,
          borderRadius: '14px',
          backgroundColor: '#111144',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(17, 17, 68, 0.25)',
        }}
      >
        {renderSymbolSVG(iconDim * 0.75)}
      </div>
    );
  }

  const symbolDim = variant === 'splash' ? 84 : variant === 'header' ? 36 : 44;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: variant === 'splash' ? 'column' : 'row',
        alignItems: 'center',
        gap: variant === 'splash' ? '12px' : '8px',
        userSelect: 'none',
      }}
    >
      {renderSymbolSVG(symbolDim)}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: variant === 'splash' ? 'center' : 'flex-start',
        }}
      >
        {/* Exact Wordmark Typography matching New Guidelines Image */}
        <span
          style={{
            fontSize: variant === 'splash' ? '34px' : variant === 'header' ? '20px' : '22px',
            fontWeight: '900',
            color: textColor,
            letterSpacing: '0.04em',
            lineHeight: '1',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          QT PAY
        </span>

        {showTagline && (
          <span
            style={{
              fontSize: variant === 'splash' ? '9.5px' : '7px',
              fontWeight: '800',
              color: subTextColor,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginTop: variant === 'splash' ? '6px' : '3px',
            }}
          >
            QUICK. TRUSTED. PAYMENTS.
          </span>
        )}
      </div>
    </div>
  );
};
