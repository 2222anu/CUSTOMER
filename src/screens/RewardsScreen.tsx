import React, { useState } from 'react';
import { Gift, Trophy, Sparkles, X, Check } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';

interface ScratchCardItem {
  id: string;
  title: string;
  subtitle: string;
  rewardText: string;
  rewardType: 'cashback' | 'voucher' | 'points';
  amount?: number;
  isScratched: boolean;
  code?: string;
}

export const RewardsScreen: React.FC = () => {
  const [points, setPoints] = useState(1450);
  const [cards, setCards] = useState<ScratchCardItem[]>([
    {
      id: 'sc-1',
      title: 'UPI Transfer Reward',
      subtitle: 'Earned on ₹2,620 Electricity Payment',
      rewardText: '₹150 Instant Cashback',
      rewardType: 'cashback',
      amount: 150,
      isScratched: false,
    },
    {
      id: 'sc-2',
      title: 'Merchant Super Saver',
      subtitle: 'Earned at Star Supermarket',
      rewardText: 'Flat 25% Off Food & Groceries',
      rewardType: 'voucher',
      code: 'ALPHFOOD25',
      isScratched: false,
    },
    {
      id: 'sc-3',
      title: 'Weekend Bonus Scratch',
      subtitle: 'Special reward for 5+ UPI transactions',
      rewardText: '+500 Extra AlphPoints',
      rewardType: 'points',
      amount: 500,
      isScratched: false,
    },
    {
      id: 'sc-4',
      title: 'Travel Special Voucher',
      subtitle: 'Flight booking discount card',
      rewardText: 'Flat ₹750 Flight Discount',
      rewardType: 'voucher',
      code: 'FLYALPH750',
      isScratched: true,
    },
  ]);

  const [activeCard, setActiveCard] = useState<ScratchCardItem | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleCardClick = (card: ScratchCardItem) => {
    setActiveCard(card);
    setIsRevealed(card.isScratched);
    setIsScratching(false);
  };

  const handleScratchAction = () => {
    if (!activeCard || isRevealed) return;
    setIsScratching(true);
    setTimeout(() => {
      setIsScratching(false);
      setIsRevealed(true);

      // Update card state
      setCards((prev) =>
        prev.map((c) => (c.id === activeCard.id ? { ...c, isScratched: true } : c))
      );

      // Add points if points reward
      if (activeCard.rewardType === 'points' && activeCard.amount) {
        setPoints((p) => p + activeCard.amount!);
      }
    }, 1200);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100vh', paddingBottom: '30px', color: '#FFFFFF' }}>
      <AppHeader title="Rewards & Scratch Cards" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* AlphPoints Balance Hero Banner */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1.5px solid rgba(127, 232, 127, 0.35)',
            borderRadius: '20px',
            padding: '24px 20px',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#FFFFFF',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(127, 232, 127, 0.15)',
              color: '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              border: '1.5px solid rgba(127, 232, 127, 0.3)',
            }}
          >
            <Trophy size={28} />
          </div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#7FE87F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Total Reward Balance
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 6px 0', fontVariantNumeric: 'tabular-nums' }}>
            {points.toLocaleString()} AlphPoints
          </h2>
          <p style={{ fontSize: '12px', color: '#B3B3C2', margin: 0 }}>
            Earn 10 AlphPoints on every ₹100 spent via alph pay
          </p>
        </div>

        {/* Unlocked Scratch Cards Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Unlocked Scratch Cards</h3>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#7FE87F' }}>
            {cards.filter((c) => !c.isScratched).length} Unopened
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="interactive-tap"
              style={{
                backgroundColor: card.isScratched ? '#2A2A3E' : '#3A3A52',
                border: card.isScratched ? '1px solid #4D4D6B' : '1.5px dashed #7FE87F',
                borderRadius: '16px',
                padding: '18px 14px',
                textAlign: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
              }}
            >
              {card.isScratched ? (
                <>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(127, 232, 127, 0.15)',
                      color: '#7FE87F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 8px auto',
                    }}
                  >
                    <Check size={20} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: '#FFFFFF' }}>{card.rewardText}</div>
                  <div style={{ fontSize: '11px', color: '#7FE87F', marginTop: '4px', fontWeight: 800 }}>Claimed</div>
                </>
              ) : (
                <>
                  <Sparkles size={28} color="#7FE87F" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontWeight: 800, fontSize: '13px', color: '#FFFFFF' }}>Tap to Scratch</div>
                  <div style={{ fontSize: '11px', color: '#B3B3C2', marginTop: '4px', fontWeight: 700 }}>
                    {card.title}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Scratch Modal */}
      {activeCard && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 15, 26, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveCard(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
              borderRadius: '20px',
              padding: '24px',
              textAlign: 'center',
              position: 'relative',
              animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCard(null)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#3A3A52',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#B3B3C2',
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '8px 0 4px 0' }}>
              {activeCard.title}
            </h3>
            <p style={{ fontSize: '12px', color: '#B3B3C2', margin: '0 0 20px 0' }}>{activeCard.subtitle}</p>

            {/* Scratch Surface Box */}
            <div
              onClick={handleScratchAction}
              style={{
                width: '200px',
                height: '200px',
                margin: '0 auto 20px auto',
                borderRadius: '20px',
                backgroundColor: isRevealed ? '#1A1A2E' : '#3A3A52',
                border: isRevealed ? '2px solid #7FE87F' : '2px dashed #7FE87F',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isRevealed ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isScratching ? (
                <div>
                  <Sparkles size={36} color="#7FE87F" style={{ animation: 'spin 1s linear infinite' }} />
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginTop: '10px' }}>
                    Revealing Reward...
                  </div>
                </div>
              ) : isRevealed ? (
                <div style={{ padding: '16px' }}>
                  <Gift size={40} color="#7FE87F" style={{ margin: '0 auto 10px auto' }} />
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                    {activeCard.rewardText}
                  </div>
                  {activeCard.code && (
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '6px 12px',
                        backgroundColor: '#2A2A3E',
                        border: '1px dashed #7FE87F',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 800,
                        color: '#7FE87F',
                        letterSpacing: '0.05em',
                      }}
                    >
                      CODE: {activeCard.code}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Sparkles size={40} color="#7FE87F" style={{ margin: '0 auto 10px auto' }} />
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Tap to Scratch</div>
                  <div style={{ fontSize: '11px', color: '#B3B3C2', marginTop: '4px' }}>Click to reveal your reward!</div>
                </div>
              )}
            </div>

            {isRevealed ? (
              <button
                onClick={() => setActiveCard(null)}
                className="interactive-tap"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#7FE87F',
                  border: 'none',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Claimed & Saved
              </button>
            ) : (
              <button
                onClick={handleScratchAction}
                className="interactive-tap"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#7FE87F',
                  border: 'none',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Scratch Now
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
