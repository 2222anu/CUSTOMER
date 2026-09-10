import React, { useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import type { ElectricityBill } from '../types';
import { formatCurrency } from '../utils/formatters';

export const ElectricityScreen: React.FC = () => {
  const { fetchElectricityBill, openPinModal, completePayment, navigateTo } = useApp();

  const [consumerNo, setConsumerNo] = useState<string>('134567');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<ElectricityBill | null>(null);

  const handleFetchBill = async () => {
    if (!consumerNo) return;
    setIsLoading(true);
    try {
      const b = await fetchElectricityBill(consumerNo);
      setBill(b);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayBill = () => {
    if (!bill) return;

    openPinModal({
      title: 'State Power Corporation',
      amount: bill.amount,
      subTitle: `Electricity Bill • ID: ${bill.consumerNumber}`,
      onSuccess: async () => {
        const txn = await completePayment({
          title: bill.providerName,
          subTitle: 'Electricity Bill Payment',
          amount: bill.amount,
          avatarInitials: 'SP',
          category: 'Bills',
        });
        navigateTo('PAYMENT_SUCCESS', { transaction: txn });
      },
    });
  };

  return (
    <div className="fade-in">
      <AppHeader title="Electricity" showBack showSettings />

      <div style={{ padding: '24px 20px' }}>
        {/* Electricity Header Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(7, 25, 19, 0.04)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              backgroundColor: 'rgba(158, 240, 26, 0.18)',
              color: '#071913',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <Zap size={36} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>Electricity Bill</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            State Power Corporation
          </p>
        </div>

        {/* Input Consumer ID */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
            Consumer Number / ID
          </label>
          <input
            type="text"
            value={consumerNo}
            onChange={(e) => setConsumerNo(e.target.value)}
            placeholder="Enter Consumer Number"
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              padding: '16px',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: '600',
              outline: 'none',
              boxShadow: '0 2px 10px rgba(7, 25, 19, 0.02)',
            }}
          />
        </div>

        {!bill ? (
          <PrimaryButton onClick={handleFetchBill} disabled={isLoading || !consumerNo}>
            {isLoading ? (
              <>
                <Loader2 size={20} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                Fetching Bill...
              </>
            ) : (
              'Fetch Bill'
            )}
          </PrimaryButton>
        ) : (
          <div className="slide-up">
            {/* Fetched Bill Info Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--neon-primary)',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(7, 25, 19, 0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Provider:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>{bill.providerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Consumer No:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>{bill.consumerNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Due Date:</span>
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#D97706' }}>{bill.dueDate}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Total Amount Due:</span>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#071913' }}>
                  {formatCurrency(bill.amount)}
                </span>
              </div>
            </div>

            <PrimaryButton onClick={handlePayBill}>
              Pay Bill {formatCurrency(bill.amount)}
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};
