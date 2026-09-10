import React from 'react';
import { Lock, Eye, ShieldCheck, Database } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';

export const PrivacyScreen: React.FC = () => {
  return (
    <div className="fade-in">
      <AppHeader title="Privacy Policy" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Lock size={22} color="var(--neon-primary)" />
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Your Privacy is Protected</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            QTPay employs banking-grade end-to-end 256-bit AES encryption for all transactions and identity details.
          </p>
        </div>

        <ListRow icon={<Eye size={18} />} label="Data Sharing Preferences" subLabel="Manage how transaction data is shared" onClick={() => alert('Preferences saved')} />
        <ListRow icon={<Database size={18} />} label="Download Account Data" subLabel="Export statements and history" onClick={() => alert('Statement export started')} />
        <ListRow icon={<ShieldCheck size={18} />} label="Terms of Service & Privacy Statement" onClick={() => alert('Viewing Privacy Statement')} />
      </div>
    </div>
  );
};
