import React from 'react';

export const QPayOnboardingBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #ffffff 100%)',
      }}
    >
      {/* Primary Top Studio Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46, 131, 255, 0.12) 0%, rgba(56, 189, 248, 0.04) 45%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle Secondary Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '75%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 39, 77, 0.04) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Ambient Halo Ring */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          border: '1px solid rgba(46, 131, 255, 0.08)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
