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
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '24px' }}>
      <AppHeader title="Bank Accounts" showBack showSettings />

      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          {bankAccounts.map((bank) => (
            <div
              key={bank.id}
              style={{
                backgroundColor: '#ffffff',
                border: bank.isPrimary ? '2px solid #2e83ff' : '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '18px',
                marginBottom: '14px',
                boxShadow: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#eef5ff',
                      color: '#2e83ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #d6e6ff',
                    }}
                  >
                    <Landmark size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>{bank.bankName}</div>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
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
                      backgroundColor: '#eef5ff',
                      color: '#2e83ff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #2e83ff',
                    }}
                  >
                    Primary
                  </span>
                )}
              </div>

              {/* Balance Bar */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700' }}>Account Balance</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', marginTop: '2px', color: '#0f172a' }}>
                    {bank.showBalance ? formatCurrency(bank.balance) : '••••••••'}
                  </div>
                </div>

                <button
                  onClick={() => toggleShowBalance(bank.id)}
                  aria-label={bank.showBalance ? "Hide bank balance" : "Show bank balance"}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#2e83ff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    boxShadow: 'none',
                  }}
                >
                  {bank.showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                  {bank.showBalance ? 'Hide' : 'Check'}
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {!bank.isPrimary && (
                  <button
                    onClick={() => setPrimaryBank(bank.id)}
                    style={{
                      flex: 1,
                      backgroundColor: '#ffffff',
                      border: '1px solid #2e83ff',
                      color: '#2e83ff',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: 'none',
                    }}
                  >
                    Set Primary
                  </button>
                )}
                <button
                  onClick={() => setBankToRemove(bank.id)}
                  aria-label={`Remove ${bank.bankName} account`}
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    boxShadow: 'none',
                  }}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <PrimaryButton onClick={() => setIsAddBankModalOpen(true)}>
          <Plus size={18} /> Add New Bank Account
        </PrimaryButton>
      </div>

      {/* Delete Confirmation Modal */}
      {bankToRemove && (
        <Modal
          isOpen={Boolean(bankToRemove)}
          onClose={() => setBankToRemove(null)}
          title="Remove Bank Account"
        >
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ color: '#475569', fontSize: '14px', marginBottom: '20px' }}>
              Are you sure you want to unlink this bank account from QTPay?
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setBankToRemove(null)}
                style={{
                  flex: 1,
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '12px',
                  color: '#475569',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                style={{
                  flex: 1,
                  backgroundColor: '#dc2626',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px',
                  color: '#ffffff',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
              >
                Unlink Account
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
