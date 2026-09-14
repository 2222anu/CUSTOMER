import React, { useState } from 'react';
import { Download, Share2, Copy, CheckCircle2, ArrowDownLeft, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { QRCodeView } from '../components/QRCodeView';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { useApp } from '../state/AppContext';
import { qrService } from '../services/qrService';
import { formatCurrency } from '../utils/formatters';

export const ReceiveScreen: React.FC = () => {
  const { user, navigateTo, receiveMoney, bankAccounts } = useApp();
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [receivedToast, setReceivedToast] = useState<{ show: boolean; amount: number; sender: string } | null>(null);

  const primaryBank = bankAccounts.find((b) => b.isPrimary) || bankAccounts[0];
  const numAmount = parseFloat(customAmount) || 0;
  const upiQrString = qrService.getUpiQrString(user.upiId, user.name, numAmount > 0 ? numAmount : undefined);

  const playSuccessChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.setValueAtTime(880, now + 0.1); // A5
        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.35);
      }
    } catch {
      // Audio not permitted without interaction
    }

    if (navigator.vibrate) {
      navigator.vibrate([60, 80, 60]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'alph pay UPI ID',
          text: `Pay ${user.name} via alph pay: ${user.upiId}${numAmount > 0 ? ` (Amount: ${formatCurrency(numAmount)})` : ''}`,
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handleSimulateReceive = async (presetAmt?: number) => {
    const amt = presetAmt || (numAmount > 0 ? numAmount : 500);
    const senders = ['Priya Menon', 'Rahul Sharma', 'Ajay Singh', 'Sara Al Mansoori'];
    const randomSender = senders[Math.floor(Math.random() * senders.length)];

    await receiveMoney({
      senderName: randomSender,
      senderUpi: `${randomSender.toLowerCase().replace(/\s+/g, '')}@upi`,
      amount: amt,
      note: 'Payment via alph pay QR',
    });

    playSuccessChime();
    setReceivedToast({ show: true, amount: amt, sender: randomSender });
    setTimeout(() => setReceivedToast(null), 3500);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Receive Money" showBack />

      {/* Floating Success Toast when Money is Received */}
      {receivedToast && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            width: '90%',
            maxWidth: '500px',
            backgroundColor: '#2A2A3E',
            border: '1.5px solid #7FE87F',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                color: '#7FE87F',
                border: '1px solid #7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowDownLeft size={20} color="#7FE87F" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#7FE87F' }}>
                +{formatCurrency(receivedToast.amount)} Received!
              </div>
              <div style={{ fontSize: '12px', color: '#B3B3C2' }}>
                Credited to {primaryBank ? primaryBank.bankName : 'Bank'} from {receivedToast.sender}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigateTo('HISTORY')}
            style={{
              backgroundColor: '#3A3A52',
              border: '1px solid #4D4D6B',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            View
          </button>
        </div>
      )}

      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* Dark QR Showcase Card */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            borderRadius: '24px',
            padding: '24px 20px',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'none',
          }}
        >
          {/* User Avatar */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#3A3A52',
              color: '#7FE87F',
              fontWeight: 800,
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
              border: '2px solid #7FE87F',
              overflow: 'hidden',
            }}
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user.avatarInitials
            )}
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
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
              backgroundColor: '#3A3A52',
              border: '1px solid #4D4D6B',
              borderRadius: '20px',
              padding: '5px 12px',
              marginTop: '6px',
              marginBottom: '14px',
              color: '#7FE87F',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <span>{user.upiId}</span>
            {copied ? <CheckCircle2 size={14} color="#7FE87F" /> : <Copy size={13} />}
          </button>

          {/* Machine-Readable QR Code */}
          <div style={{ padding: '10px', backgroundColor: '#FFFFFF', borderRadius: '16px' }}>
            <QRCodeView value={upiQrString} size={180} />
          </div>

          {numAmount > 0 ? (
            <div
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: '#7FE87F',
                marginTop: '12px',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                border: '1px solid #7FE87F',
                padding: '4px 14px',
                borderRadius: '12px',
              }}
            >
              Amount: {formatCurrency(numAmount)}
            </div>
          ) : (
            <div
              style={{
                fontSize: '11px',
                color: '#7FE87F',
                marginTop: '12px',
                fontWeight: 800,
                backgroundColor: '#3A3A52',
                padding: '4px 12px',
                borderRadius: '12px',
                border: '1px solid #4D4D6B',
              }}
            >
              Accepts Any UPI App • Direct to {primaryBank?.bankName || 'Bank'}
            </div>
          )}
        </div>

        {/* Set Specific Amount Box */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '16px',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
            Set Request Amount (Optional)
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1A1A2E',
                border: '1px solid #4D4D6B',
                borderRadius: '8px',
                padding: '0 12px',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#7FE87F', marginRight: '6px' }}>₹</span>
              <input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  padding: '10px 0',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              />
              {customAmount && (
                <button
                  onClick={() => setCustomAmount('')}
                  style={{ background: 'none', border: 'none', color: '#808099', cursor: 'pointer', fontSize: '12px' }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {[100, 500, 1000, 2000].map((amt) => (
              <button
                key={amt}
                onClick={() => setCustomAmount(String(amt))}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  borderRadius: '6px',
                  border: customAmount === String(amt) ? '1px solid #7FE87F' : '1px solid #4D4D6B',
                  backgroundColor: customAmount === String(amt) ? 'rgba(127, 232, 127, 0.15)' : '#3A3A52',
                  color: customAmount === String(amt) ? '#7FE87F' : '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Live Simulation & Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Instant Receive Money Simulation Trigger */}
          <button
            onClick={() => handleSimulateReceive()}
            className="interactive-tap"
            style={{
              width: '100%',
              backgroundColor: '#7FE87F',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '14.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <Sparkles size={18} color="#000000" /> Simulate Incoming Payment ({formatCurrency(numAmount > 0 ? numAmount : 500)})
          </button>

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

