import React from 'react';
import { Check, X } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';
import { designSystem } from '../design-system';

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
    <div className="fade-in" style={{ fontFamily: designSystem.typography.fontFamily }}>
      <AppHeader title="Money Requests" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {moneyRequests.length === 0 ? (
          <div style={{ textAlign: 'center', color: designSystem.colors.textSecondary, padding: '40px 0' }}>
            No pending money requests.
          </div>
        ) : (
          moneyRequests.map((req) => (
            <div
              key={req.id}
              style={{
                backgroundColor: designSystem.colors.surface,
                border: `1px solid ${designSystem.colors.borderHairline}`,
                borderRadius: designSystem.radii.md,
                padding: '20px',
                marginBottom: '16px',
                boxShadow: designSystem.shadows.none,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: designSystem.radii.full,
                      backgroundColor: designSystem.colors.primaryLight,
                      color: designSystem.colors.primaryDark,
                      fontWeight: designSystem.typography.weights.extrabold,
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {req.requesterName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px', color: designSystem.colors.textPrimary }}>
                      {req.requesterName}
                    </div>
                    <div style={{ fontSize: '12px', color: designSystem.colors.textSecondary }}>{req.upiId}</div>
                  </div>
                </div>

                <div style={{ fontSize: '17px', fontWeight: '800', color: designSystem.colors.primaryDark }}>
                  {formatCurrency(req.amount)}
                </div>
              </div>

              {req.note && (
                <div
                  style={{
                    backgroundColor: designSystem.colors.subSurface,
                    borderRadius: designSystem.radii.xs,
                    padding: '8px 12px',
                    fontSize: '13px',
                    color: designSystem.colors.textSecondary,
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
                    backgroundColor: designSystem.colors.dangerLight,
                    border: `1px solid ${designSystem.colors.dangerLight}`,
                    color: designSystem.colors.danger,
                    borderRadius: designSystem.radii.sm,
                    padding: '10px',
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
