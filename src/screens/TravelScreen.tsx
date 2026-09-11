import React, { useState } from 'react';
import { Plane, Car, Hotel, Compass, X, CheckCircle2, Ticket } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { useApp } from '../state/AppContext';

interface TravelBooking {
  type: 'flight' | 'cab' | 'hotel' | 'holiday';
  title: string;
  subtitle: string;
  from?: string;
  to?: string;
  amount: number;
  provider: string;
}

export const TravelScreen: React.FC = () => {
  const { openPinModal, completePayment } = useApp();
  const [selectedBooking, setSelectedBooking] = useState<TravelBooking | null>(null);
  const [confirmedTicket, setConfirmedTicket] = useState<{
    title: string;
    pnr: string;
    amount: number;
    utr: string;
  } | null>(null);

  const bookings: TravelBooking[] = [
    {
      type: 'flight',
      title: 'Hyderabad (HYD) ➔ Mumbai (BOM)',
      subtitle: 'Indigo Flight • Direct • 1h 45m',
      from: 'Hyderabad',
      to: 'Mumbai',
      amount: 3490,
      provider: 'Indigo Airlines',
    },
    {
      type: 'cab',
      title: 'Outstation Airport Cab',
      subtitle: 'Sedan (Dzire) • Doorstep Pickup',
      from: 'City Center',
      to: 'Rajiv Gandhi Int. Airport',
      amount: 850,
      provider: 'QTPay Cabs',
    },
    {
      type: 'hotel',
      title: 'Taj Krishna Hyderabad',
      subtitle: 'Deluxe Suite • 1 Night • Breakfast Included',
      amount: 6200,
      provider: 'Taj Hotels',
    },
    {
      type: 'holiday',
      title: 'Goa Weekend Getaway Package',
      subtitle: '3 Days / 2 Nights • Resort + Scooty Included',
      amount: 8990,
      provider: 'QTPay Holidays',
    },
  ];

  const handleStartBooking = (booking: TravelBooking) => {
    setSelectedBooking(booking);
  };

  const handleConfirmPay = () => {
    if (!selectedBooking) return;

    openPinModal({
      title: `Book ${selectedBooking.title}`,
      subTitle: `${selectedBooking.provider} • ₹${selectedBooking.amount}`,
      amount: selectedBooking.amount,
      onSuccess: async () => {
        const txn = await completePayment({
          title: selectedBooking.title,
          subTitle: selectedBooking.provider,
          amount: selectedBooking.amount,
          category: 'Travel Booking',
        });

        const pnr = 'PNR' + Math.floor(100000 + Math.random() * 900000).toString();
        setConfirmedTicket({
          title: selectedBooking.title,
          pnr,
          amount: selectedBooking.amount,
          utr: txn.utr,
        });
        setSelectedBooking(null);
      },
    });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#F4F1EC', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Travel & Bookings" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Travel Desk Hero Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E295D 0%, #111144 100%)',
            border: '1.5px solid #F98513',
            borderRadius: '24px',
            padding: '22px',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(17, 17, 68, 0.45)',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
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
            <Plane size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0', color: '#FFFFFF' }}>
            QTPay Travel Desk
          </h3>
          <p style={{ fontSize: '12px', color: '#A4BCEE', margin: 0 }}>
            Book flights, cabs, and hotels with zero convenience fee & instant UPI cashbacks
          </p>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '800', color: '#5C564D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', marginLeft: '4px' }}>
          Available Travel Bookings
        </div>

        <ListRow
          icon={<Plane size={18} color="#F98513" />}
          label="Flight Bookings"
          subLabel="HYD ➔ BOM • ₹3,490 • Indigo"
          rightElement={<span style={{ fontSize: '12px', fontWeight: '800', color: '#F98513' }}>Book ₹3,490</span>}
          onClick={() => handleStartBooking(bookings[0])}
        />
        <ListRow
          icon={<Car size={18} color="#F98513" />}
          label="Cab & Airport Bus"
          subLabel="Airport Pickup • ₹850 • Sedan"
          rightElement={<span style={{ fontSize: '12px', fontWeight: '800', color: '#F98513' }}>Book ₹850</span>}
          onClick={() => handleStartBooking(bookings[1])}
        />
        <ListRow
          icon={<Hotel size={18} color="#F98513" />}
          label="Hotel Reservations"
          subLabel="Taj Krishna Deluxe • ₹6,200/night"
          rightElement={<span style={{ fontSize: '12px', fontWeight: '800', color: '#F98513' }}>Reserve</span>}
          onClick={() => handleStartBooking(bookings[2])}
        />
        <ListRow
          icon={<Compass size={18} color="#F98513" />}
          label="Holiday Packages"
          subLabel="Goa 3D/2N Tour • ₹8,990"
          rightElement={<span style={{ fontSize: '12px', fontWeight: '800', color: '#F98513' }}>Explore</span>}
          onClick={() => handleStartBooking(bookings[3])}
        />
      </div>

      {/* Booking Checkout Modal */}
      {selectedBooking && (
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
          onClick={() => setSelectedBooking(null)}
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
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111144', margin: 0 }}>
                  Confirm Booking
                </h3>
                <p style={{ fontSize: '12px', color: '#5C564D', margin: '2px 0 0 0' }}>{selectedBooking.provider}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
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
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#111144' }}>{selectedBooking.title}</div>
              <div style={{ fontSize: '12px', color: '#5C564D', marginTop: '4px' }}>{selectedBooking.subtitle}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed #DAD1C8' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#5C564D' }}>Total Payable Amount</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#F98513' }}>₹{selectedBooking.amount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmPay}
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
              Pay ₹{selectedBooking.amount.toLocaleString()} via UPI PIN
            </button>
          </div>
        </div>
      )}

      {/* Confirmed Ticket Receipt Modal */}
      {confirmedTicket && (
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
          onClick={() => setConfirmedTicket(null)}
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
              Booking Confirmed!
            </h3>
            <p style={{ fontSize: '12px', color: '#5C564D', margin: '0 0 20px 0' }}>Ticket generated successfully</p>

            <div style={{ backgroundColor: '#F4F1EC', borderRadius: '16px', padding: '16px', textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Ticket size={18} color="#F98513" />
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#F98513' }}>PNR: {confirmedTicket.pnr}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#111144' }}>{confirmedTicket.title}</div>
              <div style={{ fontSize: '11px', color: '#5C564D', marginTop: '6px' }}>UTR: {confirmedTicket.utr}</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#10B981', marginTop: '8px' }}>
                Paid ₹{confirmedTicket.amount.toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => setConfirmedTicket(null)}
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
              Done & View Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
