import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Lock } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { useApp } from '../state/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 80);

    const timer = setTimeout(() => {
      navigateTo('ONBOARDING');
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [navigateTo]);

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 32%, #2e83ff 0%, #1d4ed8 45%, #0e274d 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '48px 24px 40px 24px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glowing rings */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
          pointerEvents: 'none',
          boxShadow: '0 0 80px rgba(46, 131, 255, 0.35)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 255, 255, 0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Tag Pill */}
      <div
        style={{
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.14)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          padding: '6px 14px',
          borderRadius: '20px',
        }}
      >
        <Zap size={13} fill="#ffffff" />
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          India's Next-Gen Payments SuperApp
        </span>
      </div>

      {/* Hero Centered Logo & Brand Identity */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 2,
          marginTop: '-20px',
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: '16px',
            borderRadius: '28px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            marginBottom: '16px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
          }}
        >
          <QtPayLogo variant="splash" themeMode="dark" size={170} showTagline={false} />
        </div>

        <h1
          style={{
            fontSize: '34px',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '0.06em',
            margin: '0 0 6px 0',
          }}
        >
          QTPAY
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '0.03em',
          }}
        >
          <span>Instant UPI</span>
          <span>&bull;</span>
          <span>Multi-Banking</span>
          <span>&bull;</span>
          <span>0% Fees</span>
        </div>
      </div>

      {/* Bottom Loading Progress & Trust Footer */}
      <div
        style={{
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        {/* Progress Bar */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              height: '4px',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: '#ffffff',
                borderRadius: '9999px',
                transition: 'width 0.1s linear',
                boxShadow: '0 0 10px #ffffff',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '6px',
              fontSize: '10.5px',
              color: 'rgba(255, 255, 255, 0.75)',
              fontWeight: 600,
            }}
          >
            <span>Securing banking channel...</span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>{progress}%</span>
          </div>
        </div>

        {/* NPCI / 256-Bit SSL Trust Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: 'rgba(14, 39, 77, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            padding: '8px 14px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <ShieldCheck size={16} color="#38bdf8" />
          <span style={{ fontSize: '11px', color: '#e2e8f0', fontWeight: 700, letterSpacing: '0.02em' }}>
            NPCI • BHIM UPI • 256-Bit Hardware Encrypted
          </span>
          <Lock size={13} color="#94a3b8" />
        </div>
      </div>
    </div>
  );
};

