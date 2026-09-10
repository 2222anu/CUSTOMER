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
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(37, 39, 44, 0.12)',
        borderRadius: '16px',
        marginBottom: '8px',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0 2px 10px rgba(37, 39, 44, 0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: isReceived ? '#B8F7E4' : 'rgba(37, 39, 44, 0.06)',
            border: isReceived ? '1px solid rgba(184, 247, 228, 0.6)' : '1px solid rgba(37, 39, 44, 0.12)',
            color: '#25272C',
            fontWeight: '700',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {transaction.avatarInitials || transaction.title.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '14px', color: '#25272C' }}>
            {transaction.title}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(37, 39, 44, 0.65)', marginTop: '2px' }}>
            {transaction.subTitle || (isReceived ? 'Received' : 'Paid')} &bull; {transaction.utr.substring(0, 10)}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontWeight: '700',
            fontSize: '15px',
            color: '#25272C',
          }}
        >
          {isReceived ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(37, 39, 44, 0.65)', marginTop: '2px' }}>
          {transaction.date}
        </div>
      </div>
    </div>
  );
};
