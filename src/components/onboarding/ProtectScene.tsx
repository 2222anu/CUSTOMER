import React from 'react';
import { ShieldCheck, Lock, Fingerprint, CheckCircle2 } from 'lucide-react';

export const ProtectScene: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Primary Security Card */}
      <div
        style={{
          backgroundColor: '#151524',
          border: '1px solid #2C2C44',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'none',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(127, 232, 127, 0.12)',
            color: '#7FE87F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}
        >
          <ShieldCheck size={26} />
        </div>

        <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Bank-Grade Security</div>
        <div style={{ fontSize: '12px', color: '#A2A2BA', marginTop: '4px' }}>256-Bit Hardware Encrypted</div>

        {/* Verification Pill */}
        <div
          style={{
            marginTop: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(127, 232, 127, 0.12)',
            color: '#7FE87F',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
          }}
        >
          <CheckCircle2 size={13} />
          <span>NPCI & RBI Certified</span>
        </div>
      </div>

      {/* Security Features Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div
          style={{
            backgroundColor: '#1E1E32',
            border: '1px solid #2C2C44',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'none',
          }}
        >
          <Fingerprint size={18} color="#7FE87F" />
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF' }}>Biometric Lock</div>
        </div>

        <div
          style={{
            backgroundColor: '#1E1E32',
            border: '1px solid #2C2C44',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'none',
          }}
        >
          <Lock size={18} color="#7FE87F" />
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF' }}>UPI PIN Safe</div>
        </div>
      </div>
    </div>
  );
};
