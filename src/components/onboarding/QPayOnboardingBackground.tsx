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
        background: 'radial-gradient(circle at 50% 36%, #2A2A3E 0%, #1A1A2E 60%, #0E0E1A 100%)',
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
          background: 'radial-gradient(circle, rgba(127, 232, 127, 0.18) 0%, rgba(159, 238, 159, 0.05) 45%, transparent 70%)',
          filter: 'blur(50px)',
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
          background: 'radial-gradient(circle, rgba(127, 232, 127, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
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
          border: '1px solid rgba(127, 232, 127, 0.12)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
