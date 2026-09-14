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
      {/* Floating Security Padlock (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          backgroundColor: '#2A2A3E',
          border: '1px solid #4D4D6B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#7FE87F',
          zIndex: 4,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
          animation: 'floatLock 3.8s ease-in-out infinite alternate',
        }}
      >
        <Lock size={24} />
      </div>

      {/* Floating PIN Keypad Pill (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '18px',
          backgroundColor: '#2A2A3E',
          border: '1px solid #4D4D6B',
          borderRadius: '12px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 4,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
          animation: 'floatPin 4.2s ease-in-out infinite alternate',
        }}
      >
        <KeyRound size={15} color="#7FE87F" />
        <div style={{ display: 'flex', gap: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7FE87F' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7FE87F' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7FE87F' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7FE87F' }} />
        </div>
      </div>

      {/* Main Protection Card (Centerpiece) */}
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '240px',
          zIndex: 3,
          backgroundColor: '#2A2A3E',
          border: '1.5px solid #4D4D6B',
          borderRadius: '24px',
          padding: '16px 14px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          animation: 'floatShield 4.5s ease-in-out infinite alternate',
        }}
      >
        {/* Top Trust Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#7FE87F', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <ShieldCheck size={14} color="#7FE87F" />
          <span>256-Bit Encrypted</span>
        </div>

        {/* Center Biometric Fingerprint Visualizer */}
        <div style={{ position: 'relative', margin: '6px 0' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(127, 232, 127, 0.12)',
              border: '1.5px solid #7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7FE87F',
            }}
          >
            <Fingerprint size={36} />
          </div>
        </div>

        {/* Device & Transaction Verified Pill */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#7FE87F', fontSize: '12px', fontWeight: 900 }}>
            <CheckCircle2 size={13} color="#7FE87F" />
            <span>Biometric Protected</span>
          </div>
          <div style={{ fontSize: '9.5px', color: '#B3B3C2' }}>
            24/7 Real-Time Fraud Defense
          </div>
        </div>
      </div>

      {/* Floating Bottom Verified Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          backgroundColor: '#3A3A52',
          borderRadius: '16px',
          border: '1px solid #4D4D6B',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 4,
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <ShieldCheck size={14} color="#7FE87F" />
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF' }}>
          NPCI & RBI Certified Security
        </span>
      </div>

      <style>{`
        @keyframes floatShield {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-7px); }
        }
        @keyframes floatLock {
          0% { transform: translateY(0px) rotate(-4deg); }
          100% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes floatPin {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};
