import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
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
          setStatusText('Connecting to NPCI UPI network...');
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
        background: 'radial-gradient(circle at 50% 36%, #1d4ed8 0%, #0e274d 45%, #071529 100%)',
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
          background: 'radial-gradient(circle, rgba(46, 131, 255, 0.28) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Kinetic Ultrasonic Energy Rings (Pulsing outward from center) */}
      <div
        style={{
          position: 'absolute',
          top: '36%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          border: '1.5px solid rgba(56, 189, 248, 0.2)',
          pointerEvents: 'none',
          animation: 'sonicRipple 3.5s ease-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '36%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          border: '1px dashed rgba(46, 131, 255, 0.35)',
          pointerEvents: 'none',
          animation: 'rotateOrbit 12s linear infinite',
        }}
      />

      {/* Top Floating Security Pill */}
      <div
        style={{
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '6px 16px',
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          animation: 'fadeSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <Sparkles size={13} color="#38bdf8" />
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff' }}>
          NEXT-GEN UPI PAYMENTS
        </span>
      </div>

      {/* Hero Centerpiece: 3D Holographic Glass Emblem & Specular Shine */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 3,
          marginTop: '-16px',
        }}
      >
        {/* Holographic 3D Floating Glass Tile */}
        <div
          style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            borderRadius: '34px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.45)',
            marginBottom: '20px',
            boxShadow: '0 24px 60px rgba(7, 21, 41, 0.6), 0 0 35px rgba(46, 131, 255, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            animation: 'heroTileEntrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Specular Diagonal Light Sweep */}
          <div
            style={{
              position: 'absolute',
              inset: '-100%',
              background: 'linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.65) 50%, transparent 65%)',
              animation: 'shineSweep 2.8s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Glowing QPay Emblem */}
          <div
            style={{
              filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.8))',
              transform: 'scale(1.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <QtPayLogo variant="icon" size={68} themeMode="dark" />
          </div>
        </div>

        {/* Oversized Brand Typography */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 900,
            letterSpacing: '0.14em',
            color: '#ffffff',
            lineHeight: 1,
            margin: '0 0 8px 0',
            textShadow: '0 4px 20px rgba(46, 131, 255, 0.5)',
            animation: 'titleEntrance 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          QPAY
        </div>

        {/* Minimalist Sub-Tag */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#93c5fd',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Fast</span>
          <span style={{ color: '#38bdf8' }}>•</span>
          <span>Unified</span>
          <span style={{ color: '#38bdf8' }}>•</span>
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
                background: 'linear-gradient(90deg, #2e83ff 0%, #38bdf8 70%, #ffffff 100%)',
                borderRadius: '9999px',
                transition: 'width 0.08s linear',
                boxShadow: '0 0 14px #38bdf8',
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
            <span style={{ fontWeight: 800, color: '#38bdf8' }}>{progress}%</span>
          </div>
        </div>

        {/* NPCI / 256-Bit SSL Trust Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: 'rgba(7, 21, 41, 0.72)',
            border: '1px solid rgba(56, 189, 248, 0.22)',
            backdropFilter: 'blur(12px)',
            borderRadius: '14px',
            padding: '8px 14px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <ShieldCheck size={15} color="#38bdf8" />
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
