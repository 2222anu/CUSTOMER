import React, { useEffect } from 'react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { QuantiraLogo } from '../components/QuantiraLogo';
import { useApp } from '../state/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('ONBOARDING');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 24px 40px 24px',
        boxSizing: 'border-box',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Invisible spacer to perfectly balance the central logo */}
      <div style={{ height: '30px' }} />

      {/* Central App Brand Logo */}
      <div
        className="fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '26px',
            backgroundColor: '#12121E',
            border: '1px solid #222238',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: 'none',
          }}
        >
          <AlphPayLogo variant="icon" size={56} themeMode="dark" />
        </div>

        <AlphPayLogo variant="horizontal" size={38} themeMode="dark" />
      </div>

      {/* Bottom Center: Powered by Quantira Technologies */}
      <div
        className="fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#6E6E85',
            letterSpacing: '0.04em',
            textTransform: 'lowercase',
          }}
        >
          powered by
        </span>
        <QuantiraLogo size={22} color="#7FE87F" textColor="#E2E2F0" />
      </div>
    </div>
  );
};
