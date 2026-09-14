import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { useApp } from '../state/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Connecting to secure banking network...');

  useEffect(() => {
    // Fast, crisp cinematic loader progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 4;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        if (next > 70) {
          setStatusText('Securing account credentials...');
        } else if (next > 40) {
          setStatusText('Verifying NPCI UPI payment gateway...');
        }
        return next;
      });
    }, 60);

    const timer = setTimeout(() => {
      navigateTo('ONBOARDING');
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigateTo]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0B0B14',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '48px 24px 36px 24px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Top Security Tier Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#151524',
          border: '1px solid #2C2C44',
          borderRadius: '9999px',
          padding: '6px 14px',
          fontSize: '11.5px',
          fontWeight: 700,
          color: '#7FE87F',
          boxShadow: 'none',
          zIndex: 3,
        }}
      >
        <ShieldCheck size={14} color="#7FE87F" />
        <span>256-Bit Hardware Encryption</span>
      </div>

      {/* Center Brand Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 3,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '110px',
            height: '110px',
            borderRadius: '28px',
            backgroundColor: '#151524',
            border: '1.5px solid #2C2C44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: 'none',
            overflow: 'hidden',
          }}
        >
          <AlphPayLogo variant="icon" size={64} themeMode="dark" />
        </div>

        {/* Oversized Brand Typography */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            lineHeight: 1,
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'baseline',
            gap: '6px',
          }}
        >
          <span>alph</span>
          <span style={{ color: '#7FE87F' }}>pay</span>
        </div>

        {/* Minimalist Sub-Tag */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#A2A2BA',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Fast</span>
          <span style={{ color: '#7FE87F' }}>•</span>
          <span>Unified</span>
          <span style={{ color: '#7FE87F' }}>•</span>
          <span>Secure</span>
        </div>
      </div>

      {/* Bottom Loader Dock */}
      <div
        style={{
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          width: '100%',
          maxWidth: '310px',
        }}
      >
        {/* Precision Progress Bar */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              height: '4px',
              width: '100%',
              backgroundColor: '#1E1E32',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'none',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: '#7FE87F',
                borderRadius: '9999px',
                transition: 'width 0.08s linear',
                boxShadow: 'none',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '8px',
              fontSize: '11px',
              color: '#A2A2BA',
              fontWeight: 600,
            }}
          >
            <span>{statusText}</span>
            <span style={{ fontWeight: 800, color: '#7FE87F' }}>{progress}%</span>
          </div>
        </div>

        {/* NPCI Trust Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '12px',
            padding: '8px 14px',
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: 'none',
          }}
        >
          <ShieldCheck size={15} color="#7FE87F" />
          <span style={{ fontSize: '10.5px', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.04em' }}>
            NPCI • BHIM UPI • 256-BIT SECURED
          </span>
          <Lock size={12} color="#7FE87F" />
        </div>
      </div>
    </div>
  );
};
