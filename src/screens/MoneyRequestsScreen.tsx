import React from 'react';
import { Check, X } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';

export const MoneyRequestsScreen: React.FC = () => {
  const { moneyRequests, openPinModal, completePayment, navigateTo } = useApp();

  const handlePayRequest = (req: typeof moneyRequests[0]) => {
    openPinModal({
      title: req.requesterName,
      amount: req.amount,
      subTitle: req.note || 'Requested Payment',
      onSuccess: async () => {
        const txn = await completePayment({
          title: req.requesterName,
          subTitle: 'Request Approved Payment',
          amount: req.amount,
          avatarInitials: req.requesterName.substring(0, 2).toUpperCase(),
        });
        navigateTo('PAYMENT_SUCCESS', { transaction: txn });
      },
    });
  };

  return (
    <div className="fade-in">
      <AppHeader title="Money Requests" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {moneyRequests.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 0' }}>
            No pending money requests.
          </div>
        ) : (
          moneyRequests.map((req) => (
            <div
              key={req.id}
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(158, 240, 26, 0.15)',
                      color: 'var(--neon-primary)',
                      fontWeight: '800',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {req.requesterName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '16px' }}>{req.requesterName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{req.upiId}</div>
                  </div>
                </div>

                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--neon-primary)' }}>
                  {formatCurrency(req.amount)}
                </div>
              </div>

              {req.note && (
                <div
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginBottom: '16px',
                  }}
                >
                  "{req.note}"
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#EF4444',
                    borderRadius: '14px',
                    padding: '12px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <X size={16} /> Decline
                </button>
                <PrimaryButton onClick={() => handlePayRequest(req)}>
                  <Check size={16} /> Pay {formatCurrency(req.amount)}
                </PrimaryButton>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
