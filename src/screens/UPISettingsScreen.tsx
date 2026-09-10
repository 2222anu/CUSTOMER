import React, { useState } from 'react';
import { Copy, ShieldCheck, Key, QrCode } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { useApp } from '../state/AppContext';

export const UPISettingsScreen: React.FC = () => {
  const { user, navigateTo } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fade-in">
      <AppHeader title="UPI Settings" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Active UPI ID Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(7, 25, 19, 0.04)',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Primary UPI ID
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#071913' }}>
              {user.upiId}
            </span>
            <button
              onClick={handleCopy}
              style={{
                backgroundColor: 'rgba(158, 240, 26, 0.2)',
                border: 'none',
                color: '#071913',
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Config Menu Items */}
        <ListRow
          icon={<QrCode size={18} />}
          label="My QR Code"
          subLabel="View and download personal payment QR"
          onClick={() => navigateTo('RECEIVE')}
        />
        <ListRow
          icon={<Key size={18} />}
          label="Change UPI PIN"
          subLabel="Reset or change your 4-digit UPI PIN"
          onClick={() => alert('PIN Reset requested')}
        />
        <ListRow
          icon={<ShieldCheck size={18} />}
          label="UPI Payment Limit"
          subLabel="₹1,00,000 / day default limit"
        />
      </div>
    </div>
  );
};
