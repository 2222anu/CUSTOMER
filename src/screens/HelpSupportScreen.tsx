import React, { useState } from 'react';
import { HelpCircle, MessageSquare, PhoneCall, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { Modal } from '../components/Modal';

export const HelpSupportScreen: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'chat' | 'call' | 'dispute' | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'agent', text: 'Hello! How can I assist you with your QTPay account today?', time: 'Just now' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [disputeSuccess, setDisputeSuccess] = useState(false);
  const [disputeTxnId, setDisputeTxnId] = useState('');
  const [disputeReason, setDisputeReason] = useState('');

  const faqs = [
    { q: 'How long does a UPI refund take?', a: 'Instant UPI refunds are usually credited within 1-2 hours. In rare bank network delays, it can take up to 24-48 hours.' },
    { q: 'What is the daily UPI transfer limit?', a: 'As per NPCI guidelines, the standard daily UPI transaction limit is ₹1,00,000 across all UPI apps.' },
    { q: 'How do I add a new bank account?', a: 'Go to Profile > Bank Accounts > tap Add Bank Account, select your bank, and verify your mobile number via SMS.' },
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);
    setInputMsg('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'agent', text: `Thanks for contacting us regarding "${userText}". A support supervisor has received your message and will update your ticket within 5 minutes.`, time: 'Just now' },
      ]);
    }, 1000);
  };

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisputeSuccess(true);
    setTimeout(() => {
      setDisputeSuccess(false);
      setActiveModal(null);
      setDisputeTxnId('');
      setDisputeReason('');
    }, 1500);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Help & Support" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Priority Banner */}
        <div
          style={{
            background: 'linear-gradient(145deg, #0e274d 0%, #0a1c36 100%)',
            border: '1.5px solid rgba(46, 131, 255, 0.35)',
            borderRadius: '20px',
            padding: '24px 20px',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#FFFFFF',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              backgroundColor: 'rgba(46, 131, 255, 0.2)',
              color: '#2e83ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              border: '1.5px solid rgba(46, 131, 255, 0.35)',
            }}
          >
            <HelpCircle size={26} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', color: '#FFFFFF', margin: 0 }}>
            24/7 Priority Support
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px', marginBottom: 0 }}>
            We're here to help resolve any payment or account issues instantly.
          </p>
        </div>

        <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
          Contact Assistance
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
          <ListRow
            icon={<MessageSquare size={18} color="#2e83ff" />}
            label="Live Chat with Support"
            subLabel="Avg response time: ~1 minute"
            onClick={() => setActiveModal('chat')}
          />
          <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
          <ListRow
            icon={<PhoneCall size={18} color="#2e83ff" />}
            label="Toll-Free Hotline"
            subLabel="1800-123-QTPAY (78729)"
            onClick={() => setActiveModal('call')}
          />
          <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
          <ListRow
            icon={<HelpCircle size={18} color="#DC2626" />}
            label="Report Dispute or Fraud"
            subLabel="File a formal transaction complaint"
            onClick={() => setActiveModal('dispute')}
            danger
          />
        </div>

        {/* FAQs */}
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
          Frequently Asked Questions
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={index}
                className="interactive-tap"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedFaq(isExpanded ? null : index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{faq.q}</span>
                  {isExpanded ? <ChevronUp size={16} color="#2e83ff" /> : <ChevronDown size={16} color="#64748b" />}
                </div>
                {isExpanded && (
                  <p style={{ fontSize: '13px', color: '#475569', marginTop: '10px', marginBottom: 0, lineHeight: '1.5', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Chat Modal */}
      <Modal isOpen={activeModal === 'chat'} onClose={() => setActiveModal(null)} title="Live Customer Support">
        <div style={{ height: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px', paddingRight: '4px' }}>
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#2e83ff' : '#f1f5f9',
                color: msg.sender === 'user' ? '#FFFFFF' : '#0f172a',
                padding: '10px 14px',
                borderRadius: '14px',
                maxWidth: '80%',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type your question..."
            style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
          />
          <button
            type="submit"
            className="interactive-tap"
            style={{ backgroundColor: '#2e83ff', border: 'none', color: '#FFFFFF', padding: '0 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
          >
            <Send size={18} />
          </button>
        </form>
      </Modal>

      {/* Hotline Call Modal */}
      <Modal isOpen={activeModal === 'call'} onClose={() => setActiveModal(null)} title="Toll-Free Customer Hotline">
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#eef5ff',
              color: '#2e83ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              border: '1.5px solid #d6e6ff',
            }}
          >
            <PhoneCall size={28} />
          </div>
          <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>1800-123-QTPAY</h4>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>Available 24x7 in English, Telugu, Hindi and Tamil</p>
          <a
            href="tel:180012378729"
            className="interactive-tap"
            style={{ display: 'inline-block', padding: '12px 28px', backgroundColor: '#2e83ff', color: '#FFFFFF', borderRadius: '12px', fontWeight: '800', fontSize: '14px', textDecoration: 'none' }}
          >
            Call Now
          </a>
        </div>
      </Modal>

      {/* Report Dispute Modal */}
      <Modal isOpen={activeModal === 'dispute'} onClose={() => setActiveModal(null)} title="Report Transaction Dispute">
        {disputeSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Dispute Ticket Filed Successfully!</h4>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Ticket ID: #QT-DISP-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        ) : (
          <form onSubmit={handleDisputeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                Transaction UTR / ID
              </label>
              <input
                type="text"
                value={disputeTxnId}
                onChange={(e) => setDisputeTxnId(e.target.value)}
                placeholder="e.g. UTR984729104821"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                Reason for Dispute
              </label>
              <textarea
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="Describe what went wrong with the transaction..."
                rows={3}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
              />
            </div>

            <button
              type="submit"
              className="interactive-tap"
              style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#dc2626',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: '800',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Submit Formal Dispute
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
