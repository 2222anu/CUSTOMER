import React, { useState } from 'react';
import { Zap, ShieldCheck, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      icon: <Zap size={44} color={designSystem.colors.primary} />,
      badge: 'Lightning Speed',
      title: 'Pay Anyone, Anywhere Instantly',
      description: 'Transfer money via UPI ID, phone number, or scan any QR code with instant 1-tap confirmation.',
      highlights: ['0% Transaction Fee', 'Instant Money Credit', 'Real-time Payment Receipt'],
    },
    {
      icon: <ShieldCheck size={44} color={designSystem.colors.primary} />,
      badge: 'Bank Grade Security',
      title: 'BBPS Utility & Bill Payments',
      description: 'Never miss a due date. Pay electricity, mobile recharge, DTH, and FASTag bills effortlessly.',
      highlights: ['Auto-fetch Monthly Bills', '100% BBPS Guaranteed', 'Cashback & Scratch Rewards'],
    },
    {
      icon: <CreditCard size={44} color={designSystem.colors.primary} />,
      badge: 'Unified Multi-Bank',
      title: 'All Your Banks in One Wallet',
      description: 'Link HDFC, ICICI, SBI, Axis, Kotak and manage account balances and primary status seamlessly.',
      highlights: ['One-click Balance Check', 'Single UPI PIN Security', 'Encrypted SIM Binding'],
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
        backgroundColor: designSystem.colors.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px 32px 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Bar with QtPay Vector Logo & Skip Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <QtPayLogo variant="horizontal" themeMode="light" size={24} />
        <button
          onClick={handleComplete}
          style={{
            backgroundColor: designSystem.colors.subSurface,
            border: `1px solid ${designSystem.colors.borderHairline}`,
            color: designSystem.colors.textSecondary,
            fontSize: '12px',
            fontWeight: designSystem.typography.weights.bold,
            padding: '6px 14px',
            borderRadius: designSystem.radii.full,
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>

      {/* Main Slide Card Container */}
      <div
        className="fade-in"
        key={activeSlide}
        style={{
          margin: '20px 0',
          backgroundColor: designSystem.colors.surface,
          border: `1px solid ${designSystem.colors.borderHairline}`,
          borderRadius: designSystem.radii.lg,
          padding: '28px 24px',
          boxShadow: designSystem.shadows.none,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Icon Emblem Container */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: designSystem.radii.full,
            backgroundColor: designSystem.colors.primaryLight,
            border: `1px solid ${designSystem.colors.primaryBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          {current.icon}
        </div>

        {/* Badge */}
        <span
          style={{
            fontSize: '10px',
            fontWeight: designSystem.typography.weights.extrabold,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            backgroundColor: designSystem.colors.primaryLight,
            color: designSystem.colors.primary,
            padding: '4px 10px',
            borderRadius: designSystem.radii.full,
            marginBottom: '14px',
            border: `1px solid ${designSystem.colors.primaryBorder}`,
          }}
        >
          {current.badge}
        </span>

        {/* Title */}
        <h2
          style={{
            fontSize: '20px',
            fontWeight: designSystem.typography.weights.extrabold,
            color: designSystem.colors.textPrimary,
            marginBottom: '10px',
            lineHeight: '1.3',
          }}
        >
          {current.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '13px',
            color: designSystem.colors.textSecondary,
            lineHeight: '1.5',
            marginBottom: '20px',
          }}
        >
          {current.description}
        </p>

        {/* Highlights List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', borderTop: `1px solid ${designSystem.colors.borderHairline}`, paddingTop: '16px' }}>
          {current.highlights.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: designSystem.colors.textPrimary, fontWeight: designSystem.typography.weights.semibold }}>
              <CheckCircle2 size={16} color={designSystem.colors.primary} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Step Indicator & Action Button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Step Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                width: activeSlide === index ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: activeSlide === index ? designSystem.colors.primary : designSystem.colors.borderStrong,
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>

        <PrimaryButton onClick={handleNext}>
          {activeSlide === slides.length - 1 ? (
            'Get Started with QTPay'
          ) : (
            <>
              Continue <ArrowRight size={18} />
            </>
          )}
        </PrimaryButton>
      </div>
    </div>
  );
};
