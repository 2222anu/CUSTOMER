import React from 'react';
import { Smartphone, Monitor, ShieldCheck, LogOut } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const SecurityScreen: React.FC = () => {
  const { deviceSessions, terminateSession } = useApp();

  return (
    <div className="fade-in" style={{ fontFamily: designSystem.typography.fontFamily }}>
      <AppHeader title="Security & Devices" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Biometrics / Security Status Card */}
        <div
          style={{
            backgroundColor: designSystem.colors.surface,
            border: `1px solid ${designSystem.colors.borderHairline}`,
            borderRadius: designSystem.radii.md,
            padding: '18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: designSystem.shadows.none,
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: designSystem.radii.sm,
              backgroundColor: designSystem.colors.primaryLight,
              color: designSystem.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: designSystem.colors.textPrimary }}>
              App Security Active
            </div>
            <div style={{ fontSize: '12px', color: designSystem.colors.textSecondary }}>
              2FA and Biometrics protection enabled
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: designSystem.colors.textSecondary,
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
              backgroundColor: designSystem.colors.surface,
              border: session.isCurrent
                ? `1px solid ${designSystem.colors.primary}`
                : `1px solid ${designSystem.colors.borderHairline}`,
              borderRadius: designSystem.radii.sm,
              marginBottom: '10px',
              boxShadow: designSystem.shadows.none,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: designSystem.radii.xs,
                  backgroundColor: designSystem.colors.subSurface,
                  color: designSystem.colors.primaryDark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {session.deviceType === 'mobile' ? <Smartphone size={20} /> : <Monitor size={20} />}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: designSystem.colors.textPrimary }}>
                  {session.deviceName}
                </div>
                <div style={{ fontSize: '11px', color: designSystem.colors.textSecondary, marginTop: '2px' }}>
                  {session.location} &bull; {session.lastActive}
                </div>
              </div>
            </div>

            {session.isCurrent ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: designSystem.colors.primaryDark,
                  backgroundColor: designSystem.colors.primaryLight,
                  padding: '4px 8px',
                  borderRadius: designSystem.radii.xs,
                  textTransform: 'uppercase',
                }}
              >
                This Device
              </span>
            ) : (
              <button
                onClick={() => terminateSession(session.id)}
                style={{
                  backgroundColor: designSystem.colors.dangerLight,
                  border: 'none',
                  color: designSystem.colors.danger,
                  padding: '6px 10px',
                  borderRadius: designSystem.radii.xs,
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
