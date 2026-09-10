import React from 'react';
import { Eye, EyeOff, Send, Download, Settings2, CreditCard } from 'lucide-react';
import type { BankAccount } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useApp } from '../state/AppContext';

interface BankCardProps {
  bank: BankAccount;
  onSendClick?: () => void;
  onRequestClick?: () => void;
  onManageClick?: () => void;
}

export const BankCard: React.FC<BankCardProps> = ({
  bank,
  onSendClick,
  onRequestClick,
  onManageClick,
}) => {
  const { toggleShowBalance, navigateTo } = useApp();

  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '24px',
        padding: '20px',
        margin: '16px 20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'rgba(158, 240, 26, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--neon-primary)',
            }}
          >
            <CreditCard size={22} />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '16px' }}>{bank.bankName}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {bank.accountType} &bull; {bank.accountNumberMasked}
            </div>
          </div>
        </div>

        {bank.isPrimary && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: 'rgba(158, 240, 26, 0.15)',
              color: 'var(--neon-primary)',
              padding: '4px 10px',
              borderRadius: '20px',
              border: '1px solid rgba(158, 240, 26, 0.3)',
            }}
          >
            Primary
          </span>
        )}
      </div>

      <div
        style={{
          backgroundColor: 'rgba(7, 25, 19, 0.6)',
          borderRadius: '16px',
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Available Balance
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '2px', color: 'var(--text-primary)' }}>
            {bank.showBalance ? formatCurrency(bank.balance) : '••••••••'}
          </div>
        </div>

        <button
          onClick={() => toggleShowBalance(bank.id)}
          style={{
            backgroundColor: 'var(--neon-primary)',
            color: 'var(--text-dark)',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {bank.showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
          {bank.showBalance ? 'Hide' : 'Check Balance'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={onSendClick || (() => navigateTo('PAY_ANYONE'))}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '10px',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <Send size={14} color="var(--neon-primary)" />
          Send
        </button>

        <button
          onClick={onRequestClick || (() => navigateTo('REQUEST_MONEY'))}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '10px',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <Download size={14} color="var(--neon-primary)" />
          Request
        </button>

        <button
          onClick={onManageClick || (() => navigateTo('BANK_ACCOUNTS'))}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '10px',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <Settings2 size={14} color="var(--text-secondary)" />
          Manage
        </button>
      </div>
    </div>
  );
};
