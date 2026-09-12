import React from 'react';
import { CheckCircle2, Info, BellRing } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

export const NotificationsScreen: React.FC = () => {
  const { notifications } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f9', minHeight: '100%', paddingBottom: '36px' }}>
      <AppHeader title="Notifications" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {notifications.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '18px',
              padding: '48px 20px',
              color: '#64748b',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                border: '1px solid #d6e6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <BellRing size={22} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>No New Notifications</div>
            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>
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
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#eef5ff',
                    color: '#2e83ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid #d6e6ff',
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
                    <span style={{ fontWeight: 800, fontSize: '14.5px', color: '#0f172a' }}>
                      {notif.title}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                      {notif.timestamp}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#475569',
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
