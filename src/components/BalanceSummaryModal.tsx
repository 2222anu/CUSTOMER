import React from 'react';
import { CheckCircle2, X, Landmark, ArrowRight } from 'lucide-react';
import type { BankAccount } from '../types';
import { formatCurrency } from '../utils/formatters';

interface BalanceSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankAccounts: BankAccount[];
  totalBalance: number;
  onManageAccounts: () => void;
}

export const BalanceSummaryModal: React.FC<BalanceSummaryModalProps> = ({
  isOpen,
  onClose,
  bankAccounts,
  totalBalance,
  onManageAccounts,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '24px 20px',
          boxSizing: 'border-box',
          animation: 'slideUpSheet 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideUpSheet {
            0% { transform: translateY(100%); }
            100% { transform: translateY(0); }
          }
        `}</style>

        {/* Sheet Handle & Header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#e2e8f0' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} color="#10b981" />
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
              UPI Balance Verified
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Total Balance Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #2e83ff 0%, #1e40af 100%)',
            borderRadius: '12px',
            padding: '16px',
            color: '#ffffff',
            marginBottom: '16px',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Total Available Balance
          </div>
          <div style={{ fontSize: '26px', fontWeight: 900, marginTop: '4px', letterSpacing: '0.01em' }}>
            {formatCurrency(totalBalance)}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)', marginTop: '4px' }}>
            Across {bankAccounts.length} Linked Bank Accounts
          </div>
        </div>

        {/* Breakdown by Bank */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
            Bank Accounts Breakdown
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bankAccounts.map((bank) => (
              <div
                key={bank.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#eef5ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2e83ff',
                    }}
                  >
                    <Landmark size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                      {bank.bankName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {bank.accountType} • {bank.accountNumberMasked}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                    {formatCurrency(bank.balance)}
                  </div>
                  {bank.isPrimary && (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#2e83ff' }}>
                      PRIMARY
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              onClose();
              onManageAccounts();
            }}
            style={{
              flex: 1,
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '13px',
              fontWeight: 800,
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            Manage Accounts <ArrowRight size={14} />
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              backgroundColor: '#2e83ff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '13px',
              fontWeight: 800,
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
