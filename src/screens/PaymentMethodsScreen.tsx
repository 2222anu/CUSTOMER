import React from 'react';
import { CreditCard, Landmark, Plus, Star, Wifi, ShieldCheck } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const PaymentMethodsScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100vh', paddingBottom: '36px', color: '#FFFFFF' }}>
      <AppHeader title="Payment Methods" showBack showSettings={false} />

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {/* UPI Accounts Section */}
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#B3B3C2',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
              marginLeft: '4px',
            }}
          >
            Linked UPI Accounts
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Primary ICICI Bank Card */}
            <div
              onClick={() => navigateTo('BANK_ACCOUNTS')}
              className="interactive-tap"
              style={{
                backgroundColor: '#151524',
                borderRadius: '16px',
                padding: '16px 18px',
                color: '#FFFFFF',
                border: '1.5px solid #2C2C44',
                boxShadow: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#1A1A2E',
                    border: '1px solid #4D4D6B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7FE87F',
                  }}
                >
                  <Landmark size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>ICICI Bank Savings</div>
                  <div style={{ fontSize: '12px', color: '#B3B3C2', marginTop: '2px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                    •••• 3616
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#7FE87F',
                  color: '#000000',
                  fontSize: '10px',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  padding: '4px 9px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Star size={10} fill="#000000" color="#000000" /> PRIMARY
              </div>
            </div>

            {/* Yes Bank Card */}
            <div
              onClick={() => navigateTo('BANK_ACCOUNTS')}
              className="interactive-tap"
              style={{
                backgroundColor: '#2A2A3E',
                border: '1px solid #4D4D6B',
                borderRadius: '16px',
                padding: '16px 18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#1A1A2E',
                    border: '1px solid #4D4D6B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7FE87F',
                  }}
                >
                  <Landmark size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Yes Bank Savings</div>
                  <div style={{ fontSize: '12px', color: '#B3B3C2', marginTop: '2px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                    •••• 8821
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#3A3A52',
                  border: '1px solid #4D4D6B',
                  color: '#7FE87F',
                  fontSize: '10.5px',
                  fontWeight: 800,
                  padding: '4px 9px',
                  borderRadius: '12px',
                }}
              >
                ACTIVE
              </div>
            </div>
          </div>
        </div>

        {/* Credit & RuPay Cards Section */}
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#B3B3C2',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
              marginLeft: '4px',
            }}
          >
            Saved Credit & RuPay Cards
          </div>

          <div
            style={{
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#1A1A2E',
                  border: '1px solid #4D4D6B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7FE87F',
                }}
              >
                <CreditCard size={20} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>ICICI RuPay Credit Card</div>
                <div style={{ fontSize: '12px', color: '#B3B3C2', marginTop: '2px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                  •••• 9901 &bull; UPI Enabled
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wifi size={16} color="#808099" />
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  color: '#7FE87F',
                  backgroundColor: '#3A3A52',
                  border: '1px solid #4D4D6B',
                  padding: '3px 8px',
                  borderRadius: '10px',
                }}
              >
                LINKED
              </span>
            </div>
          </div>
        </div>

        {/* Add New Bank / Card Button */}
        <div style={{ marginTop: '8px' }}>
          <PrimaryButton onClick={() => navigateTo('BANK_ACCOUNTS')}>
            <Plus size={18} /> Add New Bank or Card
          </PrimaryButton>
        </div>

        {/* Security Footer */}
        <div style={{ marginTop: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldCheck size={13} color="#7FE87F" />
          <span style={{ fontSize: '11px', color: '#808099', fontWeight: 600 }}>
            Tokenized Card Payments &bull; RBI & NPCI Secured
          </span>
        </div>
      </div>
    </div>
  );
};
