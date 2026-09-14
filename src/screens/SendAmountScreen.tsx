import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import type { Contact } from '../types';
import { ShieldCheck, MessageSquare } from 'lucide-react';

export const SendAmountScreen: React.FC = () => {
  const { screenParams, openPinModal, contacts, navigateTo, completePayment } = useApp();
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
      onSuccess: async () => {
        const txn = await completePayment({
          title: contact.name,
          subTitle: `To ${contact.upiId}`,
          amount: numAmount,
          avatarInitials: contact.avatarInitials,
          category: 'Transfer',
        });
        navigateTo('PAYMENT_SUCCESS', {
          transaction: txn,
          recipientName: contact.name,
          amount: numAmount,
          upiId: contact.upiId,
          type: 'sent',
        });
      },
    });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '32px' }}>
      <AppHeader title="Send Money" showBack />

      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* Recipient Profile Card */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            borderRadius: '16px',
            padding: '24px 20px',
            marginBottom: '20px',
            boxShadow: 'none',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#3A3A52',
              color: '#7FE87F',
              fontWeight: 800,
              fontSize: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              border: '2px solid #7FE87F',
            }}
          >
            {contact.avatarInitials}
          </div>
          <h2 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '4px', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
            {contact.name}
          </h2>
          <div style={{ fontSize: '13px', color: '#B3B3C2', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <span>{contact.upiId}</span>
            <span>&bull;</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#7FE87F', fontWeight: 700 }}>
              <ShieldCheck size={14} /> Verified
            </span>
          </div>
        </div>

        {/* Amount Input Card */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            borderRadius: '16px',
            padding: '24px 20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: '#B3B3C2',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Enter Amount
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#7FE87F' }}>₹</span>
            <input
              type="number"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="0"
              autoFocus
              className="tabular-nums"
              style={{
                fontSize: '48px',
                fontWeight: 900,
                color: '#FFFFFF',
                background: 'none',
                border: 'none',
                outline: 'none',
                width: '240px',
                textAlign: 'center',
                padding: 0,
              }}
            />
          </div>

          {/* Quick Amount Chips */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '18px' }}>
            {['100', '500', '1000', '2000', '5000'].map((val) => {
              const isSelected = amountStr === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmountStr(val)}
                  className="interactive-tap"
                  style={{
                    backgroundColor: isSelected ? 'rgba(127, 232, 127, 0.15)' : '#3A3A52',
                    border: isSelected ? '1.5px solid #7FE87F' : '1px solid #4D4D6B',
                    color: isSelected ? '#7FE87F' : '#FFFFFF',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  +₹{val}
                </button>
              );
            })}
          </div>

          {/* Optional Note Field */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#1A1A2E',
              border: '1px solid #4D4D6B',
              borderRadius: '10px',
              padding: '10px 14px',
            }}
          >
            <MessageSquare size={16} color="#808099" />
            <input
              type="text"
              placeholder="Add a note (e.g. Dinner, Rent, Groceries)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <PrimaryButton onClick={handlePayClick} disabled={numAmount <= 0}>
          Pay ₹{numAmount ? numAmount.toLocaleString('en-IN') : '0'}
        </PrimaryButton>
      </div>
    </div>
  );
};
