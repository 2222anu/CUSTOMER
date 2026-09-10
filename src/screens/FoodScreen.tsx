import React from 'react';
import { Utensils, Star } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';

export const FoodScreen: React.FC = () => {
  const restaurants = [
    { name: 'Cafe Aroma', rating: '4.8', offer: 'Flat 20% OFF with QTPay', cuisine: 'Coffee, Bakery & Desserts' },
    { name: 'Urban Spice Diner', rating: '4.6', offer: 'Free Starter on orders > ₹500', cuisine: 'North Indian & Mughlai' },
    { name: 'Green Bowl Eatery', rating: '4.7', offer: '15% Cashback on UPI', cuisine: 'Healthy Salads & Bowls' },
  ];

  return (
    <div className="fade-in">
      <AppHeader title="Food & Dining" showBack showSettings={false} />

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
            <Utensils size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>QTPay Dining Offers</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Dine out or order with instant QTPay discounts</p>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Nearby Partner Restaurants
        </div>

        {restaurants.map((res, i) => (
          <div
            key={i}
            onClick={() => alert(`Ordering from ${res.name}`)}
            style={{
              padding: '16px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              marginBottom: '12px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{res.name}</h4>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--neon-primary)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Star size={14} fill="var(--neon-primary)" /> {res.rating}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{res.cuisine}</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--neon-primary)', marginTop: '8px' }}>
              {res.offer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
