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
    'ICICI Bank',
    'Yes Bank',
    'Kotak Mahindra Bank',
    'HDFC Bank',
    'SBI (State Bank of India)',
    'Axis Bank',
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
      title="Add Bank Account"
      themeMode="light"
    >
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#5C564D', fontSize: '13px', marginBottom: '16px' }}>
          Select your bank to link with your QTPay UPI ID:
        </p>

        {availableBanks.map((bankName) => {
          const isSelected = selectedBank === bankName;
          return (
            <div
              key={bankName}
              onClick={() => setSelectedBank(bankName)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: isSelected ? '#FDE8D7' : '#FFFFFF',
                border: isSelected ? '1.5px solid #F98513' : '1.5px solid #DAD1C8',
                borderRadius: '16px',
                marginBottom: '10px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Landmark size={20} color={isSelected ? '#F98513' : '#5C564D'} />
                <span style={{ fontWeight: '700', fontSize: '14px', color: '#111144' }}>
                  {bankName}
                </span>
              </div>
              {isSelected && <Check size={18} color="#F98513" />}
            </div>
          );
        })}
      </div>

      <PrimaryButton onClick={handleAdd} disabled={isLoading}>
        {isLoading ? 'Linking Account...' : `Link ${selectedBank}`}
      </PrimaryButton>
    </BottomSheet>
  );
};
