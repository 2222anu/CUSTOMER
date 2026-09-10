import React from 'react';
import { QtPayLogo } from '../components/QtPayLogo';

export const SplashScreen: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div className="fade-in" style={{ textAlign: 'center' }}>
        <QtPayLogo variant="splash" />
      </div>
    </div>
  );
};
