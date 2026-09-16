import React from 'react';
import { Check, Globe } from 'lucide-react';
import { BottomSheet } from '../components/BottomSheet';
import { useApp } from '../state/AppContext';

export const LanguageModal: React.FC = () => {
  const { isLanguageModalOpen, setIsLanguageModalOpen, language, setAppLanguage, t } = useApp();

  const languages = [
    { name: 'العربية', native: 'Arabic (Saudi Arabia / المملكة العربية السعودية)', badge: '🇸🇦 الرسمي' },
    { name: 'English', native: 'English (US / Global Fintech)', badge: '🇺🇸 Global' },
  ];

  return (
    <BottomSheet
      isOpen={isLanguageModalOpen}
      onClose={() => setIsLanguageModalOpen(false)}
      title={t('sec.select_lang', 'Select Language')}
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
              className="interactive-tap"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                backgroundColor: isSelected ? 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))' : 'var(--color-surface, #111726)',
                border: isSelected ? '1.5px solid var(--brand-green, #00D09C)' : '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
                borderRadius: '16px',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? 'var(--brand-green, #00D09C)' : 'var(--color-surface-elevated, #182236)',
                    color: isSelected ? 'var(--brand-green-ink, #080C14)' : 'var(--brand-green, #00D09C)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '15px',
                  }}
                >
                  <Globe size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '15.5px', color: '#FFFFFF' }}>
                      {lang.name}
                    </span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 800,
                        backgroundColor: 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))',
                        color: 'var(--brand-green, #00D09C)',
                        padding: '2px 7px',
                        borderRadius: '6px',
                      }}
                    >
                      {lang.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#8E9BAE', marginTop: '3px' }}>
                    {lang.native}
                  </div>
                </div>
              </div>
              {isSelected && <Check size={20} color="var(--brand-green, #00D09C)" />}
            </div>
          );
        })}
      </div>
    </BottomSheet>
  );
};
