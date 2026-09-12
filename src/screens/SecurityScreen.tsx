import React from 'react';
import { Smartphone, Monitor, ShieldCheck, LogOut, Lock, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

export const SecurityScreen: React.FC = () => {
  const { deviceSessions, terminateSession } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', paddingBottom: '36px' }}>
      <AppHeader title="Security & Devices" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Biometrics / Security Status HUD Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #071529 0%, #0a2540 55%, #1d4ed8 100%)',
            border: '1.5px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(10, 25, 47, 0.2)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#38bdf8',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                backdropFilter: 'blur(6px)',
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '16px', color: '#ffffff' }}>
                  256-Bit Defense Active
                </span>
                <CheckCircle2 size={15} color="#38bdf8" />
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)', marginTop: '2px' }}>
                Hardware biometric & device binding verified
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#64748b',
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
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
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
                  padding: '16px 18px',
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
                      color: session.isCurrent ? '#2e83ff' : '#64748b',
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
                    <div style={{ fontWeight: 800, fontSize: '14.5px', color: '#0f172a' }}>
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
                    Current
                  </span>
                ) : (
                  <button
                    onClick={() => terminateSession(session.id)}
                    className="interactive-tap"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#64748b',
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
          <Lock size={13} color="#64748b" />
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
            Automated session timeout enforced across unverified networks
          </span>
        </div>
      </div>
    </div>
  );
};
