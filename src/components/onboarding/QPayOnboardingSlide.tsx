import React from 'react';

export interface OnboardingSlideData {
  id: string;
  category: string;
  title: string;
  headline: string[];
  visual: React.ReactNode;
}

interface QPayOnboardingSlideProps {
  slide: OnboardingSlideData;
  isActive: boolean;
}

export const QPayOnboardingSlide: React.FC<QPayOnboardingSlideProps> = ({
  slide,
  isActive,
}) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'scale(1) translateY(0px)' : 'scale(0.96) translateY(8px)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* 3D Visual Centerpiece */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '10px 0 6px 0',
          minHeight: '320px',
        }}
      >
        {slide.visual}
      </div>

      {/* Editorial Content Container - Minimal, Oversized, Pure Headline Only */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 20px',
          boxSizing: 'border-box',
          marginTop: 'auto',
          marginBottom: '8px',
        }}
      >
        {/* Dominant Feature Word (Oversized Brand Statement) */}
        <div
          style={{
            fontSize: '40px',
            fontWeight: 900,
            letterSpacing: '0.14em',
            color: '#7FE87F',
            lineHeight: 1,
            marginBottom: '10px',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(127, 232, 127, 0.4)',
          }}
        >
          {slide.title}
        </div>

        {/* 2-Line Bold Headline */}
        <div
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: '1.28',
            letterSpacing: '-0.02em',
          }}
        >
          {slide.headline.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
