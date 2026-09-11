import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import type { Contact } from '../types';
import { designSystem } from '../design-system';

export const RequestMoneyScreen: React.FC = () => {
  const { contacts, addMoneyRequest } = useApp();
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0] || {
    id: 'c1',
    name: 'Priya Menon',
    upiId: 'priya@paytm',
    avatarInitials: 'PM',
    mobile: '+91 98765 00001',
  });
  const [amountStr, setAmountStr] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSendRequest = () => {
    const amount = parseFloat(amountStr);
    if (!amount || amount <= 0) return;

    addMoneyRequest({
      name: selectedContact.name,
      upiId: selectedContact.upiId,
      amount,
      note: note || undefined,
    });

    setIsSuccess(true);
  };

  return (
    <div className="fade-in" style={{ fontFamily: designSystem.typography.fontFamily }}>
      <AppHeader title="Request Money" showBack />

      <div style={{ padding: '20px' }}>
        {isSuccess ? (
          <div className="fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: designSystem.radii.full,
                backgroundColor: designSystem.colors.primary,
                color: designSystem.colors.textOnPrimary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                fontSize: '28px',
                boxShadow: designSystem.shadows.none,
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: designSystem.colors.textPrimary }}>
              Request Sent!
            </h3>
            <p style={{ color: designSystem.colors.textSecondary, fontSize: '14px' }}>
              Requested ₹{amountStr} from {selectedContact.name}
            </p>
          </div>
        ) : (
          <>
            {/* Select Contact */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  fontSize: '12px',
                  color: designSystem.colors.textSecondary,
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                Request From
              </label>
              <select
                value={selectedContact.id}
                onChange={(e) => {
                  const c = contacts.find((item) => item.id === e.target.value);
                  if (c) setSelectedContact(c);
                }}
                style={{
                  width: '100%',
                  backgroundColor: designSystem.colors.surface,
                  border: `1px solid ${designSystem.colors.borderHairline}`,
                  borderRadius: designSystem.radii.sm,
                  padding: '12px 16px',
                  color: designSystem.colors.textPrimary,
                  fontSize: '14px',
                  fontWeight: '600',
                  outline: 'none',
                }}
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.upiId})
                  </option>
                ))}
              </select>
            </div>

            {/* Enter Amount */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  fontSize: '12px',
                  color: designSystem.colors.textSecondary,
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                Amount (₹)
              </label>
              <input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="0"
                style={{
                  width: '100%',
                  backgroundColor: designSystem.colors.surface,
                  border: `1px solid ${designSystem.colors.borderHairline}`,
                  borderRadius: designSystem.radii.sm,
                  padding: '14px 16px',
                  color: designSystem.colors.primaryDark,
                  fontSize: '22px',
                  fontWeight: '800',
                  outline: 'none',
                }}
              />
            </div>

            {/* Note */}
            <div style={{ marginBottom: '28px' }}>
              <label
                style={{
                  fontSize: '12px',
                  color: designSystem.colors.textSecondary,
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What is this request for?"
                style={{
                  width: '100%',
                  backgroundColor: designSystem.colors.surface,
                  border: `1px solid ${designSystem.colors.borderHairline}`,
                  borderRadius: designSystem.radii.sm,
                  padding: '12px 16px',
                  color: designSystem.colors.textPrimary,
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <PrimaryButton onClick={handleSendRequest} disabled={!amountStr || parseFloat(amountStr) <= 0}>
              Send Request
            </PrimaryButton>
          </>
        )}
      </div>
    </div>
  );
};
