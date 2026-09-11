import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import type { Contact } from '../types';
import { designSystem } from '../design-system';

export const SendAmountScreen: React.FC = () => {
  const { screenParams, openPinModal, contacts, navigateTo } = useApp();
  const contact: Contact = screenParams.contact || contacts[0] || {
    id: 'default',
    name: 'Priya Menon',
    upiId: 'priya@paytm',
    avatarInitials: 'PM',
    mobile: '+91 98765 00001',
  };

  const initialAmount = screenParams.defaultAmount ? String(screenParams.defaultAmount) : '';
  const [amountStr, setAmountStr] = useState<string>(initialAmount);
  const [note, setNote] = useState<string>('');

  const numAmount = parseFloat(amountStr) || 0;

  const handlePayClick = () => {
    if (numAmount <= 0) return;

    openPinModal({
      title: `Pay ${contact.name}`,
      amount: numAmount,
      subTitle: `To ${contact.upiId}`,
      onSuccess: () => {
        navigateTo('PAYMENT_SUCCESS', {
          recipientName: contact.name,
          amount: numAmount,
          upiId: contact.upiId,
          type: 'sent',
        });
      },
    });
  };

  return (
    <div className="fade-in" style={{ fontFamily: designSystem.typography.fontFamily }}>
      <AppHeader title="Send Money" showBack />

      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* Contact Header Card */}
        <div
          style={{
            backgroundColor: designSystem.colors.surface,
            border: `1px solid ${designSystem.colors.borderHairline}`,
            borderRadius: designSystem.radii.md,
            padding: '24px',
            marginBottom: '24px',
            boxShadow: designSystem.shadows.none,
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: designSystem.radii.full,
              backgroundColor: designSystem.colors.primary,
              color: designSystem.colors.textOnPrimary,
              fontWeight: designSystem.typography.weights.extrabold,
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: designSystem.shadows.none,
            }}
          >
            {contact.avatarInitials}
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: designSystem.colors.textPrimary }}>
            {contact.name}
          </h2>
          <div style={{ fontSize: '13px', color: designSystem.colors.textSecondary }}>{contact.upiId}</div>
        </div>

        {/* Amount Input */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '12px',
              color: designSystem.colors.textSecondary,
              fontWeight: '700',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            ENTER AMOUNT (₹)
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '36px', fontWeight: '800', color: designSystem.colors.primary }}>₹</span>
            <input
              type="number"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="0"
              autoFocus
              style={{
                fontSize: '44px',
                fontWeight: '800',
                color: designSystem.colors.textPrimary,
                background: 'none',
                border: 'none',
                outline: 'none',
                width: '200px',
                textAlign: 'center',
              }}
            />
          </div>
        </div>

        {/* Optional Note */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Add a note (e.g. Dinner, Rent)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: designSystem.colors.surface,
              border: `1px solid ${designSystem.colors.borderHairline}`,
              borderRadius: designSystem.radii.sm,
              padding: '12px 16px',
              color: designSystem.colors.textPrimary,
              fontSize: '14px',
              outline: 'none',
              textAlign: 'center',
              boxShadow: designSystem.shadows.none,
            }}
          />
        </div>

        {/* Quick Amount Buttons */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
          {['100', '500', '1000', '2500'].map((val) => (
            <button
              key={val}
              onClick={() => setAmountStr(val)}
              style={{
                backgroundColor: amountStr === val ? designSystem.colors.primaryLight : designSystem.colors.surface,
                border: amountStr === val ? `1px solid ${designSystem.colors.primary}` : `1px solid ${designSystem.colors.borderHairline}`,
                color: amountStr === val ? designSystem.colors.primaryDark : designSystem.colors.textPrimary,
                borderRadius: designSystem.radii.sm,
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              +₹{val}
            </button>
          ))}
        </div>

        <PrimaryButton onClick={handlePayClick} disabled={numAmount <= 0}>
          Pay ₹{numAmount ? numAmount.toLocaleString('en-IN') : '0'}
        </PrimaryButton>
      </div>
    </div>
  );
};
