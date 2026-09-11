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
        background: 'linear-gradient(180deg, #1e70e6 0%, #2e83ff 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 24px 40px 24px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Glow Spheres */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-20%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.06)',
          pointerEvents: 'none',
        }}
      />

      <div />

      {/* Hero Vector SVG Logo & Tagline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <div
          style={{
            padding: '24px 36px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
          }}
        >
          <QtPayLogo variant="splash" themeMode="dark" size={160} showTagline={true} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: designSystem.typography.weights.extrabold, color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
            QTPay Digital Wallet
          </h1>
          <p style={{ fontSize: '13px', fontWeight: designSystem.typography.weights.medium, color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
            Unified Payments Interface & Instant Banking
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress Pill */}
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '240px' }}>
        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '65%',
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              animation: 'fadeIn 1.8s ease-in-out forwards',
            }}
          />
        </div>
        <span style={{ fontSize: '10px', fontWeight: designSystem.typography.weights.extrabold, color: 'rgba(255, 255, 255, 0.75)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          NPCI & UPI Certified
        </span>
      </div>
    </div>
  );
};
