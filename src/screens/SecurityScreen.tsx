import React from 'react';
import { Smartphone, Monitor, ShieldCheck, LogOut } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

export const SecurityScreen: React.FC = () => {
  const { deviceSessions, terminateSession } = useApp();

  return (
    <div className="fade-in">
      <AppHeader title="Security & Devices" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Biometrics / Security Status Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            padding: '18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 4px 20px rgba(7, 25, 19, 0.04)',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              backgroundColor: 'rgba(158, 240, 26, 0.2)',
              color: '#071913',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>App Security Active</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              2FA and Biometrics protection enabled
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '14px',
          }}
        >
          Active Sessions & Devices ({deviceSessions.length})
        </div>

        {deviceSessions.map((session) => (
          <div
            key={session.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              border: session.isCurrent ? '1px solid var(--neon-primary)' : '1px solid var(--card-border)',
              borderRadius: '16px',
              marginBottom: '10px',
              boxShadow: '0 2px 10px rgba(7, 25, 19, 0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: '#071913',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {session.deviceType === 'mobile' ? <Smartphone size={20} /> : <Monitor size={20} />}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>
                  {session.deviceName}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {session.location} &bull; {session.lastActive}
                </div>
              </div>
            </div>

            {session.isCurrent ? (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#071913',
                  backgroundColor: 'rgba(158, 240, 26, 0.25)',
                  padding: '4px 8px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                }}
              >
                This Device
              </span>
            ) : (
              <button
                onClick={() => terminateSession(session.id)}
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: 'none',
                  color: '#EF4444',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <LogOut size={12} /> End
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
