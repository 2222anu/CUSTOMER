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
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '24px' }}>
      <AppHeader title="Electricity" showBack showSettings />

      <div style={{ padding: '24px 20px' }}>
        {/* Electricity Header Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: 'none',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#eef5ff',
              color: '#2e83ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              border: '1px solid #d6e6ff',
            }}
          >
            <Zap size={30} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Electricity Bill</h2>
          <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
            State Power Corporation (TSSPDCL)
          </p>
        </div>

        {/* Input Consumer ID */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="elec-consumer-input" style={{ fontSize: '12px', color: '#475569', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
            Consumer Number / ID
          </label>
          <input
            id="elec-consumer-input"
            type="text"
            value={consumerNo}
            onChange={(e) => setConsumerNo(e.target.value)}
            placeholder="Enter Consumer Number"
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '14px',
              color: '#0f172a',
              fontSize: '15px',
              fontWeight: '700',
              outline: 'none',
              boxShadow: 'none',
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
              'Fetch Bill Details'
            )}
          </PrimaryButton>
        ) : (
          <div className="slide-up">
            {/* Fetched Bill Info Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #2e83ff',
                borderRadius: '8px',
                padding: '18px',
                marginBottom: '24px',
                boxShadow: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#475569', fontSize: '13px' }}>Provider:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a' }}>{bill.providerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#475569', fontSize: '13px' }}>Consumer No:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a' }}>{bill.consumerNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#475569', fontSize: '13px' }}>Due Date:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#dc2626' }}>{bill.dueDate}</span>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#475569', fontSize: '14px', fontWeight: '600' }}>Total Amount Due:</span>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#2e83ff' }}>
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
