import React, { useState, useRef } from 'react';
import type { BankAccount } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useApp } from '../state/AppContext';
import { Landmark, Eye, EyeOff, Plus, Wifi, ChevronRight } from 'lucide-react';

interface BankCardCarouselProps {
  banks: BankAccount[];
}

const getBankStyle = (bankName: string) => {
  const nameUpper = bankName.toUpperCase();
  if (nameUpper.includes('HDFC')) {
    return {
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
      tagText: 'HDFC BANK',
    };
  }
  if (nameUpper.includes('STATE') || nameUpper.includes('SBI')) {
    return {
      gradient: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
      tagText: 'SBI BANK',
    };
  }
  if (nameUpper.includes('ICICI')) {
    return {
      gradient: 'linear-gradient(135deg, #991b1b 0%, #c2410c 100%)',
      tagText: 'ICICI BANK',
    };
  }
  if (nameUpper.includes('AXIS')) {
    return {
      gradient: 'linear-gradient(135deg, #831843 0%, #9d174d 100%)',
      tagText: 'AXIS BANK',
    };
  }
  return {
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)',
    tagText: bankName.toUpperCase(),
  };
};

export const BankCardCarousel: React.FC<BankCardCarouselProps> = ({ banks }) => {
  const { navigateTo, openPinModal, toggleShowBalance, setIsAddBankModalOpen } = useApp();
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
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            My Bank Accounts
          </h3>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: '#eef5ff',
              color: '#2563eb',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid #d6e6ff',
            }}
          >
            {banks.length} Linked
          </span>
        </div>

        <button
          onClick={() => navigateTo('BANK_ACCOUNTS')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            color: '#2563eb',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          Manage <ChevronRight size={14} />
        </button>
      </div>

      {/* Swipable Cards Container */}
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
          const style = getBankStyle(bank.bankName);

          return (
            <div
              key={bank.id}
              onClick={() => navigateTo('BANK_ACCOUNTS')}
              style={{
                scrollSnapAlign: 'start',
                flex: '0 0 280px',
                height: '160px',
                background: style.gradient,
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                cursor: 'pointer',
                color: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: bank.isPrimary ? '0 8px 20px rgba(37, 99, 235, 0.25)' : 'none',
                border: bank.isPrimary ? '2px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              {/* Background Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-20%',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  pointerEvents: 'none',
                }}
              />

              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Landmark size={18} color="#ffffff" />
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em' }}>
                      {style.tagText}
                    </span>
                    <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.75)' }}>
                      {bank.accountType}
                    </div>
                  </div>
                </div>

                {/* EMV Chip & Primary Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {bank.isPrimary && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        backgroundColor: '#ffffff',
                        color: '#2563eb',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Primary
                    </span>
                  )}
                  <Wifi size={16} color="rgba(255, 255, 255, 0.7)" />
                </div>
              </div>

              {/* Account Number Masked */}
              <div style={{ zIndex: 2, margin: '8px 0' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'monospace' }}>
                  •••• •••• {bank.accountNumberMasked.replace(/[^0-9]/g, '') || '4892'}
                </div>
              </div>

              {/* Card Footer: Balance & PIN Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Balance
                  </span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                    {bank.showBalance !== false ? formatCurrency(bank.balance) : '₹ ••••••••'}
                  </div>
                </div>

                <button
                  onClick={(e) => handleCardBalanceClick(bank, e)}
                  style={{
                    backgroundColor: bank.showBalance ? 'rgba(255, 255, 255, 0.2)' : '#ffffff',
                    color: bank.showBalance ? '#ffffff' : '#2563eb',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {bank.showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
                  {bank.showBalance ? 'Hide' : 'PIN Check'}
                </button>
              </div>
            </div>
          );
        })}

        {/* Add New Bank Card CTA Tile */}
        <div
          onClick={() => setIsAddBankModalOpen(true)}
          style={{
            scrollSnapAlign: 'start',
            flex: '0 0 140px',
            height: '160px',
            backgroundColor: '#ffffff',
            border: '2px dashed #cbd5e1',
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
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#eef5ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus size={20} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Add Bank</span>
          <span style={{ fontSize: '10px', color: '#64748b' }}>Link new account</span>
        </div>
      </div>
    </div>
  );
};
