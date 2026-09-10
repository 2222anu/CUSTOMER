import React, { useState } from 'react';
import { Zap, ShieldCheck, Landmark, ArrowRight } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Zap size={56} color="#25272C" />,
      title: 'Fast & Secure UPI Payments',
      description: 'Send and receive money instantly with 256-bit banking-grade security across all networks.',
    },
    {
      icon: <ShieldCheck size={56} color="#25272C" />,
      title: 'Instant Bill Payments',
      description: 'Pay electricity, water, gas, mobile prepaid, and broadband bills effortlessly in one tap.',
    },
    {
      icon: <Landmark size={56} color="#25272C" />,
      title: 'Manage Multiple Bank Accounts',
      description: 'Link ICICI Bank, Yes Bank, Kotak, HDFC and manage balances & primary status from one app.',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigateTo('MOBILE_NUMBER');
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '30px 24px 40px 24px',
        textAlign: 'center',
      }}
    >
      {/* Top Header with QTPay Logo & Skip Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <QtPayLogo variant="horizontal" themeMode="light" />
        <button
          onClick={handleComplete}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(37, 39, 44, 0.65)',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>

      {/* Feature Visual Card */}
      <div className="fade-in" key={currentSlide} style={{ padding: '20px 0' }}>
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '40px',
            backgroundColor: '#B8F7E4',
            border: '2px solid #B8F7E4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px auto',
            boxShadow: '0 10px 30px rgba(184, 247, 228, 0.5)',
          }}
        >
          {slides[currentSlide].icon}
        </div>

        <h2
          style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#25272C',
            marginBottom: '12px',
            lineHeight: '1.3',
          }}
        >
          {slides[currentSlide].title}
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'rgba(37, 39, 44, 0.65)',
            lineHeight: '1.5',
            maxWidth: '300px',
            margin: '0 auto',
          }}
        >
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Bottom Progress Indicator & Action Button */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '30px' }}>
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                width: currentSlide === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentSlide === index ? '#B8F7E4' : 'rgba(37, 39, 44, 0.15)',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>

        <PrimaryButton onClick={handleNext}>
          {currentSlide === slides.length - 1 ? (
            'Get Started'
          ) : (
            <>
              Next <ArrowRight size={18} />
            </>
          )}
        </PrimaryButton>
      </div>
    </div>
  );
};
