import React, { useState } from 'react';
import { Utensils, Star, X, Check, Clock, Plus, Minus } from 'lucide-react';
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
      offer: 'Flat 20% OFF with ALPH20',
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
      offer: 'Free Starter on orders > ₹500',
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
      offer: '15% Cashback on alph pay',
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
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100vh', paddingBottom: '30px', color: '#FFFFFF' }}>
      <AppHeader title="Food & Dining" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Dining Offer Banner */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1.5px solid rgba(127, 232, 127, 0.35)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#FFFFFF',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              backgroundColor: 'rgba(127, 232, 127, 0.15)',
              color: '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '1.5px solid rgba(127, 232, 127, 0.3)',
            }}
          >
            <Utensils size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>alph pay Food & Dining</h3>
            <p style={{ fontSize: '12px', color: '#B3B3C2', margin: '3px 0 0 0' }}>
              Order food online with instant discounts & 0 delivery fee
            </p>
          </div>
        </div>

        <div style={{ fontSize: '11px', fontWeight: 800, color: '#B3B3C2', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', marginLeft: '4px' }}>
          Nearby Partner Restaurants
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {restaurants.map((res) => (
            <div
              key={res.id}
              onClick={() => handleOpenRes(res)}
              className="interactive-tap"
              style={{
                padding: '16px',
                backgroundColor: '#2A2A3E',
                border: '1px solid #4D4D6B',
                borderRadius: '16px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>{res.name}</h4>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    backgroundColor: 'rgba(127, 232, 127, 0.15)',
                    color: '#7FE87F',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    border: '1px solid rgba(127, 232, 127, 0.3)',
                  }}
                >
                  <Star size={12} fill="#7FE87F" /> {res.rating}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#B3B3C2', marginTop: '4px' }}>{res.cuisine}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#000000', backgroundColor: '#7FE87F', padding: '3px 8px', borderRadius: '6px' }}>
                  {res.offer}
                </span>
                <span style={{ fontSize: '11px', color: '#B3B3C2', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                  <Clock size={12} /> {res.deliveryTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Restaurant Menu & Checkout Modal */}
      {selectedRes && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 15, 26, 0.75)',
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
              backgroundColor: '#2A2A3E',
              borderTop: '1px solid #4D4D6B',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '24px 20px',
              animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>{selectedRes.name}</h3>
                <p style={{ fontSize: '12px', color: '#B3B3C2', margin: '2px 0 0 0' }}>Select items to order</p>
              </div>
              <button
                onClick={() => setSelectedRes(null)}
                aria-label="Close"
                style={{
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
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    backgroundColor: '#1A1A2E',
                    border: '1px solid #4D4D6B',
                    borderRadius: '14px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#7FE87F', marginTop: '2px', fontVariantNumeric: 'tabular-nums' }}>
                      ₹{item.price}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => handleUpdateQty(item.id, -1)}
                      className="interactive-tap"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: '#3A3A52',
                        border: '1px solid #4D4D6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#FFFFFF',
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: 800, minWidth: '16px', textAlign: 'center', color: '#FFFFFF', fontVariantNumeric: 'tabular-nums' }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => handleUpdateQty(item.id, 1)}
                      className="interactive-tap"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: '#7FE87F',
                        border: 'none',
                        color: '#000000',
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingTop: '12px', borderTop: '1px dashed #4D4D6B' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#B3B3C2' }}>Total Bill Amount</span>
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#7FE87F', fontVariantNumeric: 'tabular-nums' }}>
                ₹{calculateSubtotal().toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={calculateSubtotal() <= 0}
              className="interactive-tap"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: calculateSubtotal() > 0 ? '#7FE87F' : '#3A3A52',
                border: 'none',
                color: calculateSubtotal() > 0 ? '#000000' : '#808099',
                fontSize: '14px',
                fontWeight: 800,
                cursor: calculateSubtotal() > 0 ? 'pointer' : 'not-allowed',
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
            inset: 0,
            backgroundColor: 'rgba(15, 15, 26, 0.75)',
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
              <Check size={32} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px 0' }}>
              Order Confirmed!
            </h3>
            <p style={{ fontSize: '12px', color: '#B3B3C2', margin: '0 0 20px 0' }}>
              {orderConfirmed.restaurantName} is preparing your meal
            </p>

            <div style={{ backgroundColor: '#1A1A2E', border: '1px solid #4D4D6B', borderRadius: '16px', padding: '16px', textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Clock size={16} color="#7FE87F" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#7FE87F' }}>
                  Delivering in {orderConfirmed.estimatedTime}
                </span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                Paid ₹{orderConfirmed.totalAmount} via alph pay
              </div>
            </div>

            <button
              onClick={() => setOrderConfirmed(null)}
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
              Track Order Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
