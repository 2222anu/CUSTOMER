import React, { useState } from 'react';
import { Gift, Trophy, Sparkles, X, CheckCircle } from 'lucide-react';
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
      code: 'QTPAYFOOD25',
      isScratched: false,
    },
    {
      id: 'sc-3',
      title: 'Weekend Bonus Scratch',
      subtitle: 'Special reward for 5+ UPI transactions',
      rewardText: '+500 Extra QTPoints',
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
      code: 'FLYQTPAY750',
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
    <div className="fade-in" style={{ backgroundColor: '#F4F1EC', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Rewards & Scratch Cards" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* QTPoints Balance Hero Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E295D 0%, #111144 100%)',
            border: '1.5px solid #F98513',
            borderRadius: '24px',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '24px',
            boxShadow: '0 10px 30px rgba(17, 17, 68, 0.45), 0 0 15px rgba(249, 133, 19, 0.25)',
            color: '#FFFFFF',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#F98513',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: '0 0 20px rgba(249, 133, 19, 0.5)',
            }}
          >
            <Trophy size={28} />
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#A4BCEE', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Total Reward Balance
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#FFFFFF', margin: '4px 0 6px 0' }}>
            {points.toLocaleString()} QTPoints
          </h2>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            Earn 10 QTPoints on every ₹100 spent via QTPay UPI
          </p>
        </div>

        {/* Unlocked Scratch Cards Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#111144' }}>Unlocked Scratch Cards</h3>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#F98513' }}>
            {cards.filter((c) => !c.isScratched).length} Unopened
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              style={{
                backgroundColor: card.isScratched ? '#FFFFFF' : '#111144',
                border: card.isScratched ? '1.5px solid #DAD1C8' : '1.5px dashed #F98513',
                borderRadius: '20px',
                padding: '18px 14px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: card.isScratched ? '0 4px 14px rgba(0,0,0,0.05)' : '0 6px 20px rgba(17, 17, 68, 0.3)',
                transition: 'transform 0.15s ease',
                color: card.isScratched ? '#111144' : '#FFFFFF',
              }}
            >
              {card.isScratched ? (
                <>
                  <CheckCircle size={30} color="#10B981" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontWeight: '800', fontSize: '13px', color: '#111144' }}>{card.rewardText}</div>
                  <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', fontWeight: '700' }}>Claimed</div>
                </>
              ) : (
                <>
                  <Sparkles size={30} color="#F98513" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontWeight: '800', fontSize: '13px', color: '#FFFFFF' }}>Tap to Scratch</div>
                  <div style={{ fontSize: '11px', color: '#F98513', marginTop: '4px', fontWeight: '700' }}>
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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(17, 17, 68, 0.75)',
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
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              position: 'relative',
              animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCard(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#F4F1EC',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#5C564D',
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111144', margin: '8px 0 4px 0' }}>
              {activeCard.title}
            </h3>
            <p style={{ fontSize: '12px', color: '#5C564D', margin: '0 0 20px 0' }}>{activeCard.subtitle}</p>

            {/* Scratch Surface Box */}
            <div
              onClick={handleScratchAction}
              style={{
                width: '220px',
                height: '220px',
                margin: '0 auto 20px auto',
                borderRadius: '24px',
                backgroundColor: isRevealed ? '#F4F1EC' : '#111144',
                border: isRevealed ? '2px solid #F98513' : '2px dashed #F98513',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isRevealed ? 'default' : 'pointer',
                boxShadow: isRevealed ? '0 6px 20px rgba(249, 133, 19, 0.2)' : '0 10px 30px rgba(17, 17, 68, 0.4)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isScratching ? (
                <div>
                  <Sparkles size={40} color="#F98513" style={{ animation: 'spin 1s linear infinite' }} />
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', marginTop: '10px' }}>
                    Revealing Reward...
                  </div>
                </div>
              ) : isRevealed ? (
                <div style={{ padding: '16px' }}>
                  <Gift size={44} color="#F98513" style={{ margin: '0 auto 10px auto' }} />
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#111144' }}>
                    {activeCard.rewardText}
                  </div>
                  {activeCard.code && (
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '6px 12px',
                        backgroundColor: '#FFFFFF',
                        border: '1px dashed #F98513',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#F98513',
                        letterSpacing: '0.05em',
                      }}
                    >
                      CODE: {activeCard.code}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Sparkles size={44} color="#F98513" style={{ margin: '0 auto 10px auto' }} />
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>Tap to Scratch</div>
                  <div style={{ fontSize: '11px', color: '#F98513', marginTop: '4px' }}>Click to reveal your reward!</div>
                </div>
              )}
            </div>

            {isRevealed ? (
              <button
                onClick={() => setActiveCard(null)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '16px',
                  backgroundColor: '#F98513',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(249, 133, 19, 0.35)',
                }}
              >
                Claimed & Saved
              </button>
            ) : (
              <button
                onClick={handleScratchAction}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '16px',
                  backgroundColor: '#111144',
                  border: '1.5px solid #F98513',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '800',
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
