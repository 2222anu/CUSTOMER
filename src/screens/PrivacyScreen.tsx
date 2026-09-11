import React, { useState } from 'react';
import { Lock, Eye, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { Modal } from '../components/Modal';

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
    <div className="fade-in">
      <AppHeader title="Privacy Policy" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#111144',
            border: '1.5px solid #F98513',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            color: '#FFFFFF',
            boxShadow: '0 8px 25px rgba(17, 17, 68, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Lock size={24} color="#F98513" />
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Banking-Grade Encryption</h3>
          </div>
          <p style={{ fontSize: '13px', color: '#A4BCEE', lineHeight: '1.5', margin: 0 }}>
            QTPay employs 256-bit AES encryption for all your financial transactions, UPI tokens, and personal credentials.
          </p>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '800', color: '#5C564D', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Data Controls & Rights
        </div>

        <ListRow
          icon={<Eye size={18} color="#F98513" />}
          label="Data Sharing Preferences"
          subLabel="Manage analytics & third-party data access"
          onClick={() => setActiveModal('preferences')}
        />
        <ListRow
          icon={<Database size={18} color="#F98513" />}
          label="Download Account Data"
          subLabel="Export statements and full user history"
          onClick={() => setActiveModal('export')}
        />
        <ListRow
          icon={<ShieldCheck size={18} color="#F98513" />}
          label="Terms of Service & Privacy Statement"
          subLabel="Read detailed NPCI & RBI privacy compliance"
          onClick={() => setActiveModal('terms')}
        />
      </div>

      {/* Preferences Modal */}
      <Modal isOpen={activeModal === 'preferences'} onClose={() => setActiveModal(null)} title="Data Sharing Preferences">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#F4F1EC', borderRadius: '14px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#111144' }}>Personalized Offers</div>
              <div style={{ fontSize: '11px', color: '#5C564D' }}>Allow curated cashback & reward recommendations</div>
            </div>
            <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#F98513' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#F4F1EC', borderRadius: '14px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#111144' }}>Merchant Analytics</div>
              <div style={{ fontSize: '11px', color: '#5C564D' }}>Share anonymized spending statistics</div>
            </div>
            <input type="checkbox" checked={shareData} onChange={(e) => setShareData(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#F98513' }} />
          </div>

          <button
            onClick={() => setActiveModal(null)}
            style={{ padding: '14px', borderRadius: '14px', backgroundColor: '#F98513', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(249, 133, 19, 0.35)' }}
          >
            Save Preferences
          </button>
        </div>
      </Modal>

      {/* Export Data Modal */}
      <Modal isOpen={activeModal === 'export'} onClose={() => setActiveModal(null)} title="Export Account Data">
        {exportSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="#F98513" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111144' }}>Data Export Initiated!</h4>
            <p style={{ fontSize: '12px', color: '#5C564D', marginTop: '4px' }}>Your encrypted CSV statement will be sent to your registered email.</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ fontSize: '14px', color: '#5C564D', marginBottom: '20px' }}>
              Download a complete archive of your linked bank transactions, payment receipts, and profile history.
            </p>
            <button
              onClick={handleExportData}
              style={{ width: '100%', padding: '14px', borderRadius: '14px', backgroundColor: '#F98513', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(249, 133, 19, 0.35)' }}
            >
              Export Encrypted PDF / CSV
            </button>
          </div>
        )}
      </Modal>

      {/* Privacy Statement Modal */}
      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title="Privacy Statement">
        <div style={{ maxHeight: '280px', overflowY: 'auto', fontSize: '13px', color: '#5C564D', lineHeight: '1.6' }}>
          <p><strong>1. Information Collection:</strong> QTPay collects device information, SIM serial data, and mobile numbers for mandatory UPI multi-factor authentication mandated by NPCI.</p>
          <p><strong>2. Data Encryption:</strong> All transaction payload communication is secured via TLS 1.3 and 256-bit AES end-to-end hardware encryption.</p>
          <p><strong>3. Third Party Policy:</strong> We never sell your personal data. Financial data is shared only with your authorized bank network for payment processing.</p>
        </div>
      </Modal>
    </div>
  );
};

