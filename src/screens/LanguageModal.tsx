import React from 'react';
import { Check } from 'lucide-react';
import { BottomSheet } from '../components/BottomSheet';
import { useApp } from '../state/AppContext';

export const LanguageModal: React.FC = () => {
  const { isLanguageModalOpen, setIsLanguageModalOpen, language, setAppLanguage } = useApp();

  const languages = [
    { name: 'English', native: 'English' },
    { name: 'العربية', native: 'Arabic' },
    { name: 'Hindi', native: 'हिंदी' },
    { name: 'Spanish', native: 'Español' },
  ];

  return (
    <BottomSheet
      isOpen={isLanguageModalOpen}
      onClose={() => setIsLanguageModalOpen(false)}
      title="Select Language"
      themeMode="light"
    >
      <div style={{ marginBottom: '16px' }}>
        {languages.map((lang) => {
          const isSelected = language === lang.name;
          return (
            <div
              key={lang.name}
              onClick={() => setAppLanguage(lang.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                backgroundColor: isSelected ? '#FDE8D7' : '#FFFFFF',
                border: isSelected ? '1.5px solid #F98513' : '1.5px solid #DAD1C8',
                borderRadius: '16px',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px', color: '#111144' }}>
                  {lang.name}
                </div>
                <div style={{ fontSize: '12px', color: '#5C564D' }}>
                  {lang.native}
                </div>
              </div>
              {isSelected && <Check size={20} color="#F98513" />}
            </div>
          );
        })}
      </div>
    </BottomSheet>
  );
};
