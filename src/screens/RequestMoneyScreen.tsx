import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import type { Contact } from '../types';

export const RequestMoneyScreen: React.FC = () => {
  const { contacts, addMoneyRequest } = useApp();
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0] || {
    id: 'c1',
    name: 'Sara Al-Mansoor',
    upiId: 'sara@sarie',
    avatarInitials: 'SM',
    mobile: '+966 55 876 5432',
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
    <div className="fade-in" style={{ backgroundColor: '#0B0B14', minHeight: '100%', paddingBottom: '30px', color: '#FFFFFF' }}>
      <AppHeader title="Request Money" showBack />

      <div style={{ padding: '20px' }}>
        {isSuccess ? (
          <div className="fade-in" style={{ textAlign: 'center', backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '20px', padding: '40px 20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1.5px solid rgba(127, 232, 127, 0.4)',
              }}
            >
              <Check size={32} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: '#FFFFFF' }}>
              Request Sent Successfully!
            </h3>
            <p style={{ color: '#A2A2BA', fontSize: '13px', margin: 0 }}>
              Requested SAR {amountStr} from <strong style={{ color: '#FFFFFF' }}>{selectedContact.name}</strong>
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Selected Contact Card */}
            <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '16px', padding: '16px' }}>
              <label
                style={{
                  fontSize: '11px',
                  color: '#A2A2BA',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  display: 'block',
                }}
              >
                Request From
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#1E1E32',
                    border: '1px solid #2C2C44',
                    color: '#7FE87F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '16px',
                  }}
                >
                  {selectedContact.avatarInitials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>{selectedContact.name}</div>
                  <div style={{ fontSize: '12px', color: '#A2A2BA' }}>{selectedContact.upiId}</div>
                </div>
              </div>

              <select
                value={selectedContact.id}
                onChange={(e) => {
                  const c = contacts.find((item) => item.id === e.target.value);
                  if (c) setSelectedContact(c);
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id} style={{ backgroundColor: '#1E1E32', color: '#FFFFFF' }}>
                    {c.name} ({c.upiId})
                  </option>
                ))}
              </select>
            </div>

            {/* Enter Amount Card */}
            <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '16px', padding: '20px' }}>
              <label
                style={{
                  fontSize: '11px',
                  color: '#A2A2BA',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                  display: 'block',
                }}
              >
                Enter Request Amount
              </label>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#1E1E32',
                  border: '1.5px solid #7FE87F',
                  borderRadius: '14px',
                  padding: '12px 18px',
                  marginBottom: '14px',
                }}
              >
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#7FE87F', marginRight: '8px' }}>SAR</span>
                <input
                  type="number"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  placeholder="0"
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '28px',
                    fontWeight: 900,
                    outline: 'none',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                />
              </div>

              {/* Quick Amount Chips */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                {[50, 100, 500, 1000].map((quickAmt) => (
                  <button
                    key={quickAmt}
                    type="button"
                    className="interactive-tap"
                    onClick={() => {
                      const current = parseFloat(amountStr) || 0;
                      setAmountStr((current + quickAmt).toString());
                    }}
                    style={{
                      flex: 1,
                      padding: '7px 0',
                      borderRadius: '10px',
                      backgroundColor: '#1E1E32',
                      border: '1px solid #2C2C44',
                      color: '#7FE87F',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    +SAR {quickAmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Note Card */}
            <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '16px', padding: '16px' }}>
              <label
                style={{
                  fontSize: '11px',
                  color: '#A2A2BA',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                Payment Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What is this request for? (e.g. Dinner, Rent)"
                style={{
                  width: '100%',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                }}
              />
            </div>

            <PrimaryButton onClick={handleSendRequest} disabled={!amountStr || parseFloat(amountStr) <= 0}>
              Send Payment Request
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};
