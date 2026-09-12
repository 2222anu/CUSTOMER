import React from 'react';
import { CreditCard, Landmark, Plus } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const PaymentMethodsScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Payment Methods" showBack showSettings={false} />

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px',
              marginLeft: '4px',
            }}
          >
            Linked UPI & Bank Accounts
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
            <ListRow
              icon={<Landmark size={18} color="#2e83ff" />}
              label="ICICI Bank Savings"
              subLabel="**** 3616 • Primary Bank"
              rightElement={
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', backgroundColor: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>
                  Active
                </span>
              }
              onClick={() => navigateTo('BANK_ACCOUNTS')}
            />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow
              icon={<Landmark size={18} color="#2e83ff" />}
              label="Yes Bank Savings"
              subLabel="**** 8821 • Secondary"
              rightElement={
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Linked</span>
              }
              onClick={() => navigateTo('BANK_ACCOUNTS')}
            />
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px',
              marginLeft: '4px',
            }}
          >
            Saved Credit & Debit Cards
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
            <ListRow
              icon={<CreditCard size={18} color="#2e83ff" />}
              label="ICICI RuPay Credit Card"
              subLabel="**** 9901 • UPI Linked"
              rightElement={
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Linked</span>
              }
            />
          </div>
        </div>

        <div style={{ marginTop: '10px' }}>
          <PrimaryButton onClick={() => navigateTo('BANK_ACCOUNTS')}>
            <Plus size={18} /> Add New Bank or Card
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
