import React, { useState, useRef } from 'react';
import type { BankAccount } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useApp } from '../state/AppContext';
import { Landmark, Eye, EyeOff, Plus, ChevronRight, ShieldCheck } from 'lucide-react';

interface BankCardCarouselProps {
  banks: BankAccount[];
}

const getBankStyle = (_bankName: string, isPrimary: boolean) => {
  return {
    background: isPrimary
      ? 'linear-gradient(135deg, #18182E 0%, #151524 60%, #12121E 100%)'
      : 'linear-gradient(135deg, #151524 0%, #12121E 100%)',
    borderColor: isPrimary ? '#7FE87F' : '#2C2C44',
  };
};

export const BankCardCarousel: React.FC<BankCardCarouselProps> = ({ banks }) => {
  const { navigateTo, openPinModal, toggleShowBalance, setIsAddBankModalOpen, t, language, isRtl } = useApp();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

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

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const cardWidth = 320;
    const scrollPos = Math.abs(carouselRef.current.scrollLeft);
    const index = Math.round(scrollPos / cardWidth);
    setActiveCardIndex(Math.min(Math.max(index, 0), banks.length - 1));
  };

  const handleCardBalanceClick = (bank: BankAccount, e: React.MouseEvent) => {
    e.stopPropagation();
    const bankTitle = t(bank.bankName, bank.bankName);
    const accType = t(bank.accountType, bank.accountType);

    if (bank.showBalance) {
      toggleShowBalance(bank.id);
    } else {
      openPinModal({
        title: `${t('banks.check_balance', 'Check Balance')} - ${bankTitle}`,
        subTitle: `${accType} • ${bank.accountNumberMasked}`,
        amount: bank.balance,
        onSuccess: () => toggleShowBalance(bank.id),
      });
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            {t('banks.title', 'My Bank Accounts')}
          </h3>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: 'rgba(127, 232, 127, 0.12)',
              color: '#7FE87F',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid rgba(127, 232, 127, 0.25)',
            }}
          >
            {language === 'العربية' ? `${banks.length} حسابات مرتبطة` : `${banks.length} Linked`}
          </span>
        </div>

        <button
          onClick={() => navigateTo('BANK_ACCOUNTS')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            color: '#7FE87F',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            boxShadow: 'none',
          }}
        >
          {t('banks.title', 'Manage')} <ChevronRight size={14} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
        </button>
      </div>

      {/* Swipable Cards Container */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          gap: '14px',
          overflowX: 'auto',
          scrollSnapType: isMouseDown ? 'none' : 'x mandatory',
          padding: '4px 20px 10px 20px',
          scrollPadding: '0 20px',
          scrollPaddingInline: '20px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: isMouseDown ? 'grabbing' : 'grab',
          userSelect: 'none',
          boxSizing: 'border-box',
        }}
      >
        {banks.map((bank) => {
          const style = getBankStyle(bank.bankName, bank.isPrimary);
          const rawNumbers = bank.accountNumberMasked.replace(/[^0-9]/g, '') || '3616';
          const displayBankName = t(bank.bankName, bank.bankName);
          const displayAccType = t(bank.accountType, bank.accountType);

          return (
            <div
              key={bank.id}
              onClick={() => navigateTo('BANK_ACCOUNTS')}
              className="interactive-tap"
              style={{
                scrollSnapAlign: 'start',
                flex: '0 0 min(315px, calc(100% - 40px))',
                width: 'min(315px, calc(100% - 40px))',
                height: '175px',
                background: style.background,
                borderRadius: '16px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                cursor: 'pointer',
                color: '#FFFFFF',
                position: 'relative',
                overflow: 'hidden',
                border: `1.5px solid ${style.borderColor}`,
                boxShadow: 'none',
              }}
            >
              {/* 1. Card Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1, paddingInlineEnd: '8px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(127, 232, 127, 0.12)',
                      border: '1px solid rgba(127, 232, 127, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Landmark size={18} color="#7FE87F" />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.01em', lineHeight: '17px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {displayBankName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                      <span>{displayAccType}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#7FE87F', fontWeight: 600 }}>
                        <ShieldCheck size={11} color="#7FE87F" /> {language === 'العربية' ? 'مرتبط بسريع' : 'Sarie Linked'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Pill Badge */}
                {bank.isPrimary && (
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      backgroundColor: 'rgba(127, 232, 127, 0.15)',
                      color: '#7FE87F',
                      border: '1px solid #7FE87F',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                    }}
                  >
                    {t('banks.primary', 'PRIMARY')}
                  </span>
                )}
              </div>

              {/* 2. Middle Row: Chip Graphic + Masked Number */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, margin: '6px 0' }}>
                {/* Gold EMV Chip Graphic */}
                <div style={{ width: '32px', height: '23px', borderRadius: '4px', background: 'linear-gradient(135deg, #ffd700 0%, #e6a817 50%, #b8860b 100%)', padding: '2px', boxSizing: 'border-box', border: '1px solid rgba(0,0,0,0.2)' }}>
                  <div style={{ width: '100%', height: '100%', border: '0.5px solid rgba(0,0,0,0.2)', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '2px 0' }}>
                    <div style={{ height: '0.5px', backgroundColor: 'rgba(0,0,0,0.3)', width: '100%' }} />
                    <div style={{ height: '0.5px', backgroundColor: 'rgba(0,0,0,0.3)', width: '100%' }} />
                  </div>
                </div>

                {/* Masked Card Number */}
                <div style={{ fontSize: '13.5px', fontWeight: 700, letterSpacing: '0.14em', color: '#FFFFFF', fontFamily: 'monospace', direction: 'ltr' }}>
                  ••••  ••••  ••••  {rawNumbers}
                </div>
              </div>

              {/* 3. Card Footer: Available Balance & Clean Check Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                <div>
                  <div style={{ fontSize: '9.5px', color: '#A2A2BA', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>
                    {t('home.total_balance', 'Available Balance')}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', marginTop: '2px', letterSpacing: '0.01em' }}>
                    {bank.showBalance ? formatCurrency(bank.balance, language) : (language === 'العربية' ? '•••••••• ر.س' : 'SAR ••••••••')}
                  </div>
                </div>

                <button
                  onClick={(e) => handleCardBalanceClick(bank, e)}
                  title={t('banks.check_balance', 'Check Balance')}
                  className="interactive-tap"
                  style={{
                    backgroundColor: bank.showBalance ? '#1E1E32' : '#7FE87F',
                    color: bank.showBalance ? '#FFFFFF' : '#000000',
                    border: bank.showBalance ? '1px solid #2C2C44' : 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {bank.showBalance ? <EyeOff size={13} color="#FFFFFF" /> : <Eye size={13} color="#000000" />}
                  {bank.showBalance ? t('home.hide', 'Hide') : t('banks.check_balance', 'Check Balance')}
                </button>
              </div>
            </div>
          );
        })}

        {/* Add Bank CTA Card */}
        <div
          onClick={() => setIsAddBankModalOpen(true)}
          className="interactive-tap"
          style={{
            scrollSnapAlign: 'start',
            flex: '0 0 135px',
            height: '175px',
            backgroundColor: '#151524',
            border: '1.5px dashed #2C2C44',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxSizing: 'border-box',
            textAlign: 'center',
            boxShadow: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(127, 232, 127, 0.12)',
              color: '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(127, 232, 127, 0.25)',
            }}
          >
            <Plus size={20} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>{t('banks.add_bank', 'Add Bank')}</span>
          <span style={{ fontSize: '10.5px', color: '#A2A2BA' }}>{language === 'العربية' ? 'ربط حساب' : 'Link Account'}</span>
        </div>
        <div style={{ flex: '0 0 1px', width: '1px', flexShrink: 0 }} />
      </div>

      {/* Card Pagination Indicator Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
        {banks.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === activeCardIndex ? '16px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: i === activeCardIndex ? '#7FE87F' : '#2C2C44',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
