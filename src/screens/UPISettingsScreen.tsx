import React, { useState } from 'react';
import { Copy, ShieldCheck, Key, QrCode, Check } from 'lucide-react';
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
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '30px', color: '#FFFFFF' }}>
      <AppHeader title="UPI Settings" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Active UPI ID Banner */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1.5px solid rgba(127, 232, 127, 0.35)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            color: '#FFFFFF',
          }}
        >
          <div style={{ fontSize: '11px', color: '#7FE87F', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>
            Primary UPI ID
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.01em' }}>
              {user.upiId}
            </span>
            <button
              onClick={handleCopy}
              className="interactive-tap"
              style={{
                backgroundColor: '#7FE87F',
                border: 'none',
                color: '#000000',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Config Menu Items */}
        <div style={{ backgroundColor: '#2A2A3E', border: '1px solid #4D4D6B', borderRadius: '16px', overflow: 'hidden' }}>
          <ListRow
            icon={<QrCode size={18} color="#7FE87F" />}
            label="My QR Code"
            onClick={() => navigateTo('RECEIVE')}
          />
          <div style={{ height: '1px', backgroundColor: '#3A3A52', margin: '0 16px' }} />
          <ListRow
            icon={<Key size={18} color="#7FE87F" />}
            label="Change UPI PIN"
            onClick={() => setIsPinModalOpen(true)}
          />
          <div style={{ height: '1px', backgroundColor: '#3A3A52', margin: '0 16px' }} />
          <ListRow
            icon={<ShieldCheck size={18} color="#7FE87F" />}
            label="UPI Payment Limit"
            rightElement={<span style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 800, backgroundColor: '#3A3A52', border: '1px solid #4D4D6B', padding: '3px 8px', borderRadius: '6px' }}>₹1,00,000 / day</span>}
          />
        </div>
      </div>

      {/* Change PIN Modal */}
      <Modal isOpen={isPinModalOpen} onClose={() => setIsPinModalOpen(false)} title="Change UPI PIN">
        {pinSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <Check size={28} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>UPI PIN Changed Successfully!</h4>
          </div>
        ) : (
          <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {pinError && (
              <div style={{ padding: '8px 12px', borderRadius: '10px', backgroundColor: '#3A3A52', border: '1px solid #FF4757', color: '#FF4757', fontSize: '12px', fontWeight: 700 }}>
                {pinError}
              </div>
            )}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#B3B3C2', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                Current 4-Digit UPI PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={oldPin}
                onChange={(e) => setOldPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #4D4D6B', backgroundColor: '#1A1A2E', color: '#FFFFFF', fontSize: '18px', textAlign: 'center', letterSpacing: '8px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#B3B3C2', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                New 4-Digit UPI PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #4D4D6B', backgroundColor: '#1A1A2E', color: '#FFFFFF', fontSize: '18px', textAlign: 'center', letterSpacing: '8px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#B3B3C2', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                Confirm New UPI PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #4D4D6B', backgroundColor: '#1A1A2E', color: '#FFFFFF', fontSize: '18px', textAlign: 'center', letterSpacing: '8px', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              className="interactive-tap"
              style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#7FE87F',
                color: '#000000',
                border: 'none',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
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

