import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import type { Contact } from '../types';

export const SendAmountScreen: React.FC = () => {
  const { screenParams, openPinModal, completePayment, navigateTo } = useApp();
  const contact: Contact = screenParams.contact || {
    name: 'Rahul Sharma',
    upiId: 'rahul@upi',
    mobile: '+91 98123 45678',
    avatarInitials: 'RS',
  };

  const [amountStr, setAmountStr] = useState<string>('500');
  const [note, setNote] = useState<string>('');

  const numAmount = parseFloat(amountStr) || 0;

  const handlePayClick = () => {
    if (numAmount <= 0) return;

    openPinModal({
      title: contact.name,
      amount: numAmount,
      subTitle: note ? `Note: ${note}` : 'Direct Transfer',
      onSuccess: async () => {
        const txn = await completePayment({
          title: contact.name,
          subTitle: note ? `Note: ${note}` : 'UPI Transfer',
          amount: numAmount,
          avatarInitials: contact.avatarInitials,
          category: 'Transfer',
        });
        navigateTo('PAYMENT_SUCCESS', { transaction: txn });
      },
    });
  };

  return (
    <div className="fade-in">
      <AppHeader title="Send Money" showBack showSettings />

      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* Contact Header Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '30px',
            boxShadow: '0 4px 20px rgba(7, 25, 19, 0.04)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--neon-primary)',
              color: 'var(--text-dark)',
              fontWeight: '800',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: '0 4px 15px rgba(158, 240, 26, 0.4)',
            }}
          >
            {contact.avatarInitials}
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>{contact.name}</h2>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{contact.upiId}</div>
        </div>

        {/* Amount Input */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }}>
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
            <span style={{ fontSize: '36px', fontWeight: '800', color: '#071913' }}>₹</span>
            <input
              type="number"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="0"
              style={{
                fontSize: '44px',
                fontWeight: '800',
                color: 'var(--text-primary)',
                background: 'none',
                border: 'none',
                outline: 'none',
                width: '180px',
                textAlign: 'center',
              }}
            />
          </div>
        </div>

        {/* Optional Note */}
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Add a note (e.g. Dinner, Rent)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              padding: '14px 18px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(7, 25, 19, 0.02)',
            }}
          />
        </div>

        {/* Quick Amount Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
          {['100', '500', '1000', '2500'].map((val) => (
            <button
              key={val}
              onClick={() => setAmountStr(val)}
              style={{
                backgroundColor: amountStr === val ? 'rgba(158, 240, 26, 0.25)' : '#FFFFFF',
                border: amountStr === val ? '1px solid var(--neon-primary)' : '1px solid var(--card-border)',
                color: amountStr === val ? '#071913' : 'var(--text-primary)',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
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
