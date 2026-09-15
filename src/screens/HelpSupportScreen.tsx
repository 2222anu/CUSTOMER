import React, { useState } from 'react';
import { HelpCircle, MessageSquare, PhoneCall, ChevronDown, ChevronUp, Send, Check, ShieldAlert } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { Modal } from '../components/Modal';
import { useApp } from '../state/AppContext';
import { translateText } from '../utils/i18n';

export interface FaqItem {
  q: string;
  a: string;
}

export interface HelpSupportScreenProps {
  initialFaqs?: FaqItem[];
}

export const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ initialFaqs }) => {
  const { language } = useApp();
  const isAr = language === 'العربية' || language === 'ar';
  const [activeModal, setActiveModal] = useState<'chat' | 'call' | 'dispute' | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: isAr ? 'مرحباً بك! كيف يمكننا مساعدتك في حساب كيو تي باي اليوم؟' : 'Hello! How can I assist you with your QTPay account today?',
      time: isAr ? 'الآن' : 'Just now',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [disputeSuccess, setDisputeSuccess] = useState(false);
  const [disputeTxnId, setDisputeTxnId] = useState('');
  const [disputeReason, setDisputeReason] = useState('');

  const defaultFaqs: FaqItem[] = [
    {
      q: isAr ? 'كم يستغرق استرداد الأموال عبر سريع؟' : 'How long does a Sarie refund take?',
      a: isAr ? 'تتم عمليات الاسترداد الفورية خلال ثوانٍ إلى ساعتين كحد أقصى وفق معايير البنك المركزي السعودي.' : 'Instant Sarie refunds are credited within seconds to 1-2 hours under standard banking protocols.',
    },
    {
      q: isAr ? 'ما هو الحد اليومي للتحويل عبر سريع؟' : 'What is the daily Sarie transfer limit?',
      a: isAr ? 'الحد اليومي القياسي للتحويل الفوري عبر سريع هو ٥٠,٠٠٠ ر.س عبر التطبيقات المصرفية المعتمدة.' : 'As per SAMA guidelines, the standard daily Sarie instant transaction limit is SAR 50,000.',
    },
    {
      q: isAr ? 'كيف أقوم بربط حساب بنكي سعودي جديد؟' : 'How do I add a new Saudi bank account?',
      a: isAr ? 'توجه إلى الحسابات البنكية > إضافة حساب، ثم اختر بنكك السعودي ووثق عبر الرسائل النصية.' : 'Go to Bank Accounts > Add Bank, select your Saudi bank, and verify via SMS OTP.',
    },
  ];

  const faqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : defaultFaqs;

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
        { sender: 'agent', text: `Thank you for reaching out regarding "${userText}". Our customer support team is reviewing your inquiry and will respond shortly.`, time: 'Just now' },
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
    <div className="fade-in" style={{ backgroundColor: '#0B0B14', minHeight: '100%', paddingBottom: '36px', color: '#FFFFFF' }}>
      <AppHeader title={translateText('Help & Support', language)} showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Priority Hero Banner */}
        <div
          style={{
            backgroundColor: '#151524',
            border: '1.5px solid rgba(127, 232, 127, 0.35)',
            borderRadius: '16px',
            padding: '24px 20px',
            marginBottom: '22px',
            textAlign: 'center',
            color: '#FFFFFF',
            boxShadow: 'none',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'rgba(127, 232, 127, 0.15)',
              color: '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              border: '1px solid rgba(127, 232, 127, 0.3)',
            }}
          >
            <HelpCircle size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px', color: '#FFFFFF', margin: 0 }}>
            {isAr ? 'الدعم الفني المباشر ٢٤/٧' : '24/7 Priority Support'}
          </h3>
          <p style={{ fontSize: '12.5px', color: '#A2A2BA', marginTop: '6px', marginBottom: 0 }}>
            {isAr ? 'حل فوري للشكاوى ومساعدة مصرفية معتمدة' : 'Instant dispute resolution and accredited banking assistance'}
          </p>
        </div>

        <div style={{ fontSize: '11px', fontWeight: 800, color: '#6E6E85', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
          {isAr ? 'قنوات الاتصال المباشرة' : 'Contact Channels'}
        </div>

        <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', boxShadow: 'none' }}>
          <ListRow
            icon={<MessageSquare size={18} color="#7FE87F" />}
            label={isAr ? 'المحادثة الفورية' : 'Live Chat'}
            subLabel={isAr ? 'متوسط الرد: ~١ دقيقة' : 'Avg response: ~1 min'}
            onClick={() => setActiveModal('chat')}
          />
          <div style={{ height: '1px', backgroundColor: '#2C2C44', margin: '0 16px' }} />
          <ListRow
            icon={<PhoneCall size={18} color="#7FE87F" />}
            label={isAr ? 'الرقم المجاني الموحد' : 'Toll-Free Hotline'}
            subLabel="800-123-QTPAY"
            onClick={() => setActiveModal('call')}
          />
          <div style={{ height: '1px', backgroundColor: '#2C2C44', margin: '0 16px' }} />
          <ListRow
            icon={<ShieldAlert size={18} color="#7FE87F" />}
            label={isAr ? 'النزاعات وعمليات الاحتيال' : 'Dispute & Fraud'}
            subLabel={isAr ? 'تقديم اعتراض على معاملة مالية' : 'File a transaction complaint'}
            onClick={() => setActiveModal('dispute')}
          />
        </div>

        {/* FAQs */}
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#6E6E85', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', marginLeft: '4px' }}>
          {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={index}
                className="interactive-tap"
                style={{
                  backgroundColor: '#151524',
                  border: '1px solid #2C2C44',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
                onClick={() => setExpandedFaq(isExpanded ? null : index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>{faq.q}</span>
                  {isExpanded ? <ChevronUp size={16} color="#7FE87F" /> : <ChevronDown size={16} color="#A2A2BA" />}
                </div>
                {isExpanded && (
                  <p style={{ fontSize: '12.5px', color: '#A2A2BA', marginTop: '10px', marginBottom: 0, lineHeight: '1.5', borderTop: '1px solid #2C2C44', paddingTop: '10px' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Chat Modal */}
      <Modal isOpen={activeModal === 'chat'} onClose={() => setActiveModal(null)} title={isAr ? 'الدعم المباشر' : 'Live Support'}>
        <div style={{ height: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px', paddingRight: '4px' }}>
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#7FE87F' : '#1E1E32',
                color: msg.sender === 'user' ? '#0B0B14' : '#FFFFFF',
                border: msg.sender === 'user' ? 'none' : '1px solid #2C2C44',
                padding: '10px 14px',
                borderRadius: '14px',
                maxWidth: '80%',
                fontSize: '13px',
                fontWeight: 600,
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
            placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Type your message...'}
            style={{ flex: 1, padding: '12px 14px', borderRadius: '12px', border: '1px solid #2C2C44', backgroundColor: '#1E1E32', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
          />
          <button
            type="submit"
            className="interactive-tap"
            style={{ backgroundColor: '#7FE87F', border: 'none', color: '#0B0B14', padding: '0 16px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: 'none' }}
          >
            <Send size={16} />
          </button>
        </form>
      </Modal>

      {/* Hotline Call Modal */}
      <Modal isOpen={activeModal === 'call'} onClose={() => setActiveModal(null)} title={isAr ? 'الرقم المجاني' : 'Toll-Free Hotline'}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(127, 232, 127, 0.15)',
              color: '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              border: '1.5px solid rgba(127, 232, 127, 0.3)',
            }}
          >
            <PhoneCall size={28} />
          </div>
          <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0', direction: 'ltr' }}>800-123-QTPAY</h4>
          <p style={{ fontSize: '12.5px', color: '#A2A2BA', margin: '0 0 20px 0' }}>
            {isAr ? 'متاح على مدار الساعة بالعربية والإنجليزية (مجاني داخل المملكة)' : 'Available 24x7 in Arabic and English (Toll-Free in KSA)'}
          </p>
          <a
            href="tel:80012378729"
            className="interactive-tap"
            style={{ display: 'inline-block', padding: '12px 28px', backgroundColor: '#7FE87F', color: '#0B0B14', borderRadius: '12px', fontWeight: 800, fontSize: '13px', textDecoration: 'none', boxShadow: 'none' }}
          >
            {isAr ? 'اتصال الآن' : 'Call Now'}
          </a>
        </div>
      </Modal>

      {/* Report Dispute Modal */}
      <Modal isOpen={activeModal === 'dispute'} onClose={() => setActiveModal(null)} title={isAr ? 'تقديم اعتراض' : 'Report Dispute'}>
        {disputeSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <Check size={28} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>{isAr ? 'تم تسجيل الاعتراض بنجاح' : 'Dispute Filed Successfully'}</h4>
            <p style={{ fontSize: '12px', color: '#A2A2BA', marginTop: '4px' }}>Ticket #QT-DISP-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        ) : (
          <form onSubmit={handleDisputeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                {isAr ? 'الرقم المرجعي للمعاملة' : 'Transaction Reference'}
              </label>
              <input
                type="text"
                value={disputeTxnId}
                onChange={(e) => setDisputeTxnId(e.target.value)}
                placeholder={isAr ? 'مثال: SAR-984729104821' : 'e.g. SAR-984729104821'}
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #2C2C44', backgroundColor: '#1E1E32', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                {isAr ? 'سبب الاعتراض' : 'Dispute Reason'}
              </label>
              <textarea
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder={isAr ? 'يرجى توضيح تفاصيل المشكلة...' : 'Describe what went wrong...'}
                rows={3}
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #2C2C44', backgroundColor: '#1E1E32', color: '#FFFFFF', fontSize: '13px', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
              />
            </div>

            <button
              type="submit"
              className="interactive-tap"
              style={{
                marginTop: '8px',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#7FE87F',
                color: '#0B0B14',
                border: 'none',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                boxShadow: 'none',
              }}
            >
              {isAr ? 'إرسال الاعتراض' : 'Submit Dispute'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
