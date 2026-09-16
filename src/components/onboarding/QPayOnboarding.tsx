import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { AlphPayLogo } from '../AlphPayLogo';
import { QPayOnboardingProgress } from './QPayOnboardingProgress';
import { QPayOnboardingSlide, type OnboardingSlideData } from './QPayOnboardingSlide';
import { CardsIllustration } from './CardsIllustration';
import { HubIllustration } from './HubIllustration';
import { SecurityIllustration } from './SecurityIllustration';
import { useApp } from '../../state/AppContext';

interface QPayOnboardingProps {
  onComplete: () => void;
}

export const QPayOnboarding: React.FC<QPayOnboardingProps> = ({ onComplete }) => {
  const { language, setAppLanguage, isRtl } = useApp();
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

    // Adjust for RTL direction if Arabic
    const swipeForward = isRtl ? diff < -threshold : diff > threshold;
    const swipeBackward = isRtl ? diff > threshold : diff < -threshold;

    if (swipeForward && currentSlide < slides.length - 1) {
      handleNext();
    } else if (swipeBackward && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (isRtl) {
          if (currentSlide > 0) goToSlide(currentSlide - 1);
        } else {
          if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) {
          if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
        } else {
          if (currentSlide > 0) goToSlide(currentSlide - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isRtl]);

  const slides: OnboardingSlideData[] = [
    {
      id: 'cards',
      title: language === 'العربية' ? 'تحويل فوري لأي شخص' : 'Pay Anyone Instantly',
      subtitle: language === 'العربية'
        ? 'إرسال واستلام الأموال عبر جميع البنوك السعودية فوراً وبدون أي رسوم.'
        : 'Send and receive money across all Saudi banks with zero fees.',
      visual: <CardsIllustration />,
    },
    {
      id: 'wealth',
      title: language === 'العربية' ? 'جميع بنوكك في مكان واحد' : 'All Banks in One Place',
      subtitle: language === 'العربية'
        ? 'اربط حساباتك البنكية واطلع على جميع أرصدتك في واجهة موحدة.'
        : 'Link your accounts and view your balances at a glance.',
      visual: <HubIllustration />,
    },
    {
      id: 'security',
      title: language === 'العربية' ? 'أمان وحماية موثوقة' : 'Safe & Protected',
      subtitle: language === 'العربية'
        ? 'حماية متقدمة وموثقة عبر نفاذ وأبشر وتحت مظلة البنك المركزي السعودي.'
        : 'Secured by Absher verification and SAMA regulations.',
      visual: <SecurityIllustration />,
    },
  ];

  const isFinalSlide = currentSlide === slides.length - 1;

  const toggleLanguage = () => {
    triggerHaptic();
    const nextLang = language === 'العربية' ? 'English' : 'العربية';
    setAppLanguage(nextLang);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0B0B14',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 24px 28px 24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Top Bar: Brand, Language Toggle & Skip Pill */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: '4px',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlphPayLogo variant="horizontal" size={24} themeMode="dark" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Quick Language Toggle Pill */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="interactive-tap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
              border: '1px solid var(--brand-green-border, rgba(127, 232, 127, 0.35))',
              color: 'var(--brand-green, #7FE87F)',
              fontSize: '11.5px',
              fontWeight: 800,
              padding: '5px 10px',
              borderRadius: '16px',
              cursor: 'pointer',
            }}
          >
            <Globe size={13} />
            <span>{language === 'العربية' ? 'English' : '🇸🇦 العربية'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic();
              onComplete();
            }}
            className="interactive-tap"
            style={{
              backgroundColor: '#1E1E32',
              border: '1px solid #2C2C44',
              color: '#A2A2BA',
              fontSize: '12px',
              fontWeight: 700,
              padding: '5px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            {language === 'العربية' ? 'تخطي' : 'Skip'}
          </button>
        </div>
      </header>

      {/* Main Slide Carousel Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'relative',
          margin: '10px 0',
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
              alignItems: 'center',
            }}
          >
            <QPayOnboardingSlide slide={slide} isActive={index === currentSlide} />
          </div>
        ))}
      </main>

      {/* Bottom Controls: Pagination + Pill Button */}
      <footer
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          zIndex: 10,
        }}
      >
        {/* Pagination Dots */}
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
            maxWidth: '320px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#7FE87F',
            color: '#0B0B14',
            border: 'none',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.01em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <span>
            {isFinalSlide
              ? language === 'العربية' ? 'ابدأ الآن' : 'Get started'
              : language === 'العربية' ? 'التالي' : 'Next'}
          </span>
          <ArrowRight size={16} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
        </button>
      </footer>
    </div>
  );
};
