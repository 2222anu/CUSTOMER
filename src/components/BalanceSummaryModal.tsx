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
        backgroundColor: 'rgba(15, 15, 26, 0.75)',
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
          backgroundColor: '#151524',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          borderTop: '1px solid #2C2C44',
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
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#2C2C44' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} color="#7FE87F" />
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
              Sarie Balance Verified
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: '#1E1E32',
              border: '1px solid #2C2C44',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#A2A2BA',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Total Balance Card */}
        <div
          style={{
            backgroundColor: '#1E1E32',
            border: '1px solid #2C2C44',
            borderRadius: '14px',
            padding: '16px',
            color: '#FFFFFF',
            marginBottom: '16px',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#A2A2BA', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Total Available Balance
          </div>
          <div style={{ fontSize: '26px', fontWeight: 900, marginTop: '4px', letterSpacing: '0.01em', color: '#7FE87F' }}>
            {formatCurrency(totalBalance)}
          </div>
          <div style={{ fontSize: '11px', color: '#6E6E85', marginTop: '4px' }}>
            Across {bankAccounts.length} Linked Bank Accounts
          </div>
        </div>

        {/* Breakdown by Bank */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', marginBottom: '8px' }}>
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
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(127, 232, 127, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7FE87F',
                      border: '1px solid rgba(127, 232, 127, 0.3)',
                    }}
                  >
                    <Landmark size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                      {bank.bankName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A2A2BA' }}>
                      {bank.accountType} • {bank.accountNumberMasked}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                    {formatCurrency(bank.balance)}
                  </div>
                  {bank.isPrimary && (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#7FE87F' }}>
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
              backgroundColor: '#1E1E32',
              border: '1px solid #2C2C44',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '13px',
              fontWeight: 800,
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            Manage Accounts <ArrowRight size={14} color="#7FE87F" />
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              backgroundColor: '#7FE87F',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '13px',
              fontWeight: 800,
              color: '#000000',
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
