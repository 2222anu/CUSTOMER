import React, { useState } from 'react';
import { Briefcase, Compass, Sparkles } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Find interesting projects easily',
      primaryBtnText: 'Find a Service',
      secondaryBtnText: 'Become Freelancer',
      mockup: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Main Floating UI Mockup Card */}
          <div
            style={{
              width: '82%',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '14px',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.12)',
              border: '1px solid #E5E7EB',
            }}
          >
            {/* Header info inside mockup */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', fontWeight: 700, fontSize: '12px' }}>
                  ER
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#111827' }}>Emanuel Richard</div>
                  <div style={{ fontSize: '9px', color: '#6B7280' }}>UI/UX Designer</div>
                </div>
              </div>
              <span style={{ fontSize: '9px', color: '#9CA3AF' }}>31 Aug 2026</span>
            </div>

            {/* Blue Earnings Widget */}
            <div
              style={{
                backgroundColor: '#2563EB',
                borderRadius: '12px',
                padding: '12px',
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', opacity: 0.9 }}>
                <span>Earnings</span>
                <span style={{ fontWeight: 600 }}>Details</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, margin: '4px 0' }}>₹83,412.00</div>
              <div style={{ fontSize: '9px', opacity: 0.85 }}>+12% increase from last month</div>
            </div>

            {/* Sub Stats Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: '9px' }}>
              <div style={{ flex: 1, backgroundColor: '#F9FAFB', padding: '6px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#10B981' }}>80%</div>
                <div style={{ color: '#6B7280' }}>On-time rate</div>
              </div>
              <div style={{ flex: 1, backgroundColor: '#F9FAFB', padding: '6px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#F59E0B' }}>★ 4.9 (120)</div>
                <div style={{ color: '#6B7280' }}>Positive rating</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Get your freelance experience',
      primaryBtnText: 'Find a Service',
      secondaryBtnText: 'Become Freelancer',
      mockup: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Messaging / Transfer Mockup */}
          <div
            style={{
              width: '82%',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '14px',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.12)',
              border: '1px solid #E5E7EB',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>Messages & Payments</div>

            {/* Active message pill floating right */}
            <div
              style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '12px',
                padding: '10px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>
                AA
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E3A8A' }}>Alexander Arnold</div>
                <div style={{ fontSize: '9px', color: '#3B82F6' }}>Hi! Payment ₹12,500 credited for project!</div>
              </div>
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#2563EB', color: '#fff', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            </div>

            {/* Secondary items */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#E5E7EB' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#374151' }}>Alexander Arnold</div>
                <div style={{ fontSize: '8px', color: '#9CA3AF' }}>In terms of timeline, we are ready...</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Pay bills & grow your finance',
      primaryBtnText: 'Get Started Now',
      secondaryBtnText: 'Explore Features',
      mockup: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Card & Details Mockup */}
          <div
            style={{
              width: '82%',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '14px',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.12)',
              border: '1px solid #E5E7EB',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#111827' }}>QtPay Multi-Bank</div>
              <Sparkles size={14} color="#2563EB" />
            </div>

            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937', marginBottom: '6px' }}>
              Redesign Mobile App & Pay Utility Bills
            </div>

            <p style={{ fontSize: '9px', color: '#6B7280', lineHeight: 1.4, marginBottom: '10px' }}>
              QtPay is seeking to enhance visual app experience with 0-fee UPI transfers and instant bill receipts.
            </p>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
              <span style={{ fontSize: '8px', backgroundColor: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>UPI 2.0</span>
              <span style={{ fontSize: '8px', backgroundColor: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>0% Fee</span>
              <span style={{ fontSize: '8px', backgroundColor: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>Instant Credit</span>
            </div>

            <button
              style={{
                width: '100%',
                backgroundColor: '#2563EB',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '6px',
                fontSize: '10px',
                fontWeight: 700,
              }}
            >
              Apply Instant Payment
            </button>
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
        padding: '24px 20px 28px 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#8E8E93' }}>Welcome to QtPay</span>
          <button
            onClick={handleComplete}
            style={{
              backgroundColor: '#F2F2F7',
              border: 'none',
              color: '#1C1C1E',
              fontSize: '13px',
              fontWeight: 600,
              padding: '6px 18px',
              borderRadius: '16px',
              cursor: 'pointer',
            }}
          >
            Skip
          </button>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#1C1C1E',
            marginTop: '20px',
            marginBottom: '16px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            fontFamily: designSystem.typography.fontFamily,
          }}
        >
          {current.title}
        </h1>
      </div>

      {/* Hero Mockup Graphic Container (matching reference image rounded gray/blue box) */}
      <div
        className="fade-in"
        key={activeSlide}
        style={{
          width: '100%',
          height: '270px',
          backgroundColor: '#EBF3FF',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {current.mockup}
      </div>

      {/* Pagination Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '16px 0 20px 0' }}>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveSlide(index)}
            style={{
              width: activeSlide === index ? '22px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: activeSlide === index ? '#2563EB' : '#D1D5DB',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* Action Buttons Section (matching reference screenshot) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Primary Action Button */}
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: '#2563EB',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '15px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
          }}
        >
          <Briefcase size={18} />
          <span>{current.primaryBtnText}</span>
        </button>

        {/* Secondary Action Button */}
        <button
          onClick={handleComplete}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '15px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <Compass size={18} />
          <span>{current.secondaryBtnText}</span>
        </button>

        {/* Footer Login Link */}
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#6B7280', marginTop: '6px' }}>
          Already have account?{' '}
          <span
            onClick={handleComplete}
            style={{
              color: '#2563EB',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};
