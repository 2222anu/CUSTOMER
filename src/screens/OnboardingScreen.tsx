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
  Smartphone,
  Flame,
  Wifi,
  Tv,
  Car,
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { QtPayLogo } from '../components/QtPayLogo';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      badge: '0% FEES • 0.3s TRANSFER',
      badgeIcon: <Zap size={13} color="#2e83ff" />,
      title: 'Instant UPI & QR Payments',
      primaryBtnText: 'Continue',
      secondaryBtnText: 'Skip to Registration',
      mockup: (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          {/* Peer-to-Peer Visual Transfer Card */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '16px',
              border: '1.5px solid #d6e6ff',
              boxSizing: 'border-box',
            }}
          >
            {/* Sender & Receiver Connection Flow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              {/* Sender */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    backgroundColor: '#eef5ff',
                    color: '#2e83ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13px',
                    border: '1px solid #d6e6ff',
                  }}
                >
                  AN
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>You (Anu)</div>
                  <div style={{ fontSize: '9.5px', color: '#64748b' }}>anu@qtpay</div>
                </div>
              </div>

              {/* Animated Ray / Beam */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: '#eef5ff', borderRadius: '12px', border: '1px solid #d6e6ff' }}>
                <Zap size={12} color="#2e83ff" />
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#2e83ff' }}>0.3s Fast</span>
                <ArrowRight size={12} color="#2e83ff" />
              </div>

              {/* Receiver */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Priya Menon</div>
                  <div style={{ fontSize: '9.5px', color: '#10b981', fontWeight: 700 }}>✓ Verified</div>
                </div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    backgroundColor: '#ecfdf5',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13px',
                    border: '1px solid #a7f3d0',
                  }}
                >
                  PM
                </div>
              </div>
            </div>

            {/* Main Live Payment Pill */}
            <div
              style={{
                backgroundColor: '#0e274d',
                borderRadius: '16px',
                padding: '16px',
                color: '#ffffff',
                marginBottom: '12px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span>Amount Paid</span>
                <span style={{ color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  ✓ 0% Gateway Fee
                </span>
              </div>
              <div className="tabular-nums" style={{ fontSize: '26px', fontWeight: 900, margin: '6px 0', letterSpacing: '0.01em', color: '#ffffff' }}>
                ₹ 2,500.00
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', color: '#cbd5e1' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#10b981" /> Settled via ICICI •••• 3616
                </span>
                <span style={{ fontWeight: 800, color: '#10b981' }}>SUCCESS</span>
              </div>
            </div>

            {/* Quick 1-Tap Transfer Bubbles */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>Rahul S.</div>
                <div style={{ fontSize: '9.5px', color: '#2e83ff', fontWeight: 700 }}>₹ 500</div>
              </div>
              <div style={{ flex: 1, backgroundColor: '#eef5ff', border: '1.5px solid #2e83ff', borderRadius: '10px', padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>Priya M.</div>
                <div style={{ fontSize: '9.5px', color: '#2e83ff', fontWeight: 800 }}>₹ 2,500 ✓</div>
              </div>
              <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>Amit V.</div>
                <div style={{ fontSize: '9.5px', color: '#2e83ff', fontWeight: 700 }}>₹ 1,000</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: 'NPCI & RBI REGULATED',
      badgeIcon: <ShieldCheck size={13} color="#2e83ff" />,
      title: 'Multi-Bank One-Tap Control',
      primaryBtnText: 'Continue',
      secondaryBtnText: 'Skip to Registration',
      mockup: (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          {/* Stacked EMV Cards Canvas */}
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Background Secondary Peeking Card (ICICI Bank) */}
            <div
              style={{
                width: '90%',
                margin: '0 auto',
                backgroundColor: '#1e3a8a',
                border: '1px solid #3b82f6',
                borderRadius: '16px',
                padding: '10px 16px',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transform: 'translateY(12px) scale(0.96)',
                opacity: 0.85,
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#cbd5e1' }}>ICICI BANK &bull; •••• 3616</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#38bdf8' }}>₹ 18,450.00</div>
            </div>

            {/* Foreground Primary EMV Card (HDFC Millennium) */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                background: 'linear-gradient(135deg, #0a192f 0%, #0e274d 50%, #1d4ed8 100%)',
                border: '1.5px solid #38bdf8',
                borderRadius: '20px',
                padding: '18px',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(14, 39, 77, 0.25)',
              }}
            >
              {/* Card Header with EMV Chip */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Gold Metallic EMV Chip Graphic */}
                  <div
                    style={{
                      width: '28px',
                      height: '22px',
                      borderRadius: '5px',
                      background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                      border: '1px solid #fef3c7',
                      position: 'relative',
                    }}
                  />
                  <Wifi size={16} color="#94a3b8" />
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.04em' }}>HDFC BANK</div>
                  <span style={{ fontSize: '9px', fontWeight: 800, backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 6px', borderRadius: '6px' }}>
                    PRIMARY
                  </span>
                </div>
              </div>

              {/* Masked Card Number */}
              <div style={{ fontFamily: 'monospace', fontSize: '15px', fontWeight: 800, letterSpacing: '3px', color: '#e2e8f0', marginBottom: '14px' }}>
                •••• &nbsp;•••• &nbsp;•••• &nbsp;8821
              </div>

              {/* Balance & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Available Balance
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>
                    ₹ 45,280.00
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                  <Eye size={13} color="#38bdf8" />
                  <span>Check Balance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Account Switcher Strip */}
          <div style={{ width: '100%', display: 'flex', gap: '6px', marginTop: '4px' }}>
            <button
              style={{
                flex: 1,
                backgroundColor: '#eef5ff',
                border: '1.5px solid #2e83ff',
                borderRadius: '10px',
                padding: '8px',
                fontSize: '11px',
                fontWeight: 800,
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <Landmark size={12} /> HDFC
            </button>
            <button
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '8px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <Landmark size={12} /> ICICI
            </button>
            <button
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '8px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <CreditCard size={12} /> + Add
            </button>
          </div>
        </div>
      ),
    },
    {
      badge: 'GUARANTEED DAILY REWARDS',
      badgeIcon: <Sparkles size={13} color="#2e83ff" />,
      title: 'Utility Bills & Instant Cashback',
      primaryBtnText: 'Get Started with QTPay',
      secondaryBtnText: 'Log In with Phone',
      mockup: (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          {/* 4 Interactive Utility Tiles Grid */}
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '10px 4px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#eef5ff', color: '#2e83ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
                <Zap size={16} />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>Electricity</div>
              <div style={{ fontSize: '8.5px', color: '#10b981', fontWeight: 800, marginTop: '2px' }}>PAID ✓</div>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '10px 4px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
                <Smartphone size={16} />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>Mobile 5G</div>
              <div style={{ fontSize: '8.5px', color: '#2e83ff', fontWeight: 800, marginTop: '2px' }}>Recharge</div>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '10px 4px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
                <Car size={16} />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>FASTag</div>
              <div style={{ fontSize: '8.5px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>Auto-Pay</div>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '10px 4px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#fffbeb', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
                <Tv size={16} />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>DTH TV</div>
              <div style={{ fontSize: '8.5px', color: '#f59e0b', fontWeight: 800, marginTop: '2px' }}>Tata Play</div>
            </div>
          </div>

          {/* Golden Scratch Card Reward Centerpiece */}
          <div
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #0e274d 0%, #172554 60%, #1e40af 100%)',
              border: '2px solid #fbbf24',
              borderRadius: '18px',
              padding: '16px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.04em' }}>
                  🎉 CASHBACK UNLOCKED
                </span>
              </div>
              <div className="tabular-nums" style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.01em' }}>
                ₹ 150.00 Won
              </div>
              <div style={{ fontSize: '10.5px', color: '#93c5fd', marginTop: '3px' }}>
                Credited directly to linked bank account
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#fbbf24',
                color: '#0e274d',
                padding: '10px 14px',
                borderRadius: '12px',
                fontWeight: 900,
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <span>CLAIM</span>
              <span style={{ fontSize: '9px', fontWeight: 700 }}>INSTANT</span>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '10px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxSizing: 'border-box',
            }}
          >
            <CheckCircle2 size={13} color="#10b981" />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#065f46' }}>
              100% 0-Fee Guarantee on All Bill Payments
            </span>
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
        padding: '18px 20px 24px 20px',
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
              fontSize: '12px',
              fontWeight: 800,
              padding: '5px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            Skip
          </button>
        </div>

        {/* Feature Pill Badge */}
        <div style={{ marginTop: '14px', marginBottom: '6px' }}>
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
              padding: '3px 10px',
              borderRadius: '10px',
              letterSpacing: '0.04em',
            }}
          >
            {current.badgeIcon}
            <span>{current.badge}</span>
          </span>
        </div>

        {/* Crisp Headline (NO long descriptive paragraphs as requested) */}
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0',
            lineHeight: '1.25',
            letterSpacing: '-0.02em',
          }}
        >
          {current.title}
        </h1>
      </div>

      {/* Hero Showcase Area (Advanced Level Visual Demo) */}
      <div
        className="fade-in"
        key={activeSlide}
        style={{
          width: '100%',
          backgroundColor: '#f8fafc',
          borderRadius: '24px',
          border: '1.5px solid #e2e8f0',
          padding: '16px 14px',
          boxSizing: 'border-box',
          margin: '14px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {current.mockup}
      </div>

      {/* Footer Controls: Dots + Action Buttons */}
      <div>
        {/* Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '14px' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Primary Action Button */}
          <button
            onClick={handleNext}
            className="interactive-tap"
            style={{
              width: '100%',
              height: '50px',
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
              height: '44px',
              backgroundColor: '#eef5ff',
              color: '#2e83ff',
              border: '1px solid #d6e6ff',
              borderRadius: '14px',
              fontSize: '13px',
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
    </div>
  );
};
