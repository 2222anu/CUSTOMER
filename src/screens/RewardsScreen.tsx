import React from 'react';
import { Gift, Trophy, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';

export const RewardsScreen: React.FC = () => {
  return (
    <div className="fade-in">
      <AppHeader title="Rewards & Scratch Cards" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Points Banner */}
        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--neon-primary)',
            borderRadius: '24px',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 25px rgba(158, 240, 26, 0.15)',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--neon-primary)',
              color: 'var(--text-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: '0 0 20px var(--neon-glow)',
            }}
          >
            <Trophy size={30} />
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--neon-primary)' }}>1,450 QTPoints</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Earn 10 QTPoints on every ₹100 spent via QTPay UPI
          </p>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Unlocked Scratch Cards
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          <div
            onClick={() => alert('Scratch Card Unlocked: You won ₹150 Cashback!')}
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px dashed var(--neon-primary)',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <Sparkles size={32} color="var(--neon-primary)" style={{ margin: '0 auto 8px auto' }} />
            <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>Tap to Scratch</div>
            <div style={{ fontSize: '11px', color: 'var(--neon-primary)', marginTop: '4px' }}>Win up to ₹500</div>
          </div>

          <div
            onClick={() => alert('Scratch Card Unlocked: Flat 20% off on Food Orders!')}
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px dashed var(--neon-primary)',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <Gift size={32} color="var(--neon-primary)" style={{ margin: '0 auto 8px auto' }} />
            <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>Tap to Scratch</div>
            <div style={{ fontSize: '11px', color: 'var(--neon-primary)', marginTop: '4px' }}>Food Voucher</div>
          </div>
        </div>
      </div>
    </div>
  );
};
