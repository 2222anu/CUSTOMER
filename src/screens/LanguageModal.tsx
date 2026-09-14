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
    >
      <div role="radiogroup" aria-label="App Language Options" style={{ marginBottom: '16px' }}>
        {languages.map((lang) => {
          const isSelected = language === lang.name;
          return (
            <div
              key={lang.name}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => setAppLanguage(lang.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setAppLanguage(lang.name);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: isSelected ? 'rgba(127, 232, 127, 0.12)' : '#3A3A52',
                border: isSelected ? '1.5px solid #7FE87F' : '1px solid #4D4D6B',
                borderRadius: '12px',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: 'none',
              }}
            >
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px', color: '#FFFFFF' }}>
                  {lang.name}
                </div>
                <div style={{ fontSize: '12px', color: '#B3B3C2', marginTop: '2px' }}>
                  {lang.native}
                </div>
              </div>
              {isSelected && <Check size={20} color="#7FE87F" />}
            </div>
          );
        })}
      </div>
    </BottomSheet>
  );
};
