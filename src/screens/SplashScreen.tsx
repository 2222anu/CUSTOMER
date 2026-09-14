import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { PaymentPartnerLogo } from '../components/PaymentPartnerLogo';
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
          setStatusText('Verifying SAMA Sarie payment gateway...');
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
            width: '100px',
            height: '100px',
            borderRadius: '26px',
            backgroundColor: '#151524',
            border: '1.5px solid #2C2C44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px',
            boxShadow: 'none',
            overflow: 'hidden',
          }}
        >
          <AlphPayLogo variant="icon" size={60} themeMode="dark" />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <AlphPayLogo variant="horizontal" size={36} themeMode="dark" />
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

        {/* SAMA & Payment Partner Trust Pill */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '14px',
            padding: '10px 14px',
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={14} color="#7FE87F" />
            <span style={{ fontSize: '10px', color: '#A2A2BA', fontWeight: 700, letterSpacing: '0.04em' }}>
              SAMA &bull; SARIE &bull; 256-BIT HARDWARE SECURED
            </span>
            <Lock size={12} color="#7FE87F" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.9 }}>
            <span style={{ fontSize: '9.5px', color: '#6E6E85', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Partner:
            </span>
            <PaymentPartnerLogo height={16} themeMode="dark" />
          </div>
        </div>
      </div>
    </div>
  );
};
