import React from 'react';
import { ShieldCheck, Fingerprint, Lock, CheckCircle2, KeyRound } from 'lucide-react';

export const ProtectScene: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        overflow: 'visible',
      }}
    >
      {/* Concentric Pulsing Protection Rings (Glowing Halo around Phone & Shield) */}
      <div
        style={{
          position: 'absolute',
          width: '270px',
          height: '270px',
          borderRadius: '50%',
          border: '1.5px solid rgba(46, 131, 255, 0.22)',
          boxShadow: '0 0 50px rgba(46, 131, 255, 0.15)',
          animation: 'ringPulse 4s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '210px',
          height: '210px',
          borderRadius: '50%',
          border: '1px dashed rgba(56, 189, 248, 0.35)',
          animation: 'rotateRing 16s linear infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Floating 3D Security Padlock (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(46, 131, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2e83ff',
          zIndex: 4,
          boxShadow: '0 10px 25px rgba(46, 131, 255, 0.18)',
          animation: 'floatLock 3.8s ease-in-out infinite alternate',
        }}
      >
        <Lock size={24} />
      </div>

      {/* Floating 3D PIN Keypad Pill (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '18px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid #d6e6ff',
          borderRadius: '14px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 4,
          boxShadow: '0 10px 25px rgba(46, 131, 255, 0.16)',
          animation: 'floatPin 4.2s ease-in-out infinite alternate',
        }}
      >
        <KeyRound size={15} color="#2e83ff" />
        <div style={{ display: 'flex', gap: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2e83ff' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2e83ff' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2e83ff' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2e83ff' }} />
        </div>
      </div>

      {/* Main 3D Protection Shield (Centerpiece) */}
      <div
        style={{
          position: 'relative',
          width: '210px',
          height: '250px',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'floatShield 4.5s ease-in-out infinite alternate',
        }}
      >
        {/* Outer Shield Shell */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(238, 245, 255, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(46, 131, 255, 0.45)',
            borderRadius: '40px 40px 105px 105px',
            boxShadow: '0 24px 60px rgba(14, 39, 77, 0.22), 0 0 40px rgba(46, 131, 255, 0.25)',
          }}
        />

        {/* Inner Shield Core Frame */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '180px',
            height: '216px',
            background: 'linear-gradient(180deg, #0e274d 0%, #0a192f 100%)',
            borderRadius: '32px 32px 88px 88px',
            border: '1.5px solid rgba(56, 189, 248, 0.4)',
            padding: '16px 12px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Specular Light Reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Shield Top Trust Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#93c5fd', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <ShieldCheck size={14} color="#38bdf8" />
            <span>256-Bit Secured</span>
          </div>

          {/* Center Biometric Fingerprint Visualizer */}
          <div style={{ position: 'relative', margin: '6px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(46, 131, 255, 0.2)',
                border: '2px solid #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                boxShadow: '0 0 25px rgba(56, 189, 248, 0.5)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Fingerprint size={36} />

              {/* Animated Laser Scan Bar */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#38bdf8',
                  boxShadow: '0 0 8px #38bdf8',
                  animation: 'scanLaser 2.2s ease-in-out infinite alternate',
                }}
              />
            </div>
          </div>

          {/* Device & Transaction Verified Pill */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38bdf8', fontSize: '12px', fontWeight: 900 }}>
              <CheckCircle2 size={13} color="#38bdf8" />
              <span>Device Authenticated</span>
            </div>
            <div style={{ fontSize: '9px', color: '#94a3b8' }}>
              Intelligent Fraud Shield Active
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Verified Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1.5px solid #d6e6ff',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 4,
          boxShadow: '0 10px 24px rgba(46, 131, 255, 0.16)',
        }}
      >
        <ShieldCheck size={14} color="#2e83ff" />
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0e274d' }}>
          NPCI &bull; RBI Compliant Protection
        </span>
      </div>

      <style>{`
        @keyframes floatShield {
          0% { transform: translateY(0px) rotateY(0deg); }
          100% { transform: translateY(-7px) rotateY(3deg); }
        }
        @keyframes floatLock {
          0% { transform: translateY(0px) rotate(-4deg); }
          100% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes floatPin {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 0.35; }
        }
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scanLaser {
          0% { top: 10%; }
          100% { top: 90%; }
        }
      `}</style>
    </div>
  );
};
