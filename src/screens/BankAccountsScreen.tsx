import React, { useState } from 'react';
import {
  Landmark,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ShieldCheck,
  Star,
  CheckCircle2,
  Wifi,
  Lock,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { Modal } from '../components/Modal';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';

const getBankBrandInfo = (bankName: string) => {
  const nameUpper = bankName.toUpperCase();
  if (nameUpper.includes('ICICI')) {
    return {
      accentColor: '#1a56db',
      badgeBg: '#eef5ff',
      badgeBorder: '#d6e6ff',
      tagText: 'ICICI BANK',
      cardTheme: 'linear-gradient(135deg, #0a2540 0%, #153e75 50%, #1a56db 100%)',
    };
  }
  if (nameUpper.includes('YES')) {
    return {
      accentColor: '#1d4ed8',
      badgeBg: '#eff6ff',
      badgeBorder: '#bfdbfe',
      tagText: 'YES BANK',
      cardTheme: 'linear-gradient(135deg, #0b192c 0%, #172554 50%, #1d4ed8 100%)',
    };
  }
  if (nameUpper.includes('KOTAK')) {
    return {
      accentColor: '#dc2626',
      badgeBg: '#fef2f2',
      badgeBorder: '#fecaca',
      tagText: 'KOTAK MAHINDRA',
      cardTheme: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #7f1d1d 100%)',
    };
  }
  if (nameUpper.includes('HDFC')) {
    return {
      accentColor: '#0052cc',
      badgeBg: '#eef5ff',
      badgeBorder: '#d6e6ff',
      tagText: 'HDFC BANK',
      cardTheme: 'linear-gradient(135deg, #001f3f 0%, #003366 50%, #0284c7 100%)',
    };
  }
  if (nameUpper.includes('SBI') || nameUpper.includes('STATE')) {
    return {
      accentColor: '#0284c7',
      badgeBg: '#f0f9ff',
      badgeBorder: '#bae6fd',
      tagText: 'SBI BANK',
      cardTheme: 'linear-gradient(135deg, #072a40 0%, #0369a1 50%, #0284c7 100%)',
    };
  }
  return {
    accentColor: '#2563eb',
    badgeBg: '#eef5ff',
    badgeBorder: '#d6e6ff',
    tagText: bankName.toUpperCase(),
    cardTheme: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)',
  };
};

