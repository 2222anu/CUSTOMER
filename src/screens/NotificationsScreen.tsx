import React from 'react';
import { CheckCircle2, Info, BellRing } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

export const NotificationsScreen: React.FC = () => {
  const { notifications } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '36px' }}>
      <AppHeader title="Notifications" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {notifications.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
              borderRadius: '18px',
              padding: '48px 20px',
              color: '#B3B3C2',
              boxShadow: 'none',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                border: '1px solid #4D4D6B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <BellRing size={22} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>No New Notifications</div>
            <p style={{ fontSize: '12.5px', color: '#B3B3C2', marginTop: '4px' }}>
              Your account activity, payment alerts and updates will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="interactive-tap"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px 18px',
                  backgroundColor: '#2A2A3E',
                  border: '1px solid #4D4D6B',
                  borderRadius: '16px',
                  boxShadow: 'none',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#3A3A52',
                    color: '#7FE87F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid #4D4D6B',
                  }}
                >
                  {notif.type === 'success' ? (
                    <CheckCircle2 size={20} />
                  ) : notif.type === 'alert' ? (
                    <BellRing size={20} />
                  ) : (
                    <Info size={20} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '14.5px', color: '#FFFFFF' }}>
                      {notif.title}
                    </span>
                    <span style={{ fontSize: '11px', color: '#808099', fontWeight: 600 }}>
                      {notif.timestamp}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#B3B3C2',
                      marginTop: '4px',
                      lineHeight: '1.45',
                    }}
                  >
                    {notif.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
