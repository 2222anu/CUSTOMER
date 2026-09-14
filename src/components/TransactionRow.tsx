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
        backgroundColor: '#2A2A3E',
        border: '1px solid #4D4D6B',
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
            backgroundColor: isReceived ? 'rgba(127, 232, 127, 0.12)' : '#3A3A52',
            border: `1px solid ${isReceived ? '#7FE87F' : '#4D4D6B'}`,
            color: isReceived ? '#7FE87F' : '#FFFFFF',
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
            {transaction.title}
          </div>
          <div style={{ fontSize: '11.5px', color: '#B3B3C2', marginTop: '2px' }}>
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
            color: isReceived ? '#7FE87F' : '#FFFFFF',
          }}
        >
          {isReceived ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
        <div style={{ fontSize: '10.5px', color: '#808099', marginTop: '2px', fontWeight: 600 }}>
          {transaction.date}
        </div>
      </div>
    </div>
  );
};