export const BankAccountsScreen: React.FC = () => {
  const { bankAccounts, toggleShowBalance, setPrimaryBank, removeBankAccount, setIsAddBankModalOpen, openPinModal } = useApp();
  const [bankToRemove, setBankToRemove] = useState<string | null>(null);

  const confirmRemove = () => {
    if (bankToRemove) {
      removeBankAccount(bankToRemove);
      setBankToRemove(null);
    }
  };

  const handleBalanceCheck = (bank: typeof bankAccounts[0]) => {
    if (bank.showBalance) {
      toggleShowBalance(bank.id);
    } else {
      openPinModal({
        title: `Check ${bank.bankName} Balance`,
        subTitle: `${bank.accountType} • ${bank.accountNumberMasked}`,
        amount: bank.balance,
        onSuccess: () => toggleShowBalance(bank.id),
      });
    }
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '32px' }}>
      <AppHeader title="Bank Accounts" showBack showSettings />

      <div style={{ padding: '16px 20px' }}>
        {/* Top Overview & Trust Summary Bar */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '14px 16px',
            marginBottom: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Linked UPI Accounts</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: '#eef5ff',
                  color: '#2e83ff',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  border: '1px solid #d6e6ff',
                }}
              >
                {bankAccounts.length} Active
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>NPCI / BHIM UPI Secured</span>
            </div>
          </div>

          <button
            onClick={() => setIsAddBankModalOpen(true)}
            style={{
              backgroundColor: '#eef5ff',
              color: '#2e83ff',
              border: '1px solid #d6e6ff',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Plus size={15} /> Add Bank
          </button>
        </div>

        {/* Bank Account Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {bankAccounts.map((bank) => {
            const brand = getBankBrandInfo(bank.bankName);
            const rawNumbers = bank.accountNumberMasked.replace(/[^0-9]/g, '') || '3616';

            return (
              <div
                key={bank.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: bank.isPrimary ? '2px solid #2e83ff' : '1px solid #e2e8f0',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Visual Top Decorative Accent Bar */}
                <div
                  style={{
                    height: '4px',
                    width: '100%',
                    background: bank.isPrimary
                      ? 'linear-gradient(90deg, #2e83ff 0%, #38bdf8 100%)'
                      : brand.cardTheme,
                  }}
                />

                <div style={{ padding: '18px' }}>
                  {/* Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          backgroundColor: brand.badgeBg,
                          color: brand.accentColor,
                          border: `1px solid ${brand.badgeBorder}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Landmark size={22} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a', letterSpacing: '0.01em' }}>
                          {bank.bankName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 600 }}>{bank.accountType}</span>
                          <span>&bull;</span>
                          <span style={{ fontFamily: 'monospace', letterSpacing: '0.05em', fontWeight: 700, color: '#334155' }}>
                            •••• {rawNumbers}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {bank.isPrimary ? (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            backgroundColor: '#eef5ff',
                            color: '#2e83ff',
                            padding: '3px 9px',
                            borderRadius: '10px',
                            border: '1px solid #d6e6ff',
                            letterSpacing: '0.04em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          <Star size={11} fill="#2e83ff" /> PRIMARY
                        </span>
                      ) : (
                        <Wifi size={16} color="#94a3b8" />
                      )}
                    </div>
                  </div>

                  {/* Modern Balance Row */}
                  <div
                    style={{
                      backgroundColor: bank.isPrimary ? '#f8fafc' : '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Available Balance
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 900, marginTop: '2px', color: '#0f172a', letterSpacing: '0.01em' }}>
                        {bank.showBalance ? formatCurrency(bank.balance) : '₹ ••••••••'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBalanceCheck(bank)}
                      aria-label={bank.showBalance ? "Hide balance" : "Check balance"}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        padding: '7px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        boxShadow: 'none',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      {bank.showBalance ? <EyeOff size={14} color="#64748b" /> : <Eye size={14} color="#2e83ff" />}
                      <span>{bank.showBalance ? 'Hide' : 'Check'}</span>
                    </button>
                  </div>

                  {/* Action Buttons Footer */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {bank.isPrimary ? (
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          color: '#10b981',
                          fontWeight: 700,
                        }}
                      >
                        <CheckCircle2 size={16} />
                        <span>Default for receiving money</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setPrimaryBank(bank.id)}
                        style={{
                          flex: 1,
                          backgroundColor: '#ffffff',
                          border: '1px solid #2e83ff',
                          color: '#2e83ff',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <Star size={13} /> Set as Primary
                      </button>
                    )}

                    <button
                      onClick={() => setBankToRemove(bank.id)}
                      aria-label={`Remove ${bank.bankName} account`}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '9px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Bank Account Action */}
        <PrimaryButton onClick={() => setIsAddBankModalOpen(true)}>
          <Plus size={18} /> Add New Bank Account
        </PrimaryButton>

        {/* Security & NPCI Trust Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={13} color="#94a3b8" />
          <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>
            Secured by NPCI 256-bit bank grade encryption
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {bankToRemove && (
        <Modal
          isOpen={Boolean(bankToRemove)}
          onClose={() => setBankToRemove(null)}
          title="Remove Bank Account"
        >
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ color: '#475569', fontSize: '14px', marginBottom: '20px', lineHeight: '20px' }}>
              Are you sure you want to unlink this bank account from QTPay?
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setBankToRemove(null)}
                style={{
                  flex: 1,
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#475569',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
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
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer',
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
