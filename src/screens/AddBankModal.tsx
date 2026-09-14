import React, { useState } from 'react';
import { Landmark, Check } from 'lucide-react';
import { BottomSheet } from '../components/BottomSheet';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const AddBankModal: React.FC = () => {
  const { isAddBankModalOpen, setIsAddBankModalOpen, addBankAccount } = useApp();
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const availableBanks = [
    { name: 'State Bank of India', code: 'SBI' },
    { name: 'HDFC Bank', code: 'HDFC' },
    { name: 'ICICI Bank', code: 'ICICI' },
    { name: 'Axis Bank', code: 'AXIS' },
    { name: 'Kotak Mahindra Bank', code: 'KOTAK' },
    { name: 'Yes Bank', code: 'YES' },
  ];

  const handleAdd = async () => {
    setIsLoading(true);
    await addBankAccount(selectedBank);
    setIsLoading(false);
    setIsAddBankModalOpen(false);
  };

  return (
    <BottomSheet
      isOpen={isAddBankModalOpen}
      onClose={() => setIsAddBankModalOpen(false)}
      title="Link Bank Account"
    >
      <div style={{ marginBottom: '24px' }}>
        <div role="radiogroup" aria-label="Available Banks" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {availableBanks.map((bank) => {
            const isSelected = selectedBank === bank.name;
            return (
              <div
                key={bank.name}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => setSelectedBank(bank.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedBank(bank.name);
                  }
                }}
                className="interactive-tap"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 16px',
                  backgroundColor: isSelected ? '#33334D' : '#1A1A2E',
                  border: isSelected ? '1.5px solid #7FE87F' : '1px solid #4D4D6B',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#2A2A3E' : '#2A2A3E',
                      color: isSelected ? '#7FE87F' : '#B3B3C2',
                      border: `1px solid ${isSelected ? 'rgba(127, 232, 127, 0.4)' : '#4D4D6B'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '11px',
                    }}
                  >
                    <Landmark size={18} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
                    {bank.name}
                  </span>
                </div>

                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: isSelected ? 'none' : '1.5px solid #4D4D6B',
                    backgroundColor: isSelected ? '#7FE87F' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PrimaryButton onClick={handleAdd} disabled={isLoading}>
        {isLoading ? 'Verifying & Linking...' : `Link ${selectedBank}`}
      </PrimaryButton>
    </BottomSheet>
  );
};
