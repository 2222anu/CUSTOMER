import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const RequestMoneyScreen: React.FC = () => {
  const { contacts, addMoneyRequest, navigateTo } = useApp();
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [amountStr, setAmountStr] = useState('450');
  const [note, setNote] = useState('Split bill');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendRequest = () => {
    const amount = parseFloat(amountStr) || 0;
    if (amount <= 0) return;

    addMoneyRequest({
      name: selectedContact.name,
      upiId: selectedContact.upiId,
      amount,
      note,
    });

    setIsSuccess(true);
    setTimeout(() => {
      navigateTo('MONEY_REQUESTS');
    }, 1200);
  };

  return (
    <div className="fade-in">
      <AppHeader title="Request Money" showBack showSettings />

      <div style={{ padding: '20px' }}>
        {isSuccess ? (
          <div className="fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--neon-primary)',
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                fontSize: '28px',
                boxShadow: '0 0 25px var(--neon-glow)',
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
              Request Sent!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Requested ₹{amountStr} from {selectedContact.name}
            </p>
          </div>
        ) : (
          <>
            {/* Select Contact */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
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
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontWeight: '600',
                  outline: 'none',
                }}
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id} style={{ background: '#0C231B', color: '#FFF' }}>
                    {c.name} ({c.upiId})
                  </option>
                ))}
              </select>
            </div>

            {/* Enter Amount */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                Amount (₹)
              </label>
              <input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="0"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '16px',
                  padding: '16px',
                  color: 'var(--neon-primary)',
                  fontSize: '24px',
                  fontWeight: '800',
                  outline: 'none',
                }}
              />
            </div>

            {/* Note */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What is this request for?"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  color: 'var(--text-primary)',
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
