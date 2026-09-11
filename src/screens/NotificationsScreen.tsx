import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const NotificationsScreen: React.FC = () => {
  const { notifications } = useApp();

  return (
    <div className="fade-in" style={{ fontFamily: designSystem.typography.fontFamily }}>
      <AppHeader title="Notifications" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', color: designSystem.colors.textSecondary, padding: '40px 0' }}>
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
                backgroundColor: designSystem.colors.surface,
                border: `1px solid ${designSystem.colors.borderHairline}`,
                borderRadius: designSystem.radii.sm,
                marginBottom: '12px',
                boxShadow: designSystem.shadows.none,
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: designSystem.radii.xs,
                  backgroundColor:
                    notif.type === 'success'
                      ? designSystem.colors.successLight
                      : notif.type === 'alert'
                      ? designSystem.colors.dangerLight
                      : designSystem.colors.primaryLight,
                  color:
                    notif.type === 'success'
                      ? designSystem.colors.successText
                      : notif.type === 'alert'
                      ? designSystem.colors.danger
                      : designSystem.colors.primary,
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
                  <span style={{ fontWeight: '700', fontSize: '14px', color: designSystem.colors.textPrimary }}>
                    {notif.title}
                  </span>
                  <span style={{ fontSize: '11px', color: designSystem.colors.textSecondary }}>
                    {notif.timestamp}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: designSystem.colors.textSecondary,
                    marginTop: '4px',
                    lineHeight: '1.4',
                  }}
                >
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
