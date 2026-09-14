import React, { useState } from 'react';
import {
  Landmark,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { Modal } from '../components/Modal';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';

// Contactless NFC Waves Icon
const ContactlessIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#ffffff', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(90deg)', flexShrink: 0 }}>
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <circle cx="12" cy="20" r="1" fill={color} />
  </svg>
);

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
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '36px' }}>
      <AppHeader title="Bank Accounts" showBack showSettings />

      <div style={{ padding: '16px 20px' }}>
        {/* Top Summary Banner */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            borderRadius: '16px',
            border: '1px solid #4D4D6B',
            padding: '16px 18px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                border: '1px solid #4D4D6B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Landmark size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
                  Linked UPI Accounts
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#7FE87F',
                    backgroundColor: 'rgba(127, 232, 127, 0.15)',
                    border: '1px solid #7FE87F',
                    padding: '2px 7px',
                    borderRadius: '10px',
                  }}
                >
                  {bankAccounts.length} Active
                </span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#B3B3C2', fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={13} color="#7FE87F" />
                <span>NPCI / BHIM UPI Secured</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAddBankModalOpen(true)}
            className="interactive-tap"
            style={{
              backgroundColor: '#7FE87F',
              color: '#000000',
              border: 'none',
              borderRadius: '12px',
              padding: '9px 14px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Plus size={15} color="#000000" /> Add Bank
          </button>
        </div>

        {/* Bank Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
          {bankAccounts.map((bank) => {
            const rawNumbers = bank.accountNumberMasked.replace(/[^0-9]/g, '') || '3616';

            // PRIMARY BANK CARD MODEL
            if (bank.isPrimary) {
              return (
                <div
                  key={bank.id}
                  style={{
                    backgroundColor: '#2A2A3E',
                    borderRadius: '20px',
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1.5px solid #7FE87F',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.4)',
                    color: '#FFFFFF',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Card Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: '#3A3A52',
                          border: '1px solid #4D4D6B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Landmark size={20} color="#7FE87F" />
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '0.01em', color: '#FFFFFF' }}>
                          {bank.bankName}
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: '#B3B3C2', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '1px' }}>
                          {bank.accountType}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: 'rgba(127, 232, 127, 0.15)',
                        border: '1px solid #7FE87F',
                        color: '#7FE87F',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Star size={11} fill="#7FE87F" color="#7FE87F" /> PRIMARY
                    </div>
                  </div>

                  {/* EMV Chip & Account Number Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '18px 0 20px 0', position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '24px',
                          borderRadius: '4px',
                          backgroundColor: '#7FE87F',
                        }}
                      />
                      <ContactlessIcon color="#7FE87F" size={18} />
                    </div>

                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '16px',
                        letterSpacing: '0.12em',
                        fontWeight: 700,
                        color: '#FFFFFF',
                      }}
                    >
                      •••• &nbsp; •••• &nbsp; •••• &nbsp; {rawNumbers}
                    </div>
                  </div>

                  {/* Integrated Balance Container */}
                  <div
                    style={{
                      backgroundColor: '#1A1A2E',
                      border: '1px solid #4D4D6B',
                      borderRadius: '14px',
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B3B3C2' }}>
                        Available Balance
                      </div>
                      <div className="tabular-nums" style={{ fontSize: '19px', fontWeight: 900, color: '#7FE87F', marginTop: '2px', letterSpacing: '0.02em' }}>
                        {bank.showBalance ? formatCurrency(bank.balance) : '₹ ••••••••'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBalanceCheck(bank)}
                      className="interactive-tap"
                      style={{
                        backgroundColor: '#7FE87F',
                        border: 'none',
                        color: '#000000',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      {bank.showBalance ? <EyeOff size={13} color="#000000" /> : <Eye size={13} color="#000000" />}
                      <span>{bank.showBalance ? 'Hide' : 'Check'}</span>
                    </button>
                  </div>

                  {/* Action Strip */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#7FE87F' }}>
                      <CheckCircle2 size={15} color="#7FE87F" />
                      <span>Default for receiving money</span>
                    </div>

                    <button
                      onClick={() => setBankToRemove(bank.id)}
                      className="interactive-tap"
                      style={{
                        backgroundColor: '#3A3A52',
                        border: '1px solid #4D4D6B',
                        color: '#B3B3C2',
                        padding: '7px 12px',
                        borderRadius: '10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} color="#B3B3C2" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              );
            }

            // SECONDARY BANK CARD MODEL
            return (
              <div
                key={bank.id}
                style={{
                  backgroundColor: '#2A2A3E',
                  border: '1px solid #4D4D6B',
                  borderRadius: '20px',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: '#3A3A52',
                        border: '1px solid #4D4D6B',
                        color: '#7FE87F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Landmark size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '15.5px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.01em' }}>
                        {bank.bankName}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#B3B3C2', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '1px' }}>
                        {bank.accountType}
                      </div>
                    </div>
                  </div>

                  <ContactlessIcon color="#808099" size={18} />
                </div>

                {/* EMV Chip & Account Number Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 18px 0' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '24px',
                      borderRadius: '4px',
                      backgroundColor: '#4D4D6B',
                    }}
                  />

                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '15px',
                      letterSpacing: '0.1em',
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    •••• &nbsp; •••• &nbsp; •••• &nbsp; {rawNumbers}
                  </div>
                </div>

                {/* Integrated Balance Container */}
                <div
                  style={{
                    backgroundColor: '#3A3A52',
                    border: '1px solid #4D4D6B',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B3B3C2' }}>
                      Available Balance
                    </div>
                    <div className="tabular-nums" style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', marginTop: '2px', letterSpacing: '0.01em' }}>
                      {bank.showBalance ? formatCurrency(bank.balance) : '₹ ••••••••'}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBalanceCheck(bank)}
                    className="interactive-tap"
                    style={{
                      backgroundColor: '#2A2A3E',
                      border: '1px solid #4D4D6B',
                      color: '#7FE87F',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    {bank.showBalance ? <EyeOff size={13} color="#B3B3C2" /> : <Eye size={13} color="#7FE87F" />}
                    <span>{bank.showBalance ? 'Hide' : 'Check'}</span>
                  </button>
                </div>

                {/* Action Strip */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    onClick={() => setPrimaryBank(bank.id)}
                    className="interactive-tap"
                    style={{
                      flex: 1,
                      backgroundColor: '#3A3A52',
                      border: '1px solid #7FE87F',
                      color: '#7FE87F',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Star size={13} color="#7FE87F" /> Set as Primary
                  </button>

                  <button
                    onClick={() => setBankToRemove(bank.id)}
                    className="interactive-tap"
                    style={{
                      backgroundColor: '#3A3A52',
                      border: '1px solid #4D4D6B',
                      color: '#B3B3C2',
                      padding: '9px 14px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={13} color="#B3B3C2" />
                    <span>Remove</span>
                  </button>
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
        <div style={{ marginTop: '22px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={13} color="#808099" />
          <span style={{ fontSize: '11px', color: '#808099', fontWeight: 600 }}>
            256-Bit Hardware Encrypted &bull; NPCI Regulated
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
            <p style={{ color: '#B3B3C2', fontSize: '14px', marginBottom: '20px', lineHeight: '20px' }}>
              Are you sure you want to unlink this bank account from alph pay?
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setBankToRemove(null)}
                className="interactive-tap"
                style={{
                  flex: 1,
                  backgroundColor: '#3A3A52',
                  border: '1px solid #4D4D6B',
                  borderRadius: '10px',
                  padding: '12px',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="interactive-tap"
                style={{
                  flex: 1,
                  backgroundColor: '#FF4757',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px',
                  color: '#FFFFFF',
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
