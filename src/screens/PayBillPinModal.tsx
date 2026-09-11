import React, { useState } from 'react';
import { BottomSheet } from '../components/BottomSheet';
import { PinPad } from '../components/PinPad';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';
import { authService } from '../services/authService';
import { designSystem } from '../design-system';

export const PayBillPinModal: React.FC = () => {
  const { isPinModalOpen, closePinModal, pendingPaymentData, bankAccounts } = useApp();
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const primaryBank = bankAccounts.find((b) => b.isPrimary) || bankAccounts[0];

  if (!pendingPaymentData) return null;

  const isCheckBalance = pendingPaymentData.title.toLowerCase().includes('balance');

  const handlePinComplete = async (pin: string) => {
    setIsVerifying(true);
    setError('');
    try {
      const isValid = await authService.verifyPin(pin);
      if (isValid) {
        closePinModal();
        if (pendingPaymentData.onSuccess) {
          pendingPaymentData.onSuccess();
        }
      } else {
        setError('Incorrect PIN. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <BottomSheet
      isOpen={isPinModalOpen}
      onClose={closePinModal}
      title={isCheckBalance ? 'Verify UPI PIN to Check Balance' : pendingPaymentData.title}
    >
      <div style={{ paddingBottom: '10px' }}>
        {/* Payment / Check Balance Summary Box (0 Drop Shadows) */}
        <div
          style={{
            backgroundColor: designSystem.colors.surface,
            border: `1px solid ${designSystem.colors.borderHairline}`,
            borderRadius: designSystem.radii.md,
            padding: '16px',
            marginBottom: '20px',
            boxShadow: designSystem.shadows.none,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: designSystem.typography.weights.extrabold, fontSize: '15px', color: designSystem.colors.textPrimary }}>{pendingPaymentData.title}</div>
              <div style={{ fontSize: '12px', color: designSystem.colors.textSecondary, marginTop: '2px' }}>
                {pendingPaymentData.subTitle}
              </div>
            </div>
            {pendingPaymentData.amount > 0 && !isCheckBalance && (
              <div style={{ fontSize: '20px', fontWeight: designSystem.typography.weights.black, color: designSystem.colors.primary }}>
                {formatCurrency(pendingPaymentData.amount)}
              </div>
            )}
            {isCheckBalance && (
              <div style={{ fontSize: '18px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary, letterSpacing: '4px' }}>
                ••••••••
              </div>
            )}
          </div>

          <div
            style={{
              borderTop: `1px solid ${designSystem.colors.borderHairline}`,
              marginTop: '12px',
              paddingTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
            }}
          >
            <span style={{ color: designSystem.colors.textSecondary }}>Account:</span>
            <span style={{ fontWeight: designSystem.typography.weights.bold, color: designSystem.colors.textPrimary }}>
              {primaryBank ? `${primaryBank.bankName} (${primaryBank.accountNumberMasked})` : 'Linked Bank Account'}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {isVerifying ? 'Verifying PIN...' : 'ENTER 4-DIGIT UPI PIN'}
          </span>
        </div>

        <PinPad length={4} onComplete={handlePinComplete} error={error} />
      </div>
    </BottomSheet>
  );
};
