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
    <div className="fade-in" style={{ fontFamily: designSystem.typography.fontFamily }}>
      <AppHeader title="Payment Methods" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: designSystem.colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}
        >
          Linked UPI & Bank Accounts
        </div>

        <ListRow
          icon={<Landmark size={18} />}
          label="ICICI Bank Savings"
          subLabel="**** 3616 • Primary Bank"
          rightElement={
            <span style={{ fontSize: '11px', color: designSystem.colors.primary, fontWeight: '700' }}>
              Active
            </span>
          }
          onClick={() => navigateTo('BANK_ACCOUNTS')}
        />
        <ListRow
          icon={<Landmark size={18} />}
          label="Yes Bank Savings"
          subLabel="**** 8821"
          rightElement={
            <span style={{ fontSize: '11px', color: designSystem.colors.textSecondary }}>Linked</span>
          }
          onClick={() => navigateTo('BANK_ACCOUNTS')}
        />

        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: designSystem.colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '24px 0 12px 0',
          }}
        >
          Saved Credit & Debit Cards
        </div>
        <ListRow
          icon={<CreditCard size={18} />}
          label="ICICI RuPay Credit Card"
          subLabel="**** 9901 • UPI Linked"
          rightElement={
            <span style={{ fontSize: '11px', color: designSystem.colors.textSecondary }}>Linked</span>
          }
        />

        <div style={{ marginTop: '30px' }}>
          <PrimaryButton onClick={() => navigateTo('BANK_ACCOUNTS')}>
            <Plus size={18} /> Add New Payment Method
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
