import React from 'react';
import { X, Flashlight, Image as ImageIcon, Scan } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { PrimaryButton } from '../components/PrimaryButton';

export const ScanScreen: React.FC = () => {
  const { isScanModalOpen, setIsScanModalOpen, contacts, navigateTo } = useApp();

  if (!isScanModalOpen) return null;

  const handleSimulateScan = () => {
    setIsScanModalOpen(false);
    // Pick first contact for mock payment flow
    navigateTo('SEND_AMOUNT', { contact: contacts[0] });
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px',
      }}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <button
          onClick={() => setIsScanModalOpen(false)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={22} />
        </button>

        <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700' }}>Scan QR Code</h3>

        <button
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Flashlight size={20} />
        </button>
      </div>

      {/* Viewfinder View */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '260px',
            height: '260px',
            borderRadius: '24px',
            border: '2px solid rgba(158, 240, 26, 0.4)',
            position: 'relative',
            boxShadow: '0 0 0 4000px rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Neon Corner Guides */}
          <div style={{ position: 'absolute', top: 12, left: 12, width: 28, height: 28, borderTop: '4px solid var(--neon-primary)', borderLeft: '4px solid var(--neon-primary)', borderTopLeftRadius: 8 }} />
          <div style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderTop: '4px solid var(--neon-primary)', borderRight: '4px solid var(--neon-primary)', borderTopRightRadius: 8 }} />
          <div style={{ position: 'absolute', bottom: 12, left: 12, width: 28, height: 28, borderBottom: '4px solid var(--neon-primary)', borderLeft: '4px solid var(--neon-primary)', borderBottomLeftRadius: 8 }} />
          <div style={{ position: 'absolute', bottom: 12, right: 12, width: 28, height: 28, borderBottom: '4px solid var(--neon-primary)', borderRight: '4px solid var(--neon-primary)', borderBottomRightRadius: 8 }} />

          {/* Animated Laser Bar */}
          <div
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'var(--neon-primary)',
              boxShadow: '0 0 15px var(--neon-glow), 0 0 8px var(--neon-primary)',
              position: 'absolute',
              top: '50%',
            }}
          />
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '24px', fontWeight: '600' }}>
          Align QR code within the frame to pay
        </p>
      </div>

      {/* Bottom Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '16px',
            padding: '14px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <ImageIcon size={18} /> Upload from Gallery
        </button>

        <PrimaryButton onClick={handleSimulateScan}>
          <Scan size={20} /> Simulate Scan Demo Pay
        </PrimaryButton>
      </div>
    </div>
  );
};
