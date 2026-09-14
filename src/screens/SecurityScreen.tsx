import React from 'react';
import { Smartphone, Monitor, ShieldCheck, LogOut, Lock } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

export const SecurityScreen: React.FC = () => {
  const { deviceSessions, terminateSession } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100vh', paddingBottom: '36px', color: '#FFFFFF' }}>
      <AppHeader title="Security & Devices" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Biometrics / Security Status HUD Card */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1.5px solid rgba(127, 232, 127, 0.35)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            color: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                color: '#7FE87F',
                border: '1px solid rgba(127, 232, 127, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '16px', color: '#FFFFFF' }}>
                  256-Bit Protection Active
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#B3B3C2', marginTop: '2px' }}>
                Hardware biometric & device binding verified
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#B3B3C2',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '12px',
            paddingLeft: '4px',
          }}
        >
          Active Sessions & Authorized Devices ({deviceSessions.length})
        </div>

        <div
          style={{
            backgroundColor: '#2A2A3E',
            borderRadius: '18px',
            border: '1px solid #4D4D6B',
            overflow: 'hidden',
          }}
        >
          {deviceSessions.map((session, index) => (
            <React.Fragment key={session.id}>
              {index > 0 && <div style={{ height: '1px', backgroundColor: '#3A3A52', margin: '0 16px' }} />}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 18px',
                  backgroundColor: session.isCurrent ? '#33334D' : '#2A2A3E',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#1A1A2E',
                      color: session.isCurrent ? '#7FE87F' : '#B3B3C2',
                      border: '1px solid #4D4D6B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {session.deviceType === 'mobile' ? <Smartphone size={20} /> : <Monitor size={20} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '14.5px', color: '#FFFFFF' }}>
                      {session.deviceName}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#B3B3C2', marginTop: '2px' }}>
                      {session.location} &bull; {session.lastActive}
                    </div>
                  </div>
                </div>

                {session.isCurrent ? (
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      color: '#000000',
                      backgroundColor: '#7FE87F',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Current
                  </span>
                ) : (
                  <button
                    onClick={() => terminateSession(session.id)}
                    className="interactive-tap"
                    style={{
                      backgroundColor: '#3A3A52',
                      border: '1px solid #4D4D6B',
                      color: '#B3B3C2',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      fontSize: '11.5px',
                      fontWeight: 700,
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

        {/* Security Footnote */}
        <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={13} color="#808099" />
          <span style={{ fontSize: '11px', color: '#808099', fontWeight: 600 }}>
            Automated session timeout enforced across unverified networks
          </span>
        </div>
      </div>
    </div>
  );
};
