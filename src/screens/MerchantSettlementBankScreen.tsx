import React, { useState } from 'react';
import { Landmark, Check, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { SamaLogo } from '../components/SamaLogo';

const SAUDI_SETTLEMENT_BANKS = [
  {
    name: 'Al Rajhi Bank',
    arabicName: 'مصرف الراجحي',
    iban: 'SA55 8000 0000 6271 5005',
    code: '03',
  },
  {
    name: 'Saudi National Bank (SNB)',
    arabicName: 'البنك الأهلي السعودي',
    iban: 'SA12 1000 0000 1903 4004',
    code: '10',
  },
  {
    name: 'Riyad Bank',
    arabicName: 'بنك الرياض',
    iban: 'SA03 2000 0000 9397 1001',
    code: '20',
  },
  {
    name: 'Alinma Bank',
    arabicName: 'مصرف الإنماء',
    iban: 'SA84 0500 0000 4102 2002',
    code: '05',
  },
  {
    name: 'Saudi Awwal Bank (SAB)',
    arabicName: 'البنك السعودي الأول',
    iban: 'SA44 5000 0000 8821 3003',
    code: '45',
  },
];

export const MerchantSettlementBankScreen: React.FC = () => {
  const { merchantInfo, updateMerchantInfo, navigateTo } = useApp();
  const [selectedBank, setSelectedBank] = useState(merchantInfo.settlementBank || 'Al Rajhi Bank');
  const [selectedIban, setSelectedIban] = useState(merchantInfo.settlementIban || 'SA55 8000 0000 6271 5005');

  const handleSelectBank = (bank: typeof SAUDI_SETTLEMENT_BANKS[0]) => {
    setSelectedBank(bank.name);
    setSelectedIban(bank.iban);
  };

  const handleContinue = () => {
    updateMerchantInfo({
      settlementBank: selectedBank,
      settlementIban: selectedIban,
    });
    navigateTo('MERCHANT_PIN_SETUP');
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 24px 30px 24px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '18px',
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
          }}
        >
          <Landmark size={30} color="#7FE87F" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0', color: '#FFFFFF' }}>
          Settlement Bank Account
        </h2>
        <p style={{ fontSize: '13px', color: '#A2A2BA', margin: 0 }}>
          Choose your corporate Saudi bank for daily automated Sarie payouts
        </p>
      </div>

      {/* Bank Options List */}
      <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {SAUDI_SETTLEMENT_BANKS.map((bank) => {
          const isSelected = selectedBank === bank.name;
          return (
            <div
              key={bank.name}
              onClick={() => handleSelectBank(bank)}
              className="interactive-tap"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: '#151524',
                border: isSelected ? '1.5px solid #7FE87F' : '1px solid #2C2C44',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? 'rgba(127, 232, 127, 0.15)' : '#1E1E32',
                    border: isSelected ? '1px solid #7FE87F' : '1px solid #2C2C44',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? '#7FE87F' : '#FFFFFF',
                  }}
                >
                  <Landmark size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                    {bank.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#A2A2BA', fontFamily: 'monospace', letterSpacing: '0.04em', marginTop: '2px' }}>
                    {bank.iban}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? '#7FE87F' : '#1E1E32',
                  border: isSelected ? 'none' : '1.5px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isSelected && <Check size={14} color="#000000" strokeWidth={3} />}
              </div>
            </div>
          );
        })}

        {/* Daily Settlement Information Banner */}
        <div
          style={{
            backgroundColor: 'rgba(127, 232, 127, 0.06)',
            border: '1px solid rgba(127, 232, 127, 0.2)',
            borderRadius: '14px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '6px',
          }}
        >
          <Clock size={18} color="#7FE87F" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '11.5px', color: '#A2A2BA', lineHeight: 1.4 }}>
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Daily 12:00 AM Settlement:</span> All card and QR collections are credited directly to this IBAN with zero processing delay.
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '12px' }}>
          <PrimaryButton onClick={handleContinue}>
            Set Security PIN <ArrowRight size={18} />
          </PrimaryButton>
        </div>
      </div>

      {/* SAMA Dock */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          width: '100%',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <span style={{ fontSize: '10.5px', color: '#6E6E85', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Sarie Corporate Settlement Rail
        </span>
        <SamaLogo height={18} themeMode="green" />
      </div>
    </div>
  );
};
