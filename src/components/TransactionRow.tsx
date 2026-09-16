import React from 'react';
import type { Transaction } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useApp } from '../state/AppContext';

interface TransactionRowProps {
  transaction: Transaction;
  onClick?: () => void;
  hideSubtitle?: boolean;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onClick,
  hideSubtitle = false,
}) => {
  const { language, t } = useApp();
  const isReceived = transaction.type === 'received';

  const defaultSub = isReceived ? 'Received via Sarie' : 'Paid via Sarie';
  const displayTitle = t(transaction.title, transaction.title);
  const displaySub = t(transaction.subTitle || defaultSub, transaction.subTitle || defaultSub);
  const displayDate = t(transaction.date, transaction.date);

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
      className={onClick ? 'interactive-tap' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        backgroundColor: 'var(--color-surface, #111726)',
        border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
        borderRadius: '16px',
        marginBottom: '10px',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: 'none',
        transition: 'all 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: isReceived ? 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))' : 'var(--color-surface-elevated, #182236)',
            border: 'none',
            color: isReceived ? 'var(--brand-green, #00D09C)' : '#FFFFFF',
            fontWeight: 800,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {transaction.avatarInitials || transaction.title.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '14px', color: '#FFFFFF', lineHeight: '18px' }}>
            {displayTitle}
          </div>
          {!hideSubtitle && (
            <div style={{ fontSize: '11.5px', color: '#9ca3af', marginTop: '2px' }}>
              {displaySub} &bull; {transaction.utr.substring(0, 10)}
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: language === 'العربية' ? 'left' : 'right' }}>
        <div
          className="tabular-nums"
          style={{
            fontWeight: 900,
            fontSize: '15px',
            color: isReceived ? 'var(--brand-green, #00D09C)' : '#FFFFFF',
          }}
        >
          {isReceived ? '+' : '-'}{formatCurrency(transaction.amount, language)}
        </div>
        <div style={{ fontSize: '10.5px', color: '#9ca3af', marginTop: '2px', fontWeight: 600 }}>
          {displayDate}
        </div>
      </div>
    </div>
  );
};
