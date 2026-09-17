import React from 'react';
import { Smartphone, Monitor, ShieldCheck, LogOut, Lock } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';
import { formatLocalizedNumber, translateText } from '../utils/i18n';

export const SecurityScreen: React.FC = () => {
  const { deviceSessions, terminateSession, language, navigateTo } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#0B0F19', minHeight: '100vh', paddingBottom: '36px', color: '#FFFFFF' }}>
      <AppHeader title={translateText('Security & Devices', language)} showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {/* Biometrics / Security Status HUD Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            color: '#FFFFFF',
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
                backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                color: 'var(--brand-green, #7FE87F)',
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
                <span style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF' }}>
                  {translateText('256-Bit Protection Active', language)}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#8E9BAE', marginTop: '2px' }}>
                {translateText('Hardware biometrics verified', language)}
              </div>
            </div>
          </div>
        </div>

        {/* SAMA Daily Limit & AI Fraud Shield Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            borderRadius: '16px',
            padding: '18px 20px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'العربية' ? 'الحد اليومي للتحويل (سريع)' : 'Daily Sarie Limit'}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#7FE87F', fontVariantNumeric: 'tabular-nums' }}>
              {language === 'العربية' ? '٥٠,٠٠٠ ر.س' : 'SAR 50,000'}
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface-elevated, #182236)', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ width: '14%', height: '100%', backgroundColor: '#7FE87F', borderRadius: '999px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#9ca3af' }}>
            <span>{language === 'العربية' ? 'المستخدم اليوم: ٤,٨٠٠ ر.س' : 'Used Today: SAR 4,800'}</span>
            <span>{language === 'العربية' ? 'المتبقي: ٤٥,٢٠٠ ر.س' : 'Remaining: SAR 45,200'}</span>
          </div>
        </div>

        {/* Security MPIN Management Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            borderRadius: '16px',
            padding: '18px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 255, 36, 0.12)',
                color: '#00FF24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Lock size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
                {language === 'العربية' ? 'رمز الأمان السري (MPIN)' : 'Security PIN (MPIN)'}
              </div>
              <div style={{ fontSize: '12px', color: '#8E9BAE', marginTop: '2px' }}>
                {language === 'العربية' ? 'تعديل الرمز السري المكون من ٤ أرقام' : 'Change your 4-digit transaction PIN'}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigateTo('SET_PIN', { fromSettings: true })}
            style={{
              backgroundColor: 'rgba(0, 255, 36, 0.12)',
              border: '1px solid rgba(0, 255, 36, 0.3)',
              color: '#00FF24',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            {language === 'العربية' ? 'تعديل' : 'Change'}
          </button>
        </div>

        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#8E9BAE',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '12px',
            paddingInlineStart: '4px',
          }}
        >
          {translateText('Active Devices', language)} ({formatLocalizedNumber(deviceSessions.length, language)})
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '16px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            overflow: 'hidden',
          }}
        >
          {deviceSessions.map((session, index) => (
            <React.Fragment key={session.id}>
              {index > 0 && <div style={{ height: '1px', backgroundColor: 'var(--color-border, rgba(255, 255, 255, 0.06))', margin: '0 16px' }} />}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 18px',
                  backgroundColor: session.isCurrent ? 'rgba(127, 232, 127, 0.08)' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-surface-elevated, #182236)',
                      color: session.isCurrent ? 'var(--brand-green, #7FE87F)' : '#8E9BAE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {session.deviceType === 'mobile' ? <Smartphone size={20} /> : <Monitor size={20} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#FFFFFF' }}>
                      {session.deviceName}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#8E9BAE', marginTop: '2px' }}>
                      {session.location} • {translateText(session.lastActive, language)}
                    </div>
                  </div>
                </div>

                {session.isCurrent ? (
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      color: 'var(--brand-green-ink, #080C14)',
                      backgroundColor: 'var(--brand-green, #7FE87F)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {translateText('Current', language)}
                  </span>
                ) : (
                  <button
                    onClick={() => terminateSession(session.id)}
                    className="interactive-tap"
                    style={{
                      backgroundColor: 'var(--color-surface-elevated, #182236)',
                      border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
                      color: '#8E9BAE',
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
                    <LogOut size={12} /> {translateText('End', language)}
                  </button>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Security Footnote */}
        <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={13} color="#6B7A90" />
          <span style={{ fontSize: '11px', color: '#6B7A90', fontWeight: 600 }}>
            {translateText('Automated session security enabled', language)}
          </span>
        </div>
      </div>
    </div>
  );
};

