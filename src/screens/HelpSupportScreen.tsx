import React from 'react';
import { HelpCircle, MessageSquare, PhoneCall, FileText } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';

export const HelpSupportScreen: React.FC = () => {
  return (
    <div className="fade-in">
      <AppHeader title="Help & Support" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Banner */}
        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'rgba(158, 240, 26, 0.15)',
              color: 'var(--neon-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}
          >
            <HelpCircle size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>24/7 Priority Support</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            We're here to help with your transactions and account.
          </p>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Quick Assistance
        </div>

        <ListRow icon={<MessageSquare size={18} />} label="Live Chat with Support" subLabel="Average response time: 2 mins" onClick={() => alert('Support chat initiated')} />
        <ListRow icon={<PhoneCall size={18} />} label="Toll-Free Helpline" subLabel="1800-123-QTPAY (78729)" onClick={() => alert('Calling toll-free hotline...')} />
        <ListRow icon={<FileText size={18} />} label="Payment & Refund FAQs" onClick={() => alert('Opening FAQs')} />
        <ListRow icon={<HelpCircle size={18} />} label="Report Fraud or Dispute" onClick={() => alert('Dispute form opened')} danger />
      </div>
    </div>
  );
};
