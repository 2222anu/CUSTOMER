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

      <div style={{ padding: '20px' }}>
        {/* Electricity Header Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px 20px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#eef5ff',
              color: '#2e83ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              border: '1.5px solid #d6e6ff',
            }}
          >
            <Zap size={28} />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Electricity Bill Payment
          </h2>
          <div style={{ fontSize: '12px', color: '#2e83ff', fontWeight: 800, marginTop: '4px' }}>
            TSSPDCL &bull; Verified
          </div>
        </div>

        {/* Input Consumer ID */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="elec-consumer-input"
            style={{
              fontSize: '11px',
              color: '#64748b',
              fontWeight: '800',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              display: 'block',
              marginLeft: '4px',
            }}
          >
            Consumer Number / Service ID
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              padding: '12px 14px',
              transition: 'border-color 0.15s ease',
            }}
          >
            <Zap size={18} color="#2e83ff" style={{ marginRight: '10px', flexShrink: 0 }} />
            <input
              id="elec-consumer-input"
              type="text"
              value={consumerNo}
              onChange={(e) => setConsumerNo(e.target.value)}
              placeholder="Enter 6 to 10 digit Consumer Number"
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#0f172a',
                fontSize: '15px',
                fontWeight: '700',
                outline: 'none',
                fontVariantNumeric: 'tabular-nums',
              }}
            />
          </div>
        </div>

        {!bill ? (
          <PrimaryButton onClick={handleFetchBill} disabled={isLoading || !consumerNo}>
            {isLoading ? (
              <>
                <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                Fetching Live Bill...
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
                border: '1.5px solid rgba(46, 131, 255, 0.4)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '13px' }}>Biller:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a' }}>{bill.providerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '13px' }}>Consumer Number:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>{bill.consumerNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ color: '#64748b', fontSize: '13px' }}>Due Date:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#dc2626' }}>{bill.dueDate}</span>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '700' }}>Total Amount Due:</span>
                <span style={{ fontSize: '22px', fontWeight: '900', color: '#2e83ff', fontVariantNumeric: 'tabular-nums' }}>
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
