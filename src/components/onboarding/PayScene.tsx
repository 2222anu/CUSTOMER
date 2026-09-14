import React from 'react';
import { CheckCircle2, QrCode, Wifi, ArrowUpRight } from 'lucide-react';
import { AlphPayLogo } from '../AlphPayLogo';

export const PayScene: React.FC = () => {
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
      {/* Floating QR Tile */}
      <div
        style={{
          position: 'absolute',
          top: '22px',
          left: '16px',
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          backgroundColor: '#2A2A3E',
          border: '1px solid #4D4D6B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#7FE87F',
          zIndex: 4,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          animation: 'floatLeft 4s ease-in-out infinite alternate',
        }}
      >
        <QrCode size={26} />
      </div>

      {/* Floating Currency Badge 1 */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#3A3A52',
          border: '1px solid #7FE87F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: '17px',
          color: '#7FE87F',
          zIndex: 4,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          animation: 'floatCoin 4.5s ease-in-out infinite alternate',
        }}
      >
        ₹
      </div>

      {/* Main Smartphone Device Body */}
      <div
        style={{
          position: 'relative',
          width: '184px',
          height: '256px',
          borderRadius: '28px',
          backgroundColor: '#1A1A2E',
          border: '2px solid #4D4D6B',
          padding: '8px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Device Top Speaker Notch */}
        <div style={{ width: '40px', height: '4px', backgroundColor: '#3A3A52', borderRadius: '4px', margin: '2px auto 8px auto' }} />

        {/* Screen Canvas */}
        <div
          style={{
            flex: 1,
            borderRadius: '20px',
            backgroundColor: '#2A2A3E',
            border: '1px solid #3A3A52',
            padding: '14px 12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <div style={{ opacity: 0.9 }}>
            <AlphPayLogo variant="horizontal" size={20} />
          </div>

          {/* Payment Success Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                border: '1.5px solid #7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7FE87F',
              }}
            >
              <CheckCircle2 size={24} />
            </div>

            <div style={{ fontSize: '10px', fontWeight: 800, color: '#7FE87F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Payment Sent
            </div>

            <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.02em' }}>
              ₹2,500.00
            </div>
          </div>

          {/* Payee Info */}
          <div style={{ fontSize: '9.5px', color: '#B3B3C2', fontWeight: 600 }}>
            Priya Menon &bull; Instant UPI
          </div>
        </div>
      </div>

      {/* Floating Card (Foreground) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '20px',
          width: '160px',
          height: '96px',
          borderRadius: '14px',
          backgroundColor: '#3A3A52',
          border: '1px solid #4D4D6B',
          padding: '12px 14px',
          boxSizing: 'border-box',
          color: '#FFFFFF',
          zIndex: 5,
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
          transform: 'rotate(-4deg)',
          animation: 'floatCard 4s ease-in-out infinite alternate',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Card Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              width: '22px',
              height: '16px',
              borderRadius: '3px',
              backgroundColor: '#7FE87F',
            }}
          />
          <Wifi size={14} color="#7FE87F" />
        </div>

        {/* Card Number */}
        <div style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: '#FFFFFF' }}>
          •••• &nbsp;•••• &nbsp;3616
        </div>

        {/* Card Brand */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.08em', color: '#7FE87F' }}>ALPH PAY</span>
          <ArrowUpRight size={12} color="#FFFFFF" />
        </div>
      </div>

      <style>{`
        @keyframes floatCard {
          0% { transform: rotate(-4deg) translateY(0px); }
          100% { transform: rotate(-2deg) translateY(-6px); }
        }
        @keyframes floatLeft {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        @keyframes floatCoin {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};
