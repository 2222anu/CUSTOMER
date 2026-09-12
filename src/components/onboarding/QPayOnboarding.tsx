import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { QtPayLogo } from '../QtPayLogo';
import { QPayOnboardingBackground } from './QPayOnboardingBackground';
import { QPayOnboardingProgress } from './QPayOnboardingProgress';
import { QPayOnboardingSlide, type OnboardingSlideData } from './QPayOnboardingSlide';
import { PayScene } from './PayScene';
import { ManageScene } from './ManageScene';
import { ProtectScene } from './ProtectScene';

interface QPayOnboardingProps {
  onComplete: () => void;
}

export const QPayOnboarding: React.FC<QPayOnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Touch gesture handling for smooth horizontal swiping
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const triggerHaptic = () => {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(15);
      }
    } catch {
      // Ignore vibration errors
    }
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      triggerHaptic();
      setCurrentSlide(index);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      triggerHaptic();
      onComplete();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 45;

    if (diff > threshold && currentSlide < slides.length - 1) {
      // Swiped Left -> Next slide
      handleNext();
    } else if (diff < -threshold && currentSlide > 0) {
      // Swiped Right -> Previous slide
      goToSlide(currentSlide - 1);
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) goToSlide(currentSlide - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slides: OnboardingSlideData[] = [
    {
      id: 'pay',
      category: 'INSTANT PAYMENTS',
      title: 'PAY',
      headline: ['Pay everywhere.', 'Pay instantly.'],
      visual: <PayScene />,
    },
    {
      id: 'manage',
      category: 'FINANCIAL COMMAND',
      title: 'MANAGE',
      headline: ['All your money.', 'One simple place.'],
      visual: <ManageScene />,
    },
    {
      id: 'protect',
      category: 'MIL-SPEC DEFENSE',
      title: 'PROTECT',
      headline: ['Your money.', 'Your control.'],
      visual: <ProtectScene />,
    },
  ];

  const isFinalSlide = currentSlide === slides.length - 1;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 20px 24px 20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 3D Studio Lighting Backdrop */}
      <QPayOnboardingBackground />

      {/* Top Header: Logo + Minimal Skip */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: '6px',
        }}
      >
        <QtPayLogo variant="horizontal" size={24} showTagline={false} />

        <button
          type="button"
          onClick={() => {
            triggerHaptic();
            onComplete();
          }}
          className="interactive-tap"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            fontSize: '13px',
            fontWeight: 700,
            padding: '6px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            letterSpacing: '0.02em',
            transition: 'color 0.2s ease',
          }}
        >
          <span>Skip</span>
          <ChevronRight size={14} />
        </button>
      </header>

      {/* Slide Visual Area (Smooth Cross-fade & Continuous Transform) */}
      <main
        style={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          margin: '4px 0',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: index === currentSlide ? 'relative' : 'absolute',
              inset: 0,
              width: '100%',
              display: index === currentSlide ? 'flex' : 'none',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <QPayOnboardingSlide slide={slide} isActive={index === currentSlide} />
          </div>
        ))}
      </main>

      {/* Bottom Controls: Milkinside Pagination + Primary Button */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          paddingTop: '8px',
        }}
      >
        {/* Pagination Dots [ ● ○ ○ ] */}
        <QPayOnboardingProgress
          total={slides.length}
          activeIndex={currentSlide}
          onSelectDot={goToSlide}
        />

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleNext}
          className="interactive-tap"
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '16px',
            background: isFinalSlide
              ? 'linear-gradient(135deg, #0e274d 0%, #1d4ed8 50%, #2e83ff 100%)'
              : 'linear-gradient(135deg, #2e83ff 0%, #1d4ed8 100%)',
            color: '#ffffff',
            border: 'none',
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: isFinalSlide
              ? '0 12px 28px rgba(14, 39, 77, 0.35)'
              : '0 10px 25px rgba(46, 131, 255, 0.35)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span>{isFinalSlide ? 'Get Started' : 'Continue'}</span>
          <ArrowRight size={18} />
        </button>
      </footer>
    </div>
  );
};
