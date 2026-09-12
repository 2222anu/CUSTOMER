import React from 'react';
import type { Transaction } from '../types';
import { formatCurrency } from '../utils/formatters';

interface TransactionRowProps {
  transaction: Transaction;
  onClick?: () => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onClick,
}) => {
  const isReceived = transaction.type === 'received';

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
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        marginBottom: '10px',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: 'none',
        transition: 'border-color 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: isReceived ? '#ecfdf5' : '#eef5ff',
            border: `1px solid ${isReceived ? '#a7f3d0' : '#d6e6ff'}`,
            color: isReceived ? '#059669' : '#2e83ff',
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
          <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a', lineHeight: '18px' }}>
            {transaction.title}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
            {transaction.subTitle || (isReceived ? 'Received via UPI' : 'Paid via UPI')} &bull; {transaction.utr.substring(0, 10)}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div
          className="tabular-nums"
          style={{
            fontWeight: 900,
            fontSize: '15px',
            color: isReceived ? '#059669' : '#0f172a',
          }}
        >
          {isReceived ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
        <div style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
          {transaction.date}
        </div>
      </div>
    </div>
  );
};
