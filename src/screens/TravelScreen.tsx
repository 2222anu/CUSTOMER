import React from 'react';
import { Plane, Car, Hotel, Compass } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';

export const TravelScreen: React.FC = () => {
  return (
    <div className="fade-in">
      <AppHeader title="Travel & Bookings" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'rgba(158, 240, 26, 0.15)',
              color: 'var(--neon-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}
          >
            <Plane size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '700' }}>QTPay Travel Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Book flights, cabs, and hotels with zero convenience fee</p>
        </div>

        <ListRow icon={<Plane size={18} />} label="Flight Bookings" subLabel="Up to ₹1,500 OFF on domestic flights" onClick={() => alert('Flight booking selected')} />
        <ListRow icon={<Car size={18} />} label="Cab & Bus Rentals" subLabel="Instant booking via QTPay UPI" onClick={() => alert('Cab booking selected')} />
        <ListRow icon={<Hotel size={18} />} label="Hotel Reservations" subLabel="Partnered with 5,000+ luxury stays" onClick={() => alert('Hotel booking selected')} />
        <ListRow icon={<Compass size={18} />} label="Holiday Packages" subLabel="Curated international & domestic tours" onClick={() => alert('Holiday package selected')} />
      </div>
    </div>
  );
};
