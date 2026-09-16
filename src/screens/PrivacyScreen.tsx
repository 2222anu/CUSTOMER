import React, { useState } from 'react';
import { Lock, Eye, ShieldCheck, Database, Check } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { Modal } from '../components/Modal';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { translateText } from '../utils/i18n';

export const PrivacyScreen: React.FC = () => {
  const { language } = useApp();
  const [activeModal, setActiveModal] = useState<'preferences' | 'export' | 'terms' | null>(null);
  const [shareData, setShareData] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExportData = () => {
    setExportSuccess(true);
    setTimeout(() => {
      setExportSuccess(false);
      setActiveModal(null);
    }, 1500);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#0B0F19', minHeight: '100vh', paddingBottom: '36px', color: '#FFFFFF' }}>
      <AppHeader title={translateText('Privacy Policy', language)} showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Encryption Hero Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            borderRadius: '20px',
            padding: '22px 20px',
            marginBottom: '24px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-green, #7FE87F)',
                flexShrink: 0,
              }}
            >
              <Lock size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>{translateText('Banking-Grade Encryption', language)}</h3>
              <p style={{ fontSize: '12px', color: '#8E9BAE', margin: '3px 0 0 0' }}>
                {translateText('TLS 1.3 & 256-Bit AES multi-layer privacy protections', language)}
              </p>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '11px', fontWeight: 800, color: '#8E9BAE', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', paddingInlineStart: '4px' }}>
          {translateText('Data Controls & Rights', language)}
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '18px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            overflow: 'hidden',
          }}
        >
          <ListRow
            icon={<Eye size={20} color="var(--brand-green, #7FE87F)" />}
            label={translateText('Data Sharing Preferences', language)}
            onClick={() => setActiveModal('preferences')}
          />
          <ListRow
            icon={<Database size={20} color="var(--brand-green, #7FE87F)" />}
            label={translateText('Download Account Data', language)}
            onClick={() => setActiveModal('export')}
          />
          <ListRow
            icon={<ShieldCheck size={20} color="var(--brand-green, #7FE87F)" />}
            label={translateText('Terms of Service & Privacy Statement', language)}
            isLast={true}
            onClick={() => setActiveModal('terms')}
          />
        </div>
      </div>

      {/* Preferences Modal */}
      <Modal isOpen={activeModal === 'preferences'} onClose={() => setActiveModal(null)} title={translateText('Data Sharing Preferences', language)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: 'var(--color-surface-elevated, #182236)', borderRadius: '14px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{translateText('Personalized Offers', language)}</div>
              <div style={{ fontSize: '11px', color: '#8E9BAE', marginTop: '2px' }}>{translateText('Allow curated cashback & reward recommendations', language)}</div>
            </div>
            <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: 'var(--brand-green, #7FE87F)', cursor: 'pointer' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: 'var(--color-surface-elevated, #182236)', borderRadius: '14px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{translateText('Spending Analytics', language)}</div>
              <div style={{ fontSize: '11px', color: '#8E9BAE', marginTop: '2px' }}>{translateText('Share anonymized spending statistics', language)}</div>
            </div>
            <input type="checkbox" checked={shareData} onChange={(e) => setShareData(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: 'var(--brand-green, #7FE87F)', cursor: 'pointer' }} />
          </div>

          <PrimaryButton onClick={() => setActiveModal(null)}>
            {translateText('Save Preferences', language)}
          </PrimaryButton>
        </div>
      </Modal>

      {/* Export Data Modal */}
      <Modal isOpen={activeModal === 'export'} onClose={() => setActiveModal(null)} title={translateText('Export Account Data', language)}>
        {exportSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                color: 'var(--brand-green, #7FE87F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <Check size={28} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>{translateText('Data Export Initiated!', language)}</h4>
            <p style={{ fontSize: '12px', color: '#8E9BAE', marginTop: '4px' }}>{translateText('Your encrypted CSV statement will be sent to your registered email.', language)}</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ fontSize: '13.5px', color: '#8E9BAE', marginBottom: '20px', lineHeight: '1.5' }}>
              {translateText('Download a complete archive of your linked bank transactions, payment receipts, and profile history.', language)}
            </p>
            <PrimaryButton onClick={handleExportData}>
              {translateText('Export Encrypted PDF / CSV', language)}
            </PrimaryButton>
          </div>
        )}
      </Modal>

      {/* Privacy Statement Modal */}
      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title={translateText('Privacy Statement', language)}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', fontSize: '13px', color: '#8E9BAE', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ margin: 0 }}><strong style={{ color: '#FFFFFF' }}>{language === 'العربية' || language === 'ar' ? '١. جمع المعلومات:' : '1. Information Collection:'}</strong> {language === 'العربية' || language === 'ar' ? 'يقوم تطبيق كيو تي باي بجمع بيانات الجهاز ورقم الهاتف للمصادقة الإلزامية الخاضعة لضوابط البنك المركزي السعودي وسريع.' : 'QTPay collects device information, SIM serial data, and mobile numbers for mandatory multi-factor authentication mandated by SAMA and the Sarie payment system.'}</p>
          <p style={{ margin: 0 }}><strong style={{ color: '#FFFFFF' }}>{language === 'العربية' || language === 'ar' ? '٢. تشفير البيانات:' : '2. Data Encryption:'}</strong> {language === 'العربية' || language === 'ar' ? 'جميع بيانات المعاملات والمدفوعات مؤمنة بتشفير عتادي متقدم TLS 1.3 و 256-bit AES.' : 'All transaction payload communication is secured via TLS 1.3 and 256-bit AES end-to-end hardware encryption.'}</p>
          <p style={{ margin: 0 }}><strong style={{ color: '#FFFFFF' }}>{language === 'العربية' || language === 'ar' ? '٣. سياسة الجهات الخارجية:' : '3. Third Party Policy:'}</strong> {language === 'العربية' || language === 'ar' ? 'لا نبيع بياناتك الشخصية مطلقاً. تتم مشاركة البيانات المالية فقط مع بنكك السعودي المعتمد لتنفيذ المعاملات وفق لوائح ساما.' : 'We never sell your personal data. Financial data is shared only with your authorized Saudi bank network for payment processing under SAMA regulations.'}</p>
        </div>
      </Modal>
    </div>
  );
};

