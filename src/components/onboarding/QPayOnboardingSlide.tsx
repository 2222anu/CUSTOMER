import React from 'react';

export interface OnboardingSlideData {
  id: string;
  category: string;
  title: string;
  headline: string[];
  description: string;
  tags: string[];
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

      {/* Editorial Content Container */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 16px',
          boxSizing: 'border-box',
          marginTop: 'auto',
        }}
      >
        {/* Dominant Feature Word (Oversized Brand Statement) */}
        <div
          style={{
            fontSize: '38px',
            fontWeight: 900,
            letterSpacing: '0.14em',
            color: '#0e274d',
            lineHeight: 1,
            marginBottom: '8px',
            textTransform: 'uppercase',
            background: 'linear-gradient(180deg, #0a192f 0%, #1d4ed8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {slide.title}
        </div>

        {/* 2-Line Headline */}
        <div
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: '1.28',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          {slide.headline.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>

        {/* Supporting Concise Text */}
        <p
          style={{
            fontSize: '13px',
            color: '#64748b',
            lineHeight: '1.5',
            margin: '0 0 14px 0',
            maxWidth: '320px',
            fontWeight: 500,
          }}
        >
          {slide.description}
        </p>

        {/* Subtle Minimal Pill Tagline */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 14px',
            borderRadius: '20px',
            backgroundColor: '#eef5ff',
            border: '1px solid #d6e6ff',
            color: '#1d4ed8',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '12px',
          }}
        >
          {slide.tags.join('  •  ')}
        </div>
      </div>
    </div>
  );
};
