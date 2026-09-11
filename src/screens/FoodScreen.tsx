import React, { useState } from 'react';
import { Utensils, Star, X, CheckCircle2, Clock, Plus, Minus } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface Restaurant {
  id: string;
  name: string;
  rating: string;
  cuisine: string;
  offer: string;
  deliveryTime: string;
  items: MenuItem[];
}

export const FoodScreen: React.FC = () => {
  const { openPinModal, completePayment } = useApp();
  const [selectedRes, setSelectedRes] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    restaurantName: string;
    totalAmount: number;
    estimatedTime: string;
  } | null>(null);

  const restaurants: Restaurant[] = [
    {
      id: 'res-1',
      name: 'Cafe Aroma & Bakery',
      rating: '4.8',
      cuisine: 'Coffee, Fresh Pastries & Italian Breakfast',
      offer: 'Flat 20% OFF with QTPAY20',
      deliveryTime: '20-25 mins',
      items: [
        { id: 'i-1', name: 'Hazelnut Iced Latte', price: 210, qty: 1 },
        { id: 'i-2', name: 'Avocado Toast & Poached Egg', price: 280, qty: 1 },
        { id: 'i-3', name: 'Belgian Chocolate Croissant', price: 160, qty: 0 },
      ],
    },
    {
      id: 'res-2',
      name: 'Royal Biryani House',
      rating: '4.9',
      cuisine: 'Hyderabadi Dum Biryani & Kebabs',
      offer: 'Free Chicken Tikka Starter on orders > ₹500',
      deliveryTime: '30-35 mins',
      items: [
        { id: 'i-4', name: 'Special Mutton Dum Biryani', price: 420, qty: 1 },
        { id: 'i-5', name: 'Chicken 65 Starter', price: 290, qty: 1 },
        { id: 'i-6', name: 'Double Ka Meetha Dessert', price: 120, qty: 0 },
      ],
    },
    {
      id: 'res-3',
      name: 'Green Bowl Eatery',
      rating: '4.7',
      cuisine: 'Healthy Bowls, Smoothies & Salads',
      offer: '15% Cashback on QTPay UPI',
      deliveryTime: '25-30 mins',
      items: [
        { id: 'i-7', name: 'Protein Loaded Quinoa Bowl', price: 340, qty: 1 },
        { id: 'i-8', name: 'Berry Blast Smoothie', price: 190, qty: 1 },
      ],
    },
  ];

  const handleOpenRes = (res: Restaurant) => {
    setSelectedRes(res);
    setMenuItems(res.items.map((it) => ({ ...it })));
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(0, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const calculateSubtotal = () => {
    return menuItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handlePlaceOrder = () => {
    if (!selectedRes) return;
    const total = calculateSubtotal();
    if (total <= 0) return;

    openPinModal({
      title: `Order from ${selectedRes.name}`,
      subTitle: `Food Delivery • ${selectedRes.deliveryTime}`,
      amount: total,
      onSuccess: async () => {
        await completePayment({
          title: selectedRes.name,
          subTitle: `Food Order (${menuItems.filter((i) => i.qty > 0).length} items)`,
          amount: total,
          category: 'Food & Dining',
        });

        setOrderConfirmed({
          restaurantName: selectedRes.name,
          totalAmount: total,
          estimatedTime: selectedRes.deliveryTime,
        });
        setSelectedRes(null);
      },
    });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#F4F1EC', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Food & Dining" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Dining Offer Banner */}
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
            <Utensils size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>QTPay Food & Dining</h3>
            <p style={{ fontSize: '12px', color: '#A4BCEE', margin: '4px 0 0 0' }}>
              Order food online with instant QTPay discounts & 0 delivery fee
            </p>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: '800', color: '#5C564D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', marginLeft: '4px' }}>
          Nearby Partner Restaurants
        </div>

        {restaurants.map((res) => (
          <div
            key={res.id}
            onClick={() => handleOpenRes(res)}
            style={{
              padding: '18px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #DAD1C8',
              borderRadius: '20px',
              marginBottom: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(17, 17, 68, 0.04)',
              transition: 'transform 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111144', margin: 0 }}>{res.name}</h4>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  backgroundColor: '#FDE8D7',
                  color: '#F98513',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Star size={13} fill="#F98513" /> {res.rating}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#5C564D', marginTop: '4px' }}>{res.cuisine}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#F98513', backgroundColor: 'rgba(249,133,19,0.1)', padding: '4px 8px', borderRadius: '8px' }}>
                {res.offer}
              </span>
              <span style={{ fontSize: '11px', color: '#5C564D', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                <Clock size={12} /> {res.deliveryTime}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Restaurant Menu & Checkout Modal */}
      {selectedRes && (
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
          onClick={() => setSelectedRes(null)}
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
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111144', margin: 0 }}>{selectedRes.name}</h3>
                <p style={{ fontSize: '12px', color: '#5C564D', margin: '2px 0 0 0' }}>Select items to order</p>
              </div>
              <button
                onClick={() => setSelectedRes(null)}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    backgroundColor: '#F4F1EC',
                    borderRadius: '16px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#111144' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#F98513', marginTop: '2px' }}>
                      ₹{item.price}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => handleUpdateQty(item.id, -1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DAD1C8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Minus size={14} color="#111144" />
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: '800', minWidth: '16px', textAlign: 'center' }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => handleUpdateQty(item.id, 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: '#F98513',
                        border: 'none',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingTop: '12px', borderTop: '1px dashed #DAD1C8' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#5C564D' }}>Total Bill Amount</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#F98513' }}>
                ₹{calculateSubtotal().toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={calculateSubtotal() <= 0}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: calculateSubtotal() > 0 ? '#F98513' : '#DAD1C8',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '800',
                cursor: calculateSubtotal() > 0 ? 'pointer' : 'not-allowed',
                boxShadow: calculateSubtotal() > 0 ? '0 4px 14px rgba(249, 133, 19, 0.35)' : 'none',
              }}
            >
              Order & Pay ₹{calculateSubtotal().toLocaleString()} via UPI PIN
            </button>
          </div>
        </div>
      )}

      {/* Confirmed Order Delivery Tracking Modal */}
      {orderConfirmed && (
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
          onClick={() => setOrderConfirmed(null)}
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
              Order Confirmed!
            </h3>
            <p style={{ fontSize: '12px', color: '#5C564D', margin: '0 0 20px 0' }}>
              {orderConfirmed.restaurantName} is preparing your meal
            </p>

            <div style={{ backgroundColor: '#F4F1EC', borderRadius: '16px', padding: '16px', textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Clock size={18} color="#F98513" />
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#F98513' }}>
                  Delivering in {orderConfirmed.estimatedTime}
                </span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#111144' }}>
                Paid ₹{orderConfirmed.totalAmount} via QTPay UPI
              </div>
            </div>

            <button
              onClick={() => setOrderConfirmed(null)}
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
              Track Order Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
