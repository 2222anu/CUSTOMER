import React, { useState } from 'react';
import {
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Landmark,
  Eye,
  CreditCard,
  Send,
  Smartphone,
  Flame,
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { QtPayLogo } from '../components/QtPayLogo';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      badge: 'LIGHTNING UPI PAYMENTS',
      badgeIcon: <Zap size={13} color="#2e83ff" />,
      title: 'Pay Anyone, Anywhere with Instant 0% Fees',
      description: 'Transfer funds directly to phone numbers, UPI IDs, bank accounts or scan any QR code in 1 second.',
      primaryBtnText: 'Continue',
      secondaryBtnText: 'Skip to Registration',
      mockup: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Main Floating Transaction Card */}
          <div
            style={{
              width: '86%',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '16px 18px',
              border: '1.5px solid #d6e6ff',
            }}
          >
            {/* Payment Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: '#eef5ff',
                    color: '#2e83ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '14px',
                    border: '1px solid #d6e6ff',
                  }}
                >
                  PM
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Priya Menon</div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>priya@paytm &bull; +91 98345 67890</div>
                </div>
              </div>

              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 800,
                  backgroundColor: '#ecfdf5',
                  color: '#10b981',
                  border: '1px solid #a7f3d0',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <CheckCircle2 size={10} /> Verified Payee
              </span>
            </div>

            {/* Transfer Amount Pill */}
            <div
              style={{
                backgroundColor: '#0e274d',
                borderRadius: '14px',
                padding: '14px 16px',
                color: '#ffffff',
                marginBottom: '12px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', color: '#94a3b8', fontWeight: 700 }}>
                <span>TRANSACTION AMOUNT</span>
                <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Zap size={11} /> 0% Fees
                </span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, margin: '4px 0', letterSpacing: '0.01em', color: '#ffffff' }}>
                ₹ 2,500.00
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#cbd5e1' }}>
                <CheckCircle2 size={12} color="#10b981" />
                <span>Instant Bank Debit &bull; Ref: 9281726481</span>
              </div>
            </div>

            {/* Bank Channel Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', color: '#475569', backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                <Landmark size={14} color="#2e83ff" />
                <span>ICICI Bank &bull; •••• 3616</span>
              </div>
              <span style={{ color: '#10b981', fontWeight: 800 }}>SUCCESS</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: 'MULTI-BANKING ECOSYSTEM',
      badgeIcon: <Landmark size={13} color="#2e83ff" />,
      title: 'All Your Bank Accounts in One Safe Place',
      description: 'Link ICICI, HDFC, SBI, Kotak & 140+ banks. Check live balances with a single secure UPI PIN.',
      primaryBtnText: 'Continue',
      secondaryBtnText: 'Skip to Registration',
      mockup: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Stacked EMV Bank Cards */}
          <div
            style={{
              width: '86%',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '16px 18px',
              border: '1.5px solid #d6e6ff',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={15} color="#2e83ff" />
                <span>Linked UPI Bank Cards</span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#eef5ff', color: '#2e83ff', padding: '2px 8px', borderRadius: '8px', border: '1px solid #d6e6ff' }}>
                3 Active
              </span>
            </div>

            {/* Primary Blue Card Visual */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0e274d 0%, #1e40af 60%, #2e83ff 100%)',
                borderRadius: '14px',
                padding: '14px 16px',
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.04em' }}>HDFC BANK</span>
                <span style={{ fontSize: '9px', fontWeight: 800, backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '2px 6px', borderRadius: '6px' }}>PRIMARY</span>
              </div>

              <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, margin: '10px 0 6px 0', letterSpacing: '2px', color: '#e2e8f0' }}>
                •••• •••• •••• 8821
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase' }}>Available Balance</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff' }}>₹ 45,280.00</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '4px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                  <Eye size={12} />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Trust Footer inside card */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '10px', color: '#64748b' }}>
              <ShieldCheck size={13} color="#10b981" />
              <span>NPCI Multi-Account Bank Switch Enabled</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: 'RECHARGES & REWARDS',
      badgeIcon: <Sparkles size={13} color="#2e83ff" />,
      title: 'Pay Bills, Recharges & Win Daily Cashback',
      description: 'Never miss electricity, mobile 5G, or FASTag bills. Earn guaranteed scratch cards on every pay.',
      primaryBtnText: 'Get Started with QTPay',
      secondaryBtnText: 'Log In with Phone',
      mockup: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Bill Payments & Rewards Card */}
          <div
            style={{
              width: '86%',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '16px 18px',
              border: '1.5px solid #d6e6ff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Instant Utility Hub</span>
              <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Flame size={11} /> 100% Cashback
              </span>
            </div>

            {/* Quick 3 Service Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                <Zap size={16} color="#2e83ff" style={{ margin: '0 auto 2px auto' }} />
                <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#0f172a' }}>Electricity</div>
              </div>
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                <Smartphone size={16} color="#10b981" style={{ margin: '0 auto 2px auto' }} />
                <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#0f172a' }}>Mobile 5G</div>
              </div>
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                <Send size={16} color="#8b5cf6" style={{ margin: '0 auto 2px auto' }} />
                <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#0f172a' }}>FASTag</div>
              </div>
            </div>

            {/* Scratch Reward Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0e274d 0%, #172554 100%)',
                border: '1px solid #2e83ff',
                borderRadius: '12px',
                padding: '10px 14px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>🎉 Flat ₹150 Cashback Won!</div>
                <div style={{ fontSize: '9.5px', color: '#94a3b8', marginTop: '2px' }}>Credited to linked bank account</div>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#2e83ff', color: '#ffffff', padding: '4px 8px', borderRadius: '8px' }}>
                CLAIM
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigateTo('MOBILE_NUMBER');
  };

  const current = slides[activeSlide];

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 20px 28px 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Navigation Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <QtPayLogo variant="horizontal" size={24} showTagline={false} />
          <button
            onClick={handleComplete}
            className="interactive-tap"
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              color: '#475569',
              fontSize: '12.5px',
              fontWeight: 800,
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            Skip
          </button>
        </div>

        {/* Feature Pill Badge */}
        <div style={{ marginTop: '18px', marginBottom: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#eef5ff',
              border: '1px solid #d6e6ff',
              color: '#2e83ff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '12px',
              letterSpacing: '0.04em',
            }}
          >
            {current.badgeIcon}
            <span>{current.badge}</span>
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 8px 0',
            lineHeight: '1.25',
            letterSpacing: '-0.02em',
          }}
        >
          {current.title}
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.45', margin: 0 }}>
          {current.description}
        </p>
      </div>

      {/* Hero Mockup Graphic Container */}
      <div
        className="fade-in"
        key={activeSlide}
        style={{
          width: '100%',
          height: '260px',
          backgroundColor: '#f8fafc',
          borderRadius: '24px',
          border: '1.5px solid #e2e8f0',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '12px 0',
        }}
      >
        {current.mockup}
      </div>

      {/* Pagination Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveSlide(index)}
            style={{
              width: activeSlide === index ? '26px' : '7px',
              height: '7px',
              borderRadius: '4px',
              backgroundColor: activeSlide === index ? '#2e83ff' : '#cbd5e1',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* Action Buttons Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Primary Action Button */}
        <button
          onClick={handleNext}
          className="interactive-tap"
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: '#2e83ff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '14px',
            fontSize: '15px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <span>{current.primaryBtnText}</span>
          <ArrowRight size={18} />
        </button>

        {/* Secondary Action Button */}
        <button
          onClick={handleComplete}
          className="interactive-tap"
          style={{
            width: '100%',
            height: '46px',
            backgroundColor: '#eef5ff',
            color: '#2e83ff',
            border: '1px solid #d6e6ff',
            borderRadius: '14px',
            fontSize: '13.5px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <span>{current.secondaryBtnText}</span>
        </button>
      </div>
    </div>
  );
};
