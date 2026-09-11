import React, { useState } from 'react';
import { ShoppingBag, Tag, ChevronRight, X, CheckCircle2, Copy } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

interface DealItem {
  id: string;
  merchant: string;
  title: string;
  offer: string;
  category: string;
  couponCode: string;
  originalPrice: number;
  discountedPrice: number;
}

export const ShoppingScreen: React.FC = () => {
  const { openPinModal, completePayment } = useApp();
  const [selectedDeal, setSelectedDeal] = useState<DealItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [purchasedDeal, setPurchasedDeal] = useState<{
    title: string;
    merchant: string;
    paidAmount: number;
  } | null>(null);

  const deals: DealItem[] = [
    {
      id: 'deal-1',
      merchant: 'Star Supermarket',
      title: 'Weekly Grocery Smart Saver',
      offer: 'Flat ₹300 Cashback on UPI',
      category: 'Groceries & Essentials',
      couponCode: 'STARSAVER300',
      originalPrice: 2500,
      discountedPrice: 2200,
    },
    {
      id: 'deal-2',
      merchant: 'Fashion Hub Outlet',
      title: 'Trending Apparel Collection',
      offer: 'Flat ₹500 Instant OFF',
      category: 'Clothing & Accessories',
      couponCode: 'FASHION500',
      originalPrice: 2499,
      discountedPrice: 1999,
    },
    {
      id: 'deal-3',
      merchant: 'Tech Zone Electronics',
      title: 'Wireless Noise Cancelling Earbuds',
      offer: 'Up to ₹1,500 Instant Discount',
      category: 'Gadgets & Electronics',
      couponCode: 'TECHZONE1500',
      originalPrice: 4999,
      discountedPrice: 3499,
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  };

  const handleBuyNow = () => {
    if (!selectedDeal) return;

    openPinModal({
      title: `Buy ${selectedDeal.title}`,
      subTitle: `${selectedDeal.merchant} • ₹${selectedDeal.discountedPrice}`,
      amount: selectedDeal.discountedPrice,
      onSuccess: async () => {
        await completePayment({
          title: selectedDeal.merchant,
          subTitle: selectedDeal.title,
          amount: selectedDeal.discountedPrice,
          category: 'Shopping Purchase',
        });

        setPurchasedDeal({
          title: selectedDeal.title,
          merchant: selectedDeal.merchant,
          paidAmount: selectedDeal.discountedPrice,
        });
        setSelectedDeal(null);
      },
    });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#F4F1EC', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Shopping & Deals" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Shopping Hero Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E295D 0%, #111144 100%)',
            border: '1.5px solid #F98513',
            borderRadius: '24px',
            padding: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(17, 17, 68, 0.45)',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              backgroundColor: '#F98513',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShoppingBag size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>QTPay Partner Deals</h3>
            <p style={{ fontSize: '12px', color: '#A4BCEE', margin: '4px 0 0 0' }}>
              Exclusive promo codes & instant discounts on top shopping brands
            </p>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '800', color: '#5C564D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', marginLeft: '4px' }}>
          Featured Partner Offers
        </div>

        {deals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => setSelectedDeal(deal)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #DAD1C8',
              borderRadius: '20px',
              marginBottom: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(17, 17, 68, 0.04)',
              transition: 'transform 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#FDE8D7',
                  color: '#F98513',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Tag size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: '#111144' }}>{deal.merchant}</div>
                <div style={{ fontSize: '12px', color: '#5C564D', marginTop: '2px' }}>{deal.title}</div>
                <div style={{ fontSize: '12px', color: '#F98513', marginTop: '4px', fontWeight: '800' }}>{deal.offer}</div>
              </div>
            </div>
            <ChevronRight size={18} color="#5C564D" />
          </div>
        ))}
      </div>

      {/* Deal Checkout Modal */}
      {selectedDeal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(17, 17, 68, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setSelectedDeal(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              boxShadow: '0 -10px 40px rgba(17, 17, 68, 0.2)',
              animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111144', margin: 0 }}>{selectedDeal.merchant}</h3>
                <p style={{ fontSize: '12px', color: '#5C564D', margin: '2px 0 0 0' }}>{selectedDeal.category}</p>
              </div>
              <button
                onClick={() => setSelectedDeal(null)}
                style={{
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
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F4F1EC', borderRadius: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#111144' }}>{selectedDeal.title}</div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#F98513', marginTop: '4px' }}>
                {selectedDeal.offer}
              </div>

              {/* Coupon Copy Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '14px',
                  padding: '10px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px dashed #F98513',
                  borderRadius: '12px',
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', color: '#5C564D', display: 'block' }}>Coupon Code</span>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#111144', letterSpacing: '0.05em' }}>
                    {selectedDeal.couponCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(selectedDeal.couponCode)}
                  style={{
                    backgroundColor: copiedCode ? '#10B981' : '#F98513',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {copiedCode ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  {copiedCode ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '10px', borderTop: '1px dashed #DAD1C8' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#5C564D' }}>Special Discount Price</span>
                <div>
                  <span style={{ fontSize: '13px', color: '#9CA3AF', textDecoration: 'line-through', marginRight: '8px' }}>
                    ₹{selectedDeal.originalPrice.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#111144' }}>
                    ₹{selectedDeal.discountedPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBuyNow}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: '#F98513',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(249, 133, 19, 0.35)',
              }}
            >
              Order Now via QTPay UPI PIN (₹{selectedDeal.discountedPrice.toLocaleString()})
            </button>
          </div>
        </div>
      )}

      {/* Confirmed Purchase Modal */}
      {purchasedDeal && (
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
          onClick={() => setPurchasedDeal(null)}
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
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CheckCircle2 size={54} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111144', margin: '0 0 4px 0' }}>
              Order Placed!
            </h3>
            <p style={{ fontSize: '12px', color: '#5C564D', margin: '0 0 20px 0' }}>
              Discount voucher redeemed at {purchasedDeal.merchant}
            </p>

            <div style={{ backgroundColor: '#F4F1EC', borderRadius: '16px', padding: '16px', textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#111144' }}>{purchasedDeal.title}</div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#10B981', marginTop: '6px' }}>
                Paid ₹{purchasedDeal.paidAmount.toLocaleString()} via UPI
              </div>
            </div>

            <button
              onClick={() => setPurchasedDeal(null)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: '#111144',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              Done & View Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
