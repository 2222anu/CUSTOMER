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
          title: 'QTPay UPI ID',
          text: `Pay ${user.name} via QTPay: ${user.upiId}${numAmount > 0 ? ` (Amount: ${formatCurrency(numAmount)})` : ''}`,
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
      note: 'Payment via QTPay QR',
    });

    playSuccessChime();
    setReceivedToast({ show: true, amount: amt, sender: randomSender });
    setTimeout(() => setReceivedToast(null), 3500);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '30px' }}>
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
            backgroundColor: '#065f46',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 16px rgba(6, 95, 70, 0.35)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowDownLeft size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>
                +{formatCurrency(receivedToast.amount)} Received!
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                Credited to {primaryBank ? primaryBank.bankName : 'Bank'} from {receivedToast.sender}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigateTo('HISTORY')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#ffffff',
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
        {/* White QR Showcase Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
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
              backgroundColor: user.avatarBgColor || '#2e83ff',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
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
              padding: '5px 12px',
              marginTop: '6px',
              marginBottom: '14px',
              color: '#2e83ff',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <span>{user.upiId}</span>
            {copied ? <CheckCircle2 size={14} color="#10b981" /> : <Copy size={13} />}
          </button>

          {/* Machine-Readable QR Code */}
          <div style={{ padding: '8px', backgroundColor: '#ffffff', borderRadius: '16px' }}>
            <QRCodeView value={upiQrString} size={180} />
          </div>

          {numAmount > 0 ? (
            <div
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: '#10b981',
                marginTop: '12px',
                backgroundColor: '#d1fae5',
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
                color: '#2e83ff',
                marginTop: '12px',
                fontWeight: 800,
                backgroundColor: '#eef5ff',
                padding: '4px 12px',
                borderRadius: '12px',
                border: '1px solid #d6e6ff',
              }}
            >
              Accepts Any UPI App • Direct to {primaryBank?.bankName || 'Bank'}
            </div>
          )}
        </div>

        {/* Set Specific Amount Box */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '16px',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            Set Request Amount (Optional)
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0 12px',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#64748b', marginRight: '6px' }}>₹</span>
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
                  color: '#0f172a',
                }}
              />
              {customAmount && (
                <button
                  onClick={() => setCustomAmount('')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px' }}
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
                  border: customAmount === String(amt) ? '1px solid #2e83ff' : '1px solid #e2e8f0',
                  backgroundColor: customAmount === String(amt) ? '#eef5ff' : '#ffffff',
                  color: customAmount === String(amt) ? '#2e83ff' : '#475569',
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
              backgroundColor: '#10b981',
              color: '#ffffff',
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
            <Sparkles size={18} /> Simulate Incoming Payment ({formatCurrency(numAmount > 0 ? numAmount : 500)})
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

