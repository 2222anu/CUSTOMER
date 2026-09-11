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
    <div className="fade-in">
      <AppHeader title="Help & Support" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Priority Banner */}
        <div
          style={{
            backgroundColor: '#111144',
            border: '1.5px solid #F98513',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'center',
            color: '#FFFFFF',
            boxShadow: '0 8px 25px rgba(17, 17, 68, 0.3)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(249, 133, 19, 0.25)',
              color: '#F98513',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              border: '1px solid rgba(249, 133, 19, 0.4)',
            }}
          >
            <HelpCircle size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', color: '#FFFFFF' }}>
            24/7 Priority Support
          </h3>
          <p style={{ fontSize: '13px', color: '#A4BCEE' }}>
            We're here to help resolve any payment or account issues instantly.
          </p>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '800', color: '#5C564D', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Contact Assistance
        </div>

        <ListRow
          icon={<MessageSquare size={18} color="#F98513" />}
          label="Live Chat with Support"
          subLabel="Avg response time: ~1 minute"
          onClick={() => setActiveModal('chat')}
        />
        <ListRow
          icon={<PhoneCall size={18} color="#F98513" />}
          label="Toll-Free Hotline"
          subLabel="1800-123-QTPAY (78729)"
          onClick={() => setActiveModal('call')}
        />
        <ListRow
          icon={<HelpCircle size={18} color="#DC2626" />}
          label="Report Dispute or Fraud"
          subLabel="File a formal transaction complaint"
          onClick={() => setActiveModal('dispute')}
          danger
        />

        {/* FAQs */}
        <div style={{ fontSize: '12px', fontWeight: '800', color: '#5C564D', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '24px 0 12px 0' }}>
          Frequently Asked Questions
        </div>

        {faqs.map((faq, index) => {
          const isExpanded = expandedFaq === index;
          return (
            <div
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #DAD1C8',
                borderRadius: '16px',
                padding: '14px 16px',
                marginBottom: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedFaq(isExpanded ? null : index)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111144' }}>{faq.q}</span>
                {isExpanded ? <ChevronUp size={18} color="#F98513" /> : <ChevronDown size={18} color="#5C564D" />}
              </div>
              {isExpanded && (
                <p style={{ fontSize: '13px', color: '#5C564D', marginTop: '10px', lineHeight: '1.5', borderTop: '1px solid #DAD1C8', paddingTop: '10px' }}>
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Chat Modal */}
      <Modal isOpen={activeModal === 'chat'} onClose={() => setActiveModal(null)} title="Live Customer Support">
        <div style={{ height: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px', paddingRight: '4px' }}>
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#F98513' : '#F4F1EC',
                color: msg.sender === 'user' ? '#FFFFFF' : '#111144',
                padding: '10px 14px',
                borderRadius: '16px',
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
            style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #DAD1C8', fontSize: '14px', outline: 'none' }}
          />
          <button
            type="submit"
            style={{ backgroundColor: '#F98513', border: 'none', color: '#FFFFFF', padding: '0 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
          >
            <Send size={18} />
          </button>
        </form>
      </Modal>

      {/* Hotline Call Modal */}
      <Modal isOpen={activeModal === 'call'} onClose={() => setActiveModal(null)} title="Toll-Free Customer Hotline">
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <PhoneCall size={44} color="#F98513" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#111144', margin: '0 0 6px 0' }}>1800-123-QTPAY</h4>
          <p style={{ fontSize: '13px', color: '#5C564D', margin: '0 0 20px 0' }}>Available 24x7 in English, Telugu, Hindi and Tamil</p>
          <a
            href="tel:180012378729"
            style={{ display: 'inline-block', padding: '14px 28px', backgroundColor: '#F98513', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', textDecoration: 'none', boxShadow: '0 4px 12px rgba(249, 133, 19, 0.35)' }}
          >
            Call Now
          </a>
        </div>
      </Modal>

      {/* Report Dispute Modal */}
      <Modal isOpen={activeModal === 'dispute'} onClose={() => setActiveModal(null)} title="Report Transaction Dispute">
        {disputeSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="#F98513" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111144' }}>Dispute Ticket Filed Successfully!</h4>
            <p style={{ fontSize: '12px', color: '#5C564D', marginTop: '4px' }}>Ticket ID: #QT-DISP-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        ) : (
          <form onSubmit={handleDisputeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '4px' }}>
                Transaction UTR / ID
              </label>
              <input
                type="text"
                value={disputeTxnId}
                onChange={(e) => setDisputeTxnId(e.target.value)}
                placeholder="e.g. UTR982183921"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #DAD1C8', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '4px' }}>
                Describe Issue
              </label>
              <textarea
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="Amount debited but not credited to recipient..."
                required
                rows={3}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #DAD1C8', fontSize: '14px', fontFamily: 'inherit' }}
              />
            </div>
            <button
              type="submit"
              style={{ padding: '14px', borderRadius: '14px', backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer' }}
            >
              Submit Complaint
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

