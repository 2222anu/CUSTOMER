import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { QRCodeView } from '../components/QRCodeView';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { useApp } from '../state/AppContext';
import { qrService } from '../services/qrService';
import { designSystem } from '../design-system';

export const ReceiveScreen: React.FC = () => {
  const { user, navigateTo } = useApp();
  const upiQrString = qrService.getUpiQrString(user.upiId, user.name);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'QTPay UPI ID',
          text: `Pay ${user.name} via QTPay: ${user.upiId}`,
        })
        .catch(() => {});
    } else {
      alert(`UPI Details copied: ${user.upiId}`);
    }
  };

  return (
    <div className="fade-in" style={{ fontFamily: designSystem.typography.fontFamily }}>
      <AppHeader title="Receive Money" showBack />

      <div style={{ padding: '24px 20px', textAlign: 'center' }}>
        {/* User Card */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: designSystem.radii.full,
              backgroundColor: designSystem.colors.primary,
              color: designSystem.colors.textOnPrimary,
              fontWeight: designSystem.typography.weights.extrabold,
              fontSize: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px auto',
              boxShadow: designSystem.shadows.none,
            }}
          >
            {user.avatarInitials}
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: designSystem.colors.textPrimary }}>
            {user.name}
          </h2>
          <div
            style={{
              fontSize: '13px',
              color: designSystem.colors.primaryDark,
              fontWeight: '700',
              marginTop: '2px',
            }}
          >
            {user.upiId}
          </div>
        </div>

        {/* Real Machine Readable QR Code View */}
        <div style={{ margin: '20px 0 24px 0' }}>
          <QRCodeView value={upiQrString} size={190} />
          <p
            style={{
              fontSize: '13px',
              color: designSystem.colors.textSecondary,
              marginTop: '16px',
              fontWeight: '600',
            }}
          >
            Scan QR code with any UPI app to pay
          </p>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
          <PrimaryButton onClick={() => navigateTo('REQUEST_MONEY')}>
            <Download size={18} /> Request Money
          </PrimaryButton>
          <SecondaryButton onClick={handleShare}>
            <Share2 size={18} /> Share QR / UPI ID
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};
