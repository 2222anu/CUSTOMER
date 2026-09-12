import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const NotificationsScreen: React.FC = () => {
  const { notifications } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Notifications" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px 20px', color: '#64748b' }}>
            No new notifications.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="interactive-tap"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor:
                      notif.type === 'success'
                        ? '#ecfdf5'
                        : notif.type === 'alert'
                        ? '#fef2f2'
                        : '#eef5ff',
                    color:
                      notif.type === 'success'
                        ? '#10b981'
                        : notif.type === 'alert'
                        ? '#dc2626'
                        : '#2e83ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: `1px solid ${
                      notif.type === 'success'
                        ? '#a7f3d0'
                        : notif.type === 'alert'
                        ? '#fecaca'
                        : '#d6e6ff'
                    }`,
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
                    <span style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a' }}>
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
