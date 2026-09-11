import React, { useState, useRef } from 'react';
import type { BankAccount } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

interface BankCardCarouselProps {
  banks: BankAccount[];
}

const getBankLogoTag = (bankName: string) => {
  const nameUpper = bankName.toUpperCase();
  if (nameUpper.includes('HDFC')) return { text: 'HDFC' };
  if (nameUpper.includes('STATE') || nameUpper.includes('SBI')) return { text: 'SBI' };
  if (nameUpper.includes('ICICI')) return { text: 'ICICI' };
  if (nameUpper.includes('AXIS')) return { text: 'AXIS' };
  return { text: bankName.substring(0, 4).toUpperCase() };
};

export const BankCardCarousel: React.FC<BankCardCarouselProps> = ({ banks }) => {
  const { navigateTo, openPinModal, toggleShowBalance } = useApp();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

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

  const handleSwipeClick = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      if (isAtEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 280, behavior: 'smooth' });
      }
    }
  };

  const handleCardBalanceClick = (bank: BankAccount, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bank.showBalance) {
      toggleShowBalance(bank.id);
    } else {
      openPinModal({
        title: `Check ${bank.bankName} Balance`,
        subTitle: `${bank.accountType} • ${bank.accountNumberMasked}`,
        amount: bank.balance,
        onSuccess: () => toggleShowBalance(bank.id),
      });
    }
  };

  return (
    <div style={{ marginBottom: designSystem.spacing['2xl'] }}>
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          marginBottom: designSystem.spacing.md,
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary }}>My Bank Accounts</h3>
        <button
          onClick={handleSwipeClick}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '13px',
            fontWeight: designSystem.typography.weights.extrabold,
            color: designSystem.colors.primary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
          title="Click to scroll next bank account card"
        >
          Swipe &rarr;
        </button>
      </div>

      {/* Swipable Carousel with Partial Next Card Preview (Peek) */}
      <div
        ref={carouselRef}
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
        {banks.map((bank) => {
          const logoTag = getBankLogoTag(bank.bankName);

          return (
            <div
              key={bank.id}
              onClick={() => navigateTo('BANK_ACCOUNTS')}
              style={{
                scrollSnapAlign: 'start',
                flex: '0 0 270px',
                backgroundColor: designSystem.colors.surface,
                border: bank.isPrimary ? `2px solid ${designSystem.colors.primary}` : `1px solid ${designSystem.colors.borderHairline}`,
                borderRadius: designSystem.radii.md,
                padding: '16px 18px',
                boxShadow: designSystem.shadows.none,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                cursor: 'pointer',
                color: designSystem.colors.textPrimary,
              }}
            >
              {/* Top Row: Logo Box & Primary Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: designSystem.radii.md,
                    backgroundColor: designSystem.colors.primaryLight,
                    color: designSystem.colors.primary,
                    fontWeight: designSystem.typography.weights.extrabold,
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${designSystem.colors.primaryBorder}`,
                  }}
                >
                  {logoTag.text}
                </div>

                {bank.isPrimary && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: designSystem.typography.weights.extrabold,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      backgroundColor: designSystem.colors.primary,
                      color: designSystem.colors.textOnPrimary,
                      padding: '3px 8px',
                      borderRadius: designSystem.radii.xs,
                    }}
                  >
                    Primary
                  </span>
                )}
              </div>

              {/* Middle Section: Bank Name & Account Type */}
              <div style={{ marginTop: '12px' }}>
                <div
                  style={{
                    fontWeight: designSystem.typography.weights.extrabold,
                    fontSize: '15px',
                    color: designSystem.colors.textPrimary,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {bank.bankName}
                </div>
                <div style={{ fontSize: '12px', color: designSystem.colors.textSecondary, marginTop: '2px' }}>
                  {bank.accountType} &bull; {bank.accountNumberMasked}
                </div>
              </div>

              {/* Bottom Section: Balance with PIN Check */}
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary }}>
                  {bank.showBalance !== false ? formatCurrency(bank.balance) : '₹ ••••••••'}
                </div>
                <button
                  onClick={(e) => handleCardBalanceClick(bank, e)}
                  style={{
                    backgroundColor: bank.showBalance ? designSystem.colors.subSurface : designSystem.colors.primary,
                    border: bank.showBalance ? `1px solid ${designSystem.colors.borderHairline}` : 'none',
                    borderRadius: designSystem.radii.sm,
                    color: bank.showBalance ? designSystem.colors.textPrimary : designSystem.colors.textOnPrimary,
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: designSystem.typography.weights.bold,
                    cursor: 'pointer',
                    boxShadow: designSystem.shadows.none,
                  }}
                >
                  {bank.showBalance ? 'Hide' : 'PIN Check'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
