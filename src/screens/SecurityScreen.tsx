import React from 'react';
import { Smartphone, Monitor, ShieldCheck, LogOut } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

export const SecurityScreen: React.FC = () => {
  const { deviceSessions, terminateSession } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingBottom: '32px' }}>
      <AppHeader title="Security & Devices" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Biometrics / Security Status Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              backgroundColor: '#eef5ff',
              color: '#2e83ff',
              border: '1px solid #d6e6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>
              App Security Active
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              2FA and Biometrics protection enabled
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '11.5px',
            fontWeight: 800,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '12px',
            paddingLeft: '4px',
          }}
        >
          Active Sessions & Devices ({deviceSessions.length})
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          {deviceSessions.map((session, index) => (
            <React.Fragment key={session.id}>
              {index > 0 && <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  backgroundColor: session.isCurrent ? '#f8fafc' : '#ffffff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: session.isCurrent ? '#eef5ff' : '#f8fafc',
                      color: session.isCurrent ? '#2e83ff' : '#475569',
                      border: session.isCurrent ? '1px solid #d6e6ff' : '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {session.deviceType === 'mobile' ? <Smartphone size={20} /> : <Monitor size={20} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a' }}>
                      {session.deviceName}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                      {session.location} &bull; {session.lastActive}
                    </div>
                  </div>
                </div>

                {session.isCurrent ? (
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      color: '#2e83ff',
                      backgroundColor: '#eef5ff',
                      border: '1px solid #d6e6ff',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    This Device
                  </span>
                ) : (
                  <button
                    onClick={() => terminateSession(session.id)}
                    className="interactive-tap"
                    style={{
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fee2e2',
                      color: '#ef4444',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      fontSize: '11.5px',
                      fontWeight: 800,
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
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
