import React from 'react';
import { Landmark, ArrowRightLeft, Zap, Wifi, Wallet } from 'lucide-react';

export const ManageScene: React.FC = () => {
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
      {/* Top Stacked Bank Cards (Fanning out) */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          width: '260px',
          height: '140px',
          zIndex: 3,
        }}
      >
        {/* Card 3: Deep Navy Peeking in Background */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '30px',
            right: '30px',
            height: '75px',
            borderRadius: '14px',
            backgroundColor: '#1A1A2E',
            border: '1px solid #4D4D6B',
            padding: '8px 14px',
            color: '#808099',
            fontSize: '10px',
            fontWeight: 800,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            transform: 'scale(0.92)',
            opacity: 0.75,
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <span>SBI GLOBAL &bull; •••• 5590</span>
          <span style={{ color: '#FFFFFF' }}>₹12,450</span>
        </div>

        {/* Card 2: Elevated Card Layered */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '15px',
            right: '15px',
            height: '80px',
            borderRadius: '16px',
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            padding: '10px 16px',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            transform: 'scale(0.96)',
            zIndex: 2,
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.4)',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800 }}>ICICI SAPPHIRE &bull; •••• 3616</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#7FE87F' }}>₹18,450</span>
        </div>

        {/* Card 1: Primary Bank Card (Foreground) */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '0',
            right: '0',
            height: '92px',
            borderRadius: '16px',
            backgroundColor: '#3A3A52',
            border: '1px solid #7FE87F',
            padding: '12px 18px',
            color: '#FFFFFF',
            zIndex: 3,
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            animation: 'floatTopCard 4s ease-in-out infinite alternate',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Landmark size={14} color="#7FE87F" />
              <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.04em' }}>HDFC PLATINUM</span>
            </div>
            <Wifi size={13} color="#7FE87F" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '9px', color: '#B3B3C2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Primary Account
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: '#FFFFFF' }}>
                •••• 8821
              </div>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#7FE87F' }}>
              ₹45,280.00
            </div>
          </div>
        </div>
      </div>

      {/* Central Unified Wallet Card */}
      <div
        style={{
          position: 'absolute',
          bottom: '22px',
          width: '240px',
          borderRadius: '16px',
          backgroundColor: '#2A2A3E',
          border: '1px solid #4D4D6B',
          padding: '14px 18px',
          zIndex: 4,
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
          animation: 'pulseHub 3.5s ease-in-out infinite',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: 'rgba(127, 232, 127, 0.15)',
              color: '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Wallet size={16} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Unified Portfolio
          </span>
        </div>

        <div style={{ fontSize: '9.5px', color: '#B3B3C2', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Total Financial Balance
        </div>
        <div className="tabular-nums" style={{ fontSize: '24px', fontWeight: 900, color: '#7FE87F', margin: '2px 0 6px 0', letterSpacing: '0.01em' }}>
          ₹ 63,730.00
        </div>

        {/* Floating Streams Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
          <span style={{ fontSize: '9px', fontWeight: 800, backgroundColor: '#3A3A52', color: '#7FE87F', padding: '3px 8px', borderRadius: '6px', border: '1px solid #4D4D6B' }}>
            3 Accounts Linked
          </span>
          <span style={{ fontSize: '9px', fontWeight: 800, backgroundColor: 'rgba(127, 232, 127, 0.15)', color: '#7FE87F', padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(127, 232, 127, 0.3)' }}>
            Auto-Sync
          </span>
        </div>
      </div>

      {/* Floating Action Capsules */}
      <div
        style={{
          position: 'absolute',
          top: '150px',
          left: '10px',
          backgroundColor: '#3A3A52',
          border: '1px solid #4D4D6B',
          borderRadius: '12px',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#7FE87F',
          fontSize: '10px',
          fontWeight: 800,
          zIndex: 5,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          animation: 'floatCapsuleLeft 3.5s ease-in-out infinite alternate',
        }}
      >
        <ArrowRightLeft size={12} />
        <span style={{ color: '#FFFFFF' }}>Send &bull; Request</span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '145px',
          right: '10px',
          backgroundColor: '#3A3A52',
          border: '1px solid #4D4D6B',
          borderRadius: '12px',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#7FE87F',
          fontSize: '10px',
          fontWeight: 800,
          zIndex: 5,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          animation: 'floatCapsuleRight 3.8s ease-in-out infinite alternate',
        }}
      >
        <Zap size={12} />
        <span style={{ color: '#FFFFFF' }}>Bills &bull; Recharge</span>
      </div>

      <style>{`
        @keyframes floatTopCard {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        @keyframes pulseHub {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes floatCapsuleLeft {
          0% { transform: translateY(0px) rotate(-2deg); }
          100% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes floatCapsuleRight {
          0% { transform: translateY(0px) rotate(2deg); }
          100% { transform: translateY(-7px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};
