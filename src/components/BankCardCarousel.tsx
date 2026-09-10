import React, { useState, useRef } from 'react';
import type { BankAccount } from '../types';
import { Eye, EyeOff, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { useApp } from '../state/AppContext';

interface BankCardCarouselProps {
  banks: BankAccount[];
}

export const BankCardCarousel: React.FC<BankCardCarouselProps> = ({ banks }) => {
  const { toggleShowBalance } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = 320;
      const index = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), banks.length - 1));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = 329;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={{ marginBottom: '20px', position: 'relative' }}>
      {/* Optional Left / Right Scroll Buttons */}
      {banks.length > 1 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '6px',
            right: '6px',
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'space-between',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <button
            onClick={() => scrollByAmount('left')}
            style={{
              pointerEvents: 'auto',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(11, 31, 58, 0.85)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollByAmount('right')}
            style={{
              pointerEvents: 'auto',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(11, 31, 58, 0.85)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Scrollable Container with Partial Right Card Visibility */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        style={{
          display: 'flex',
          gap: '14px',
          overflowX: 'auto',
          scrollSnapType: isMouseDown ? 'none' : 'x mandatory',
          padding: '4px 20px 10px 20px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: isMouseDown ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
      >
        {banks.map((bank) => (
          <div
            key={bank.id}
            style={{
              scrollSnapAlign: 'start',
              flex: '0 0 100%',
              height: '185px',
              backgroundColor: '#111144',
              border: bank.isPrimary ? '1.5px solid #F98513' : '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '20px',
              boxShadow: bank.isPrimary
                ? '0 10px 30px rgba(17, 17, 68, 0.45), 0 0 15px rgba(249, 133, 19, 0.25)'
                : '0 10px 25px rgba(17, 17, 68, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              color: '#FFFFFF',
            }}
          >
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(249, 133, 19, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F98513',
                  }}
                >
                  <CreditCard size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '16px', color: '#FFFFFF' }}>{bank.bankName}</div>
                  <div style={{ fontSize: '12px', color: '#A4BCEE', marginTop: '2px' }}>
                    {bank.accountType} &bull; {bank.accountNumberMasked}
                  </div>
                </div>
              </div>

              {bank.isPrimary && (
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: '#F98513',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '10px',
                  }}
                >
                  Primary Account
                </span>
              )}
            </div>

            {/* Balance Bar */}
            <div
              style={{
                backgroundColor: 'rgba(34, 51, 130, 0.75)',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Available Balance
                </div>
                <div style={{ fontSize: '22px', fontWeight: '800', marginTop: '2px', color: '#FFFFFF' }}>
                  {bank.showBalance ? formatCurrency(bank.balance) : '••••••••'}
                </div>
              </div>

              <button
                onClick={() => toggleShowBalance(bank.id)}
                style={{
                  backgroundColor: '#F98513',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(249, 133, 19, 0.3)',
                }}
              >
                {bank.showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
                {bank.showBalance ? 'Hide' : 'Check Balance'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Indicators / Dots */}
      {banks.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '2px' }}>
          {banks.map((_, i) => (
            <div
              key={i}
              style={{
                width: activeIndex === i ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: activeIndex === i ? '#F98513' : 'rgba(17, 17, 68, 0.25)',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
