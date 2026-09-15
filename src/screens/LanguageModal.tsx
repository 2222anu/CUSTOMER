import React from 'react';
import { Check } from 'lucide-react';
import { BottomSheet } from '../components/BottomSheet';
import { useApp } from '../state/AppContext';

export const LanguageModal: React.FC = () => {
  const { isLanguageModalOpen, setIsLanguageModalOpen, language, setAppLanguage } = useApp();

  const languages = [
    {
      name: 'العربية',
      native: 'العربية (المملكة العربية السعودية)',
      flag: '🇸🇦',
      sub: 'Saudi Arabic (SAR & Eastern Numerals)',
    },
    {
      name: 'English',
      native: 'English (Saudi / Global)',
      flag: '🌐',
      sub: 'English (SAR Western Numerals)',
    },
    {
      name: 'Hindi',
      native: 'हिंदी',
      flag: '🇮🇳',
      sub: 'Hindi Translation',
    },
    {
      name: 'Spanish',
      native: 'Español',
      flag: '🇪🇸',
      sub: 'Spanish Translation',
    },
  ];

  return (
    <BottomSheet
      isOpen={isLanguageModalOpen}
      onClose={() => setIsLanguageModalOpen(false)}
      title={language === 'العربية' ? 'اختر لغة التطبيق' : 'Select Language'}
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
                backgroundColor: isSelected ? 'rgba(127, 232, 127, 0.14)' : '#1E1E32',
                border: isSelected ? '1.5px solid #7FE87F' : '1px solid #2C2C44',
                borderRadius: '14px',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{lang.flag}</span>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: '#FFFFFF' }}>
                    {lang.native}
                  </div>
                  <div style={{ fontSize: '11px', color: isSelected ? '#7FE87F' : '#A2A2BA', marginTop: '2px' }}>
                    {lang.sub}
                  </div>
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
