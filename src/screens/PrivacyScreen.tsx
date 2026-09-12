import React, { useState } from 'react';
import { Lock, Eye, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { Modal } from '../components/Modal';
import { PrimaryButton } from '../components/PrimaryButton';

export const PrivacyScreen: React.FC = () => {
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
    <div className="fade-in" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', paddingBottom: '36px' }}>
      <AppHeader title="Privacy Policy" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Encryption Hero Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #071529 0%, #0a2540 55%, #1d4ed8 100%)',
            border: '1.5px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '20px',
            padding: '22px 20px',
            marginBottom: '24px',
            color: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(10, 25, 47, 0.2)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                backdropFilter: 'blur(6px)',
                flexShrink: 0,
              }}
            >
              <Lock size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Banking-Grade Encryption</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)', margin: '3px 0 0 0' }}>
                TLS 1.3 & 256-Bit AES multi-layer privacy protections
              </p>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', paddingLeft: '4px' }}>
          Data Controls & Rights
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)',
          }}
        >
          <ListRow
            icon={<Eye size={20} color="#2e83ff" />}
            label="Data Sharing Preferences"
            onClick={() => setActiveModal('preferences')}
          />
          <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
          <ListRow
            icon={<Database size={20} color="#2e83ff" />}
            label="Download Account Data"
            onClick={() => setActiveModal('export')}
          />
          <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
          <ListRow
            icon={<ShieldCheck size={20} color="#2e83ff" />}
            label="Terms of Service & Privacy Statement"
            onClick={() => setActiveModal('terms')}
          />
        </div>
      </div>

      {/* Preferences Modal */}
      <Modal isOpen={activeModal === 'preferences'} onClose={() => setActiveModal(null)} title="Data Sharing Preferences">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Personalized Offers</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Allow curated cashback & reward recommendations</div>
            </div>
            <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#2e83ff', cursor: 'pointer' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Merchant Analytics</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Share anonymized spending statistics</div>
            </div>
            <input type="checkbox" checked={shareData} onChange={(e) => setShareData(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#2e83ff', cursor: 'pointer' }} />
          </div>

          <PrimaryButton onClick={() => setActiveModal(null)}>
            Save Preferences
          </PrimaryButton>
        </div>
      </Modal>

      {/* Export Data Modal */}
      <Modal isOpen={activeModal === 'export'} onClose={() => setActiveModal(null)} title="Export Account Data">
        {exportSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="#2e83ff" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Data Export Initiated!</h4>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Your encrypted CSV statement will be sent to your registered email.</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>
              Download a complete archive of your linked bank transactions, payment receipts, and profile history.
            </p>
            <PrimaryButton onClick={handleExportData}>
              Export Encrypted PDF / CSV
            </PrimaryButton>
          </div>
        )}
      </Modal>

      {/* Privacy Statement Modal */}
      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title="Privacy Statement">
        <div style={{ maxHeight: '300px', overflowY: 'auto', fontSize: '13px', color: '#475569', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ margin: 0 }}><strong>1. Information Collection:</strong> QTPay collects device information, SIM serial data, and mobile numbers for mandatory UPI multi-factor authentication mandated by NPCI.</p>
          <p style={{ margin: 0 }}><strong>2. Data Encryption:</strong> All transaction payload communication is secured via TLS 1.3 and 256-bit AES end-to-end hardware encryption.</p>
          <p style={{ margin: 0 }}><strong>3. Third Party Policy:</strong> We never sell your personal data. Financial data is shared only with your authorized bank network for payment processing.</p>
        </div>
      </Modal>
    </div>
  );
};
