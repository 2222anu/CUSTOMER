import React from 'react';
import { CheckCircle2, QrCode, ArrowUpRight } from 'lucide-react';

export const PayScene: React.FC = () => {
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
      {/* Main Payment Card Preview */}
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
        {/* Merchant Icon */}
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
          <ArrowUpRight size={24} />
        </div>

        <div style={{ fontSize: '12px', color: '#A2A2BA', fontWeight: 600 }}>Payment to</div>
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>Blue Tokai Coffee</div>
        <div style={{ fontSize: '26px', fontWeight: 900, color: '#7FE87F', margin: '8px 0' }}>₹340.00</div>

        {/* Status Pill */}
        <div
          style={{
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
          <span>Instant UPI Settlement</span>
        </div>
      </div>

      {/* Mini QR Scan Strip */}
      <div
        style={{
          backgroundColor: '#1E1E32',
          border: '1px solid #2C2C44',
          borderRadius: '12px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <QrCode size={18} color="#7FE87F" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>Scan Any UPI QR</span>
        </div>
        <span style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 700 }}>Zero Fee</span>
      </div>
    </div>
  );
};
