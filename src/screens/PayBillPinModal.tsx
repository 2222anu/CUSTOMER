import React, { useState } from 'react';
import { BottomSheet } from '../components/BottomSheet';
import { PinPad } from '../components/PinPad';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';
import { authService } from '../services/authService';

export const PayBillPinModal: React.FC = () => {
  const { isPinModalOpen, closePinModal, pendingPaymentData, bankAccounts } = useApp();
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const primaryBank = bankAccounts.find((b) => b.isPrimary) || bankAccounts[0];

  if (!pendingPaymentData) return null;

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
      title="Pay Bill"
    >
      <div style={{ paddingBottom: '10px' }}>
        {/* Payment Summary Info Box */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #DAD1C8',
            borderRadius: '20px',
            padding: '16px 18px',
            marginBottom: '20px',
            boxShadow: '0 4px 14px rgba(17, 17, 68, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '800', fontSize: '15px', color: '#111144' }}>{pendingPaymentData.title}</div>
              <div style={{ fontSize: '12px', color: '#5C564D', marginTop: '2px' }}>
                {pendingPaymentData.subTitle}
              </div>
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#F98513' }}>
              {formatCurrency(pendingPaymentData.amount)}
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid #DAD1C8',
              marginTop: '12px',
              paddingTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
            }}
          >
            <span style={{ color: '#5C564D' }}>Paying via:</span>
            <span style={{ fontWeight: '700', color: '#111144' }}>
              {primaryBank ? `${primaryBank.bankName} (${primaryBank.accountNumberMasked})` : 'ICICI Bank Savings'}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#111144', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {isVerifying ? 'Verifying PIN...' : 'ENTER 4-DIGIT UPI PIN'}
          </span>
        </div>

        <PinPad length={4} onComplete={handlePinComplete} error={error} />
      </div>
    </BottomSheet>
  );
};
