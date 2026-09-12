import React, { useState } from 'react';
import { Download, Share2, Copy, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { QRCodeView } from '../components/QRCodeView';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { useApp } from '../state/AppContext';
import { qrService } from '../services/qrService';

export const ReceiveScreen: React.FC = () => {
  const { user, navigateTo } = useApp();
  const [copied, setCopied] = useState(false);
  const upiQrString = qrService.getUpiQrString(user.upiId, user.name);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'QTPay UPI ID',
          text: `Pay ${user.name} via QTPay: ${user.upiId}`,
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Receive Money" showBack />

      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* White QR Showcase Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            padding: '28px 20px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* User Avatar */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: user.avatarBgColor || '#2e83ff',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              border: '3px solid #eef5ff',
              overflow: 'hidden',
            }}
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user.avatarInitials
            )}
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            {user.name}
          </h2>

          {/* Copyable UPI ID pill */}
          <button
            onClick={handleCopy}
            className="interactive-tap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#eef5ff',
              border: '1px solid #d6e6ff',
              borderRadius: '20px',
              padding: '6px 14px',
              marginTop: '8px',
              marginBottom: '20px',
              color: '#2e83ff',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <span>{user.upiId}</span>
            {copied ? <CheckCircle2 size={14} color="#10b981" /> : <Copy size={13} />}
          </button>

          {/* Machine-Readable QR Code */}
          <div style={{ padding: '8px', backgroundColor: '#ffffff', borderRadius: '16px' }}>
            <QRCodeView value={upiQrString} size={200} />
          </div>

          <div
            style={{
              fontSize: '11px',
              color: '#2e83ff',
              marginTop: '16px',
              fontWeight: 800,
              backgroundColor: '#eef5ff',
              padding: '4px 12px',
              borderRadius: '12px',
              border: '1px solid #d6e6ff',
            }}
          >
            Accepts Any UPI App
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <PrimaryButton onClick={() => navigateTo('REQUEST_MONEY')}>
            <Download size={18} /> Request Money from Contact
          </PrimaryButton>
          <SecondaryButton onClick={handleShare}>
            <Share2 size={18} /> Share QR / UPI Details
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};
