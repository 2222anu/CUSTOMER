import React from 'react';
import { ShoppingBag, Tag, ChevronRight } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';

export const ShoppingScreen: React.FC = () => {
  const deals = [
    { title: 'Star Supermarket', offer: '10% Cashback on UPI', category: 'Groceries' },
    { title: 'Fashion Hub', offer: 'Flat ₹500 OFF on orders above ₹2000', category: 'Apparel' },
    { title: 'Tech Zone', offer: 'Up to ₹3,000 Instant Discount', category: 'Electronics' },
  ];

  return (
    <div className="fade-in">
      <AppHeader title="Shopping & Offers" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '16px',
              backgroundColor: 'rgba(158, 240, 26, 0.15)',
              color: 'var(--neon-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingBag size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>QTPay Shopping Offers</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Exclusive cashback at partner merchants</p>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Featured Merchant Deals
        </div>

        {deals.map((deal, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Tag size={20} color="var(--neon-primary)" />
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{deal.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--neon-primary)', marginTop: '2px', fontWeight: '600' }}>{deal.offer}</div>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-secondary)" />
          </div>
        ))}
      </div>
    </div>
  );
};
