import React, { useState } from 'react';
import { Smartphone, Monitor, ShieldCheck, LogOut, Lock, Fingerprint, Sliders, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';
import { formatLocalizedNumber, translateText, formatSaudiCurrency } from '../utils/i18n';

export const SecurityScreen: React.FC = () => {
  const {
    deviceSessions,
    terminateSession,
    language,
    navigateTo,
    isBiometricsEnabled,
    setIsBiometricsEnabled,
    transferLimits,
    isRtl,
  } = useApp();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleBiometrics = () => {
    const nextVal = !isBiometricsEnabled;
    setIsBiometricsEnabled(nextVal);
    const msg = nextVal
      ? (language === 'العربية' ? 'تم تفعيل المصادقة الحيوية بنجاح' : 'Biometric authentication enabled')
      : (language === 'العربية' ? 'تم تعطيل المصادقة الحيوية' : 'Biometric authentication disabled');
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isAr = language === 'العربية';
  const dailyPct = Math.min(100, Math.round((transferLimits.dailyUsed / (transferLimits.dailyLimit || 1)) * 100));

  return (
    <div className="fade-in" style={{ backgroundColor: '#080C14', minHeight: '100vh', paddingBottom: '96px', color: '#FFFFFF' }}>
      <AppHeader
        title={isAr ? 'الأمان والأجهزة' : 'Security & Devices'}
        showBack={true}
        showSettings={false}
        onBack={() => navigateTo('PROFILE')}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            backgroundColor: '#182236',
            border: '1px solid #7FE87F',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '24px',
            fontSize: '12.5px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          <CheckCircle2 size={16} color="#7FE87F" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Biometrics Toggle Card (USER-19) */}
        <div
          style={{
            backgroundColor: '#111726',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, paddingInlineEnd: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: isBiometricsEnabled ? 'rgba(127, 232, 127, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                color: isBiometricsEnabled ? '#7FE87F' : '#8E9BAE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            >
              <Fingerprint size={26} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF' }}>
                {isAr ? 'بصمة الوجه / الإصبع (Biometrics)' : 'Face ID / Fingerprint'}
              </div>
              <div style={{ fontSize: '12px', color: '#8E9BAE', marginTop: '3px', lineHeight: 1.4 }}>
                {isAr
                  ? 'تسجيل الدخول وتأكيد الحوالات فورياً عبر المستشعر الحيوي'
                  : 'Fast authentication for app login and Sarie instant transfers'}
              </div>
            </div>
          </div>

          {/* Interactive Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={isBiometricsEnabled}
            aria-label={isAr ? 'تفعيل البصمة' : 'Toggle Biometrics'}
            onClick={handleToggleBiometrics}
            className="interactive-tap"
            style={{
              width: '54px',
              height: '30px',
              borderRadius: '15px',
              backgroundColor: isBiometricsEnabled ? '#7FE87F' : '#2A344A',
              border: 'none',
              padding: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isBiometricsEnabled ? (isRtl ? 'flex-start' : 'flex-end') : (isRtl ? 'flex-end' : 'flex-start'),
              transition: 'background-color 0.25s ease',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: isBiometricsEnabled ? '#080C14' : '#8E9BAE',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                transition: 'all 0.25s ease',
              }}
            />
          </button>
        </div>

        {/* 256-Bit Security Status HUD Card */}
        <div
          style={{
            backgroundColor: '#111726',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '20px',
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
                backgroundColor: 'rgba(127, 232, 127, 0.14)',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF' }}>
                  {translateText('256-Bit Protection Active', language)}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#8E9BAE', marginTop: '2px' }}>
                {isAr ? 'مشفر طبقاً لمعايير البنك المركزي السعودي (ساما)' : 'SAMA compliant end-to-end hardware encryption'}
              </div>
            </div>
          </div>
        </div>

        {/* SAMA Transfer Limits Card (USER-18 Link) */}
        <div
          style={{
            backgroundColor: '#111726',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={16} color="#7FE87F" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isAr ? 'الحد اليومي للتحويل (سريع)' : 'Daily Transfer Limit'}
              </span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#7FE87F', fontVariantNumeric: 'tabular-nums' }}>
              {formatSaudiCurrency(transferLimits.dailyLimit, language)}
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', backgroundColor: '#182236', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
            <div
              style={{
                width: `${dailyPct}%`,
                height: '100%',
                backgroundColor: dailyPct > 80 ? '#FFB300' : '#7FE87F',
                borderRadius: '999px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#9ca3af', marginBottom: '14px' }}>
            <span>{isAr ? `المستخدم اليوم: ${formatSaudiCurrency(transferLimits.dailyUsed, language)}` : `Used: ${formatSaudiCurrency(transferLimits.dailyUsed, language)}`}</span>
            <span>{isAr ? `المتبقي: ${formatSaudiCurrency(Math.max(0, transferLimits.dailyLimit - transferLimits.dailyUsed), language)}` : `Remaining: ${formatSaudiCurrency(Math.max(0, transferLimits.dailyLimit - transferLimits.dailyUsed), language)}`}</span>
          </div>

          <button
            onClick={() => navigateTo('TRANSFER_LIMITS')}
            className="interactive-tap"
            style={{
              width: '100%',
              backgroundColor: '#182236',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '12px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <span>{isAr ? 'تعديل حدود التحويل' : 'Adjust Transfer Limits'}</span>
            <ChevronRight size={14} color="#7FE87F" style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
          </button>
        </div>

        {/* Security MPIN Management Card */}
        <div
          style={{
            backgroundColor: '#111726',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '18px 20px',
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
                backgroundColor: 'rgba(127, 232, 127, 0.12)',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Lock size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#FFFFFF' }}>
                {isAr ? 'رمز الأمان السري (MPIN)' : 'Security PIN (MPIN)'}
              </div>
              <div style={{ fontSize: '12px', color: '#8E9BAE', marginTop: '2px' }}>
                {isAr ? 'تعديل الرمز السري المكون من ٤ أرقام' : 'Change your 4-digit transaction PIN'}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigateTo('SET_PIN', { fromSettings: true })}
            className="interactive-tap"
            style={{
              backgroundColor: 'rgba(127, 232, 127, 0.12)',
              border: '1px solid rgba(127, 232, 127, 0.3)',
              color: '#7FE87F',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            {isAr ? 'تعديل' : 'Change'}
          </button>
        </div>

        {/* Active Devices Header */}
        <div>
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
              backgroundColor: '#111726',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}
          >
            {deviceSessions.map((session, index) => (
              <React.Fragment key={session.id}>
                {index > 0 && <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.06)', margin: '0 16px' }} />}
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
                        backgroundColor: '#182236',
                        color: session.isCurrent ? '#7FE87F' : '#8E9BAE',
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
                        color: '#080C14',
                        backgroundColor: '#7FE87F',
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
                        backgroundColor: '#182236',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
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
        </div>

        {/* Security Footnote */}
        <div style={{ marginTop: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={13} color="#6B7A90" />
          <span style={{ fontSize: '11.5px', color: '#6B7A90', fontWeight: 600 }}>
            {isAr ? 'تم تفعيل الحماية المشفرة للجلسات النشطة' : 'Automated session security enabled'}
          </span>
        </div>
      </div>
    </div>
  );
};


