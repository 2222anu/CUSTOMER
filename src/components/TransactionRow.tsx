import React from 'react';
import type { Transaction } from '../types';
import { formatCurrency } from '../utils/formatters';
import { designSystem } from '../design-system';

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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        backgroundColor: designSystem.colors.surface,
        border: `1px solid ${designSystem.colors.borderHairline}`,
        borderRadius: designSystem.radii.md,
        marginBottom: designSystem.spacing.sm,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: designSystem.shadows.none,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing.md }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: designSystem.radii.full,
            backgroundColor: isReceived ? designSystem.colors.successLight : designSystem.colors.primaryLight,
            border: `1px solid ${isReceived ? '#a7f3d0' : designSystem.colors.primaryBorder}`,
            color: isReceived ? designSystem.colors.successText : designSystem.colors.primary,
            fontWeight: designSystem.typography.weights.extrabold,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {transaction.avatarInitials || transaction.title.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: designSystem.typography.weights.bold, fontSize: '14px', color: designSystem.colors.textPrimary }}>
            {transaction.title}
          </div>
          <div style={{ fontSize: '11px', color: designSystem.colors.textSecondary, marginTop: '2px' }}>
            {transaction.subTitle || (isReceived ? 'Received' : 'Paid')} &bull; {transaction.utr.substring(0, 10)}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontWeight: designSystem.typography.weights.extrabold,
            fontSize: '15px',
            color: isReceived ? designSystem.colors.successText : designSystem.colors.textPrimary,
          }}
        >
          {isReceived ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
        <div style={{ fontSize: '10px', color: designSystem.colors.textMuted, marginTop: '2px' }}>
          {transaction.date}
        </div>
      </div>
    </div>
  );
};
