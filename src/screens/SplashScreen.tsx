import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { useApp } from '../state/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing secure channel...');

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
          setStatusText('Verifying cryptographic tokens...');
        } else if (next > 40) {
          setStatusText('Connecting to Global Payment Rails...');
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
      className="fade-in"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 36%, #2A2A3E 0%, #1A1A2E 60%, #0E0E1A 100%)',
        color: '#ffffff',
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
      {/* Background Cinematic Lighting & Ambient Aura */}
      <div
        style={{
          position: 'absolute',
          top: '36%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(127, 232, 127, 0.25) 0%, rgba(159, 238, 159, 0.08) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Kinetic Ultrasonic Energy Rings */}
      <div
        style={{
          position: 'absolute',
          top: '36%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          border: '1px solid rgba(127, 232, 127, 0.15)',
          animation: 'ringPulse 3s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Top Security Tier Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(127, 232, 127, 0.25)',
          borderRadius: '9999px',
          padding: '6px 14px',
          fontSize: '11.5px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: '#7FE87F',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 3,
        }}
      >
        <ShieldCheck size={14} color="#7FE87F" />
        <span>256-Bit Financial Encryption</span>
      </div>

      {/* Center Cinematic Hero Logo & Pulse */}
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
            width: '116px',
            height: '116px',
            borderRadius: '30px',
            background: 'linear-gradient(145deg, #2A2A3E 0%, #1A1A2E 100%)',
            border: '2px solid rgba(127, 232, 127, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(127, 232, 127, 0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Logo */}
          <div
            style={{
              filter: 'drop-shadow(0 0 16px rgba(127, 232, 127, 0.8))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlphPayLogo variant="icon" size={68} themeMode="dark" />
          </div>
        </div>

        {/* Oversized Brand Typography */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
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
            color: '#B3B3C2',
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

      {/* Bottom Ultra-Modern Loader Dock */}
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
              height: '5px',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #5FBF5F 0%, #7FE87F 70%, #9FEE9F 100%)',
                borderRadius: '9999px',
                transition: 'width 0.08s linear',
                boxShadow: '0 0 14px rgba(127, 232, 127, 0.6)',
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
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 600,
            }}
          >
            <span>{statusText}</span>
            <span style={{ fontWeight: 800, color: '#7FE87F' }}>{progress}%</span>
          </div>
        </div>

        {/* NPCI / 256-Bit SSL Trust Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#2A2A3E',
            border: '1px solid rgba(127, 232, 127, 0.25)',
            backdropFilter: 'blur(12px)',
            borderRadius: '14px',
            padding: '8px 14px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <ShieldCheck size={15} color="#7FE87F" />
          <span style={{ fontSize: '10.5px', color: '#e2e8f0', fontWeight: 700, letterSpacing: '0.04em' }}>
            NPCI • BHIM UPI • 256-BIT SECURED
          </span>
          <Lock size={12} color="#94a3b8" />
        </div>
      </div>

      {/* Cinematic CSS Animations */}
      <style>{`
        @keyframes heroTileEntrance {
          0% { transform: scale(0.65) translateY(20px); opacity: 0; }
          60% { transform: scale(1.05) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes titleEntrance {
          0% { transform: translateY(12px); opacity: 0; letter-spacing: 0.24em; }
          100% { transform: translateY(0); opacity: 1; letter-spacing: 0.14em; }
        }
        @keyframes shineSweep {
          0% { transform: translate(-100%, -100%) rotate(45deg); }
          40%, 100% { transform: translate(100%, 100%) rotate(45deg); }
        }
        @keyframes sonicRipple {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.35); opacity: 0; }
        }
        @keyframes rotateOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes fadeSlideDown {
          0% { transform: translateY(-16px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
