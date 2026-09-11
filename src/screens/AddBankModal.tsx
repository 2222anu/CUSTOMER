import React, { useState } from 'react';
import { Landmark, Check } from 'lucide-react';
import { BottomSheet } from '../components/BottomSheet';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

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
      <div style={{ marginBottom: designSystem.spacing['2xl'] }}>
        <p style={{ color: designSystem.colors.textSecondary, fontSize: '13px', marginBottom: designSystem.spacing.lg }}>
          Select your bank to link with your QTPay UPI ID:
        </p>

        <div role="radiogroup" aria-label="Available Banks">
          {availableBanks.map((bankName) => {
            const isSelected = selectedBank === bankName;
            return (
              <div
                key={bankName}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => setSelectedBank(bankName)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedBank(bankName);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  backgroundColor: isSelected ? designSystem.colors.primaryLight : designSystem.colors.surface,
                  border: isSelected ? `2px solid ${designSystem.colors.primary}` : `1px solid ${designSystem.colors.borderHairline}`,
                  borderRadius: designSystem.radii.md,
                  marginBottom: designSystem.spacing.sm,
                  cursor: 'pointer',
                  boxShadow: designSystem.shadows.none,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing.md }}>
                  <Landmark size={20} color={isSelected ? designSystem.colors.primary : designSystem.colors.textSecondary} />
                  <span style={{ fontWeight: designSystem.typography.weights.bold, fontSize: '14px', color: designSystem.colors.textPrimary }}>
                    {bankName}
                  </span>
                </div>
                {isSelected && <Check size={18} color={designSystem.colors.primary} />}
              </div>
            );
          })}
        </div>
      </div>

      <PrimaryButton onClick={handleAdd} disabled={isLoading}>
        {isLoading ? 'Linking Account...' : `Link ${selectedBank}`}
      </PrimaryButton>
    </BottomSheet>
  );
};
