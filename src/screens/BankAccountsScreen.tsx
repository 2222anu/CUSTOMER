import React, { useState } from 'react';
import { Landmark, Plus, Trash2, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { Modal } from '../components/Modal';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';

export const BankAccountsScreen: React.FC = () => {
  const { bankAccounts, toggleShowBalance, setPrimaryBank, removeBankAccount, setIsAddBankModalOpen } = useApp();
  const [bankToRemove, setBankToRemove] = useState<string | null>(null);

  const confirmRemove = () => {
    if (bankToRemove) {
      removeBankAccount(bankToRemove);
      setBankToRemove(null);
    }
  };

  return (
    <div className="fade-in">
      <AppHeader title="Bank Accounts" showBack showSettings />

      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          {bankAccounts.map((bank) => (
            <div
              key={bank.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: bank.isPrimary ? '1px solid var(--neon-primary)' : '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '16px',
                boxShadow: bank.isPrimary ? '0 6px 20px rgba(158, 240, 26, 0.2)' : '0 4px 15px rgba(7, 25, 19, 0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(158, 240, 26, 0.18)',
                      color: '#071913',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Landmark size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-primary)' }}>{bank.bankName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {bank.accountType} &bull; {bank.accountNumberMasked}
                    </div>
                  </div>
                </div>

                {bank.isPrimary && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      backgroundColor: 'var(--neon-primary)',
                      color: 'var(--text-dark)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                    }}
                  >
                    Primary
                  </span>
                )}
              </div>

              {/* Balance Bar */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Account Balance</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', marginTop: '2px', color: 'var(--text-primary)' }}>
                    {bank.showBalance ? formatCurrency(bank.balance) : '••••••••'}
                  </div>
                </div>

                <button
                  onClick={() => toggleShowBalance(bank.id)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--card-border)',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {bank.showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
                  {bank.showBalance ? 'Hide' : 'Check Balance'}
                </button>
              </div>

              {/* Account Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--card-border)', paddingTop: '12px' }}>
                {!bank.isPrimary && (
                  <button
                    onClick={() => setPrimaryBank(bank.id)}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(158, 240, 26, 0.2)',
                      border: '1px solid var(--neon-primary)',
                      color: '#071913',
                      borderRadius: '10px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle size={14} /> Set as Primary
                  </button>
                )}

                <button
                  onClick={() => setBankToRemove(bank.id)}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#EF4444',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <PrimaryButton onClick={() => setIsAddBankModalOpen(true)}>
          <Plus size={18} /> Add Bank Account
        </PrimaryButton>
      </div>

      {/* Remove Confirmation Modal */}
      <Modal isOpen={!!bankToRemove} onClose={() => setBankToRemove(null)} title="Remove Bank Account">
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
          Are you sure you want to remove this bank account from QTPay? You can link it again anytime.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setBankToRemove(null)}
            style={{
              flex: 1,
              backgroundColor: 'var(--bg-secondary)',
              border: 'none',
              borderRadius: '14px',
              padding: '14px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={confirmRemove}
            style={{
              flex: 1,
              backgroundColor: '#EF4444',
              border: 'none',
              borderRadius: '14px',
              padding: '14px',
              color: '#FFFFFF',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Remove Bank
          </button>
        </div>
      </Modal>
    </div>
  );
};
