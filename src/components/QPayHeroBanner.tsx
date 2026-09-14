import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../state/AppContext';

export const QPayHeroBanner: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div
      onClick={() => navigateTo('PAY_ANYONE')}
      role="banner"
      aria-label="Send money instantly with zero fees"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigateTo('PAY_ANYONE');
        }
      }}
      className="interactive-tap"
      style={{
        margin: '14px 20px 0 20px',
        backgroundColor: '#2A2A3E',
        border: '1px solid #4D4D6B',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flex: 1, zIndex: 2, paddingRight: '12px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(127, 232, 127, 0.15)',
            border: '1px solid rgba(127, 232, 127, 0.3)',
            color: '#7FE87F',
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: '20px',
            marginBottom: '10px',
            letterSpacing: '0.03em',
          }}
        >
          <ShieldCheck size={13} color="#7FE87F" />
          <span>Zero Transfer Fees</span>
        </div>

        <h3
          style={{
            fontSize: '17px',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 4px 0',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
          }}
        >
          Instant UPI Transfers
        </h3>

        <p
          style={{
            fontSize: '12px',
            color: '#B3B3C2',
            margin: '0 0 14px 0',
            lineHeight: 1.4,
          }}
        >
          Send money directly to any bank account or UPI ID.
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigateTo('PAY_ANYONE');
          }}
          style={{
            backgroundColor: '#7FE87F',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '12.5px',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(127, 232, 127, 0.25)',
          }}
        >
          <span>Send Money</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          backgroundColor: '#3A3A52',
          border: '1px solid #4D4D6B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#7FE87F',
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '32px', fontWeight: 900, color: '#7FE87F' }}>₹</span>
      </div>
    </div>
  );
};

export default QPayHeroBanner;
