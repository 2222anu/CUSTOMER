import React, { useState } from 'react';
import { Copy, ShieldCheck, Key, QrCode, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { Modal } from '../components/Modal';
import { useApp } from '../state/AppContext';

export const UPISettingsScreen: React.FC = () => {
  const { user, navigateTo } = useApp();
  const [copied, setCopied] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');

    if (oldPin.length !== 4) {
      setPinError('Old UPI PIN must be 4 digits');
      return;
    }
    if (newPin.length !== 4) {
      setPinError('New UPI PIN must be 4 digits');
      return;
    }
    if (newPin !== confirmPin) {
      setPinError('New PIN and Confirm PIN do not match');
      return;
    }

    setPinSuccess(true);
    setTimeout(() => {
      setPinSuccess(false);
      setIsPinModalOpen(false);
      setOldPin('');
      setNewPin('');
      setConfirmPin('');
    }, 1200);
  };

  return (
    <div className="fade-in">
      <AppHeader title="UPI Settings" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Active UPI ID Banner */}
        <div
          style={{
            backgroundColor: '#111144',
            border: '1.5px solid #F98513',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            color: '#FFFFFF',
            boxShadow: '0 8px 25px rgba(17, 17, 68, 0.3)',
          }}
        >
          <div style={{ fontSize: '11px', color: '#A4BCEE', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Primary UPI ID
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
              {user.upiId}
            </span>
            <button
              onClick={handleCopy}
              style={{
                backgroundColor: '#F98513',
                border: 'none',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: '12px',
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
          icon={<QrCode size={18} color="#F98513" />}
          label="My QR Code"
          subLabel="View and share personal payment QR code"
          onClick={() => navigateTo('RECEIVE')}
        />
        <ListRow
          icon={<Key size={18} color="#F98513" />}
          label="Change UPI PIN"
          subLabel="Reset or change your 4-digit UPI PIN"
          onClick={() => setIsPinModalOpen(true)}
        />
        <ListRow
          icon={<ShieldCheck size={18} color="#F98513" />}
          label="UPI Payment Limit"
          subLabel="₹1,00,000 / day standard bank limit"
          rightElement={<span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>Active</span>}
        />
      </div>

      {/* Change PIN Modal */}
      <Modal isOpen={isPinModalOpen} onClose={() => setIsPinModalOpen(false)} title="Change UPI PIN">
        {pinSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="#F98513" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111144' }}>UPI PIN Changed Successfully!</h4>
          </div>
        ) : (
          <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {pinError && (
              <div style={{ padding: '8px 12px', borderRadius: '10px', backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: '12px', fontWeight: '600' }}>
                {pinError}
              </div>
            )}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '4px' }}>
                Current 4-Digit UPI PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={oldPin}
                onChange={(e) => setOldPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #DAD1C8', fontSize: '18px', textAlign: 'center', letterSpacing: '8px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '4px' }}>
                New 4-Digit UPI PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #DAD1C8', fontSize: '18px', textAlign: 'center', letterSpacing: '8px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '4px' }}>
                Confirm New UPI PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #DAD1C8', fontSize: '18px', textAlign: 'center', letterSpacing: '8px' }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: '#F98513',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(249, 133, 19, 0.35)',
              }}
            >
              Update UPI PIN
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

