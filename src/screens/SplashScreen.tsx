import React, { useEffect } from 'react';
import { QtPayLogo } from '../components/QtPayLogo';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('ONBOARDING');
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#2563eb', // Vivid Electric Blue matching reference image
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '50px 28px 48px 28px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top spacer for status bar */}
      <div />

      {/* Hero Centered Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <QtPayLogo variant="splash" themeMode="dark" size={180} showTagline={false} />
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '0.04em',
            margin: 0,
            fontFamily: designSystem.typography.fontFamily,
          }}
        >
          QTPAY
        </h1>
      </div>

      {/* Bottom Muted Description Text (matching reference image) */}
      <div
        style={{
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '300px',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            fontWeight: designSystem.typography.weights.medium,
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          QtPay is a mobile application that connects instant UPI payments, bill recharges, and banking services.
        </p>
      </div>
    </div>
  );
};

