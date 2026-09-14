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
        backgroundColor: '#0B0B14',
      }}
    />
  );
};
