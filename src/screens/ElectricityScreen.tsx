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
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '24px' }}>
      <AppHeader title="Electricity" showBack showSettings />

      <div style={{ padding: '20px' }}>
        {/* Electricity Header Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
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
              backgroundColor: '#3A3A52',
              color: '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              border: '1px solid #4D4D6B',
            }}
          >
            <Zap size={28} />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
            Electricity Bill Payment
          </h2>
          <div style={{ fontSize: '12px', color: '#7FE87F', fontWeight: 800, marginTop: '4px' }}>
            TSSPDCL &bull; Verified
          </div>
        </div>

        {/* Input Consumer ID */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="elec-consumer-input"
            style={{
              fontSize: '11px',
              color: '#B3B3C2',
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
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
              borderRadius: '12px',
              padding: '12px 14px',
              transition: 'border-color 0.15s ease',
            }}
          >
            <Zap size={18} color="#7FE87F" style={{ marginRight: '10px', flexShrink: 0 }} />
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
                color: '#FFFFFF',
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
                backgroundColor: '#2A2A3E',
                border: '1px solid #4D4D6B',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#B3B3C2', fontSize: '13px' }}>Biller:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#FFFFFF' }}>{bill.providerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#B3B3C2', fontSize: '13px' }}>Consumer Number:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#FFFFFF', fontVariantNumeric: 'tabular-nums' }}>{bill.consumerNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ color: '#B3B3C2', fontSize: '13px' }}>Due Date:</span>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#FF4757' }}>{bill.dueDate}</span>
              </div>

              <div style={{ borderTop: '1px solid #3A3A52', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#B3B3C2', fontSize: '13px', fontWeight: '700' }}>Total Amount Due:</span>
                <span style={{ fontSize: '22px', fontWeight: '900', color: '#7FE87F', fontVariantNumeric: 'tabular-nums' }}>
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
