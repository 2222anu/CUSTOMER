import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

export const NotificationsScreen: React.FC = () => {
  const { notifications } = useApp();

  return (
    <div className="fade-in">
      <AppHeader title="Notifications" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 0' }}>
            No new notifications.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--card-border)',
                borderRadius: '18px',
                marginBottom: '12px',
                boxShadow: '0 2px 10px rgba(7, 25, 19, 0.03)',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor:
                    notif.type === 'success'
                      ? 'rgba(158, 240, 26, 0.2)'
                      : notif.type === 'alert'
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'rgba(59, 130, 246, 0.1)',
                  color:
                    notif.type === 'success'
                      ? '#071913'
                      : notif.type === 'alert'
                      ? '#EF4444'
                      : '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  flexShrink: 0,
                }}
              >
                {notif.type === 'success' ? (
                  <CheckCircle2 size={20} />
                ) : notif.type === 'alert' ? (
                  <AlertTriangle size={20} />
                ) : (
                  <Info size={20} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>
                    {notif.title}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                    {notif.timestamp}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  {notif.description}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
