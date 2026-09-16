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
        backgroundColor: 'var(--color-surface, #111726)',
        border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
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
            backgroundColor: 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))',
            color: 'var(--brand-green, #00D09C)',
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: '20px',
            marginBottom: '10px',
            letterSpacing: '0.03em',
          }}
        >
          <ShieldCheck size={13} color="var(--brand-green, #00D09C)" />
          <span>Zero Fees</span>
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
          Instant Sarie Transfers
        </h3>

        <p
          style={{
            fontSize: '12px',
            color: '#8E9BAE',
            margin: '0 0 14px 0',
            lineHeight: 1.4,
          }}
        >
          Direct Saudi bank-to-bank settlements.
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigateTo('PAY_ANYONE');
          }}
          style={{
            backgroundColor: 'var(--brand-green, #00D09C)',
            color: 'var(--brand-green-ink, #080C14)',
            border: 'none',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '12.5px',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <span>Send Money</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          backgroundColor: 'var(--color-surface-elevated, #182236)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--brand-green, #00D09C)',
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--brand-green, #00D09C)' }}>SAR</span>
      </div>
    </div>
  );
};

export default QPayHeroBanner;
