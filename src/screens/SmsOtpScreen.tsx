import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { toArabicNumerals } from '../utils/i18n';

export const SmsOtpScreen: React.FC = () => {
  const { navigateTo, screenParams, goBack, t, isRtl, language } = useApp();
  const mobile = screenParams.mobile || '501234567';

  const [otp, setOtp] = useState<string[]>(['5', '8', '9', '2', '0', '4']);
  const [timer, setTimer] = useState(28);
  const [isResent, setIsResent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    navigateTo('PERMISSIONS');
  };

  const handleResend = () => {
    setTimer(30);
    setIsResent(true);
    setTimeout(() => setIsResent(false), 3000);
  };

  const handleAutofillDemo = () => {
    setOtp(['5', '8', '9', '2', '0', '4']);
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#070D0A',
        backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(127, 232, 127, 0.14) 0%, rgba(7, 13, 10, 0.98) 60%)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '50px 24px 36px 24px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      {/* Top Center: App Brand Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <AlphPayLogo variant="horizontal" size={32} themeMode="dark" />
      </div>

      {/* Main OTP Verification Form */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          margin: '0 auto',
          backgroundColor: 'rgba(21, 21, 36, 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '24px 20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
            {t('auth.enter_otp', 'Enter 6-Digit Code')}
          </h2>
          <p style={{ fontSize: '13px', color: '#A2A2BA', margin: '0 0 10px 0' }}>
            {t('auth.otp_sent_to', 'Sent via SMS to')}{' '}
            <span style={{ color: 'var(--brand-green, #7FE87F)', fontWeight: 700 }} dir="ltr">
              +966 {mobile}
            </span>
          </p>
          <button
            onClick={goBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#6E6E85',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {language === 'العربية' ? 'تغيير الرقم' : 'Change Number'}
          </button>
        </div>

        {/* 6-Digit OTP Boxes */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '18px', direction: 'ltr' }}>
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={language === 'العربية' && digit ? toArabicNumerals(digit) : digit}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                const newOtp = [...otp];
                newOtp[i] = val;
                setOtp(newOtp);
              }}
              className="tabular-nums"
              style={{
                width: '46px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-surface, #111726)',
                border: digit ? '1px solid var(--brand-green, #7FE87F)' : '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                fontSize: '20px',
                fontWeight: 900,
                color: '#FFFFFF',
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
            />
          ))}
        </div>

        {/* Auto-Read Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
            border: '1px solid var(--brand-green-border, rgba(127, 232, 127, 0.35))',
            padding: '10px 14px',
            borderRadius: '10px',
            marginBottom: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="var(--brand-green, #7FE87F)" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>
              {language === 'العربية' ? `التعرف التلقائي على الرمز: ${toArabicNumerals('589204')}` : 'Auto-Read OTP: 589204'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="interactive-tap"
            style={{
              backgroundColor: 'var(--brand-green, #7FE87F)',
              color: 'var(--brand-green-ink, #080C14)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            {language === 'العربية' ? 'تعبئة تلقائية' : 'Autofill'}
          </button>
        </div>

        {/* Resend SMS Counter */}
        <div style={{ textAlign: 'center', fontSize: '12.5px', color: '#A2A2BA', marginBottom: '20px' }}>
          {language === 'العربية' ? 'لم تستلم الرمز؟ ' : "Didn't receive SMS? "}
          <button
            disabled={timer > 0}
            onClick={handleResend}
            style={{
              background: 'none',
              border: 'none',
              color: timer > 0 ? '#6E6E85' : 'var(--brand-green, #7FE87F)',
              fontWeight: 800,
              cursor: timer > 0 ? 'not-allowed' : 'pointer',
              padding: 0,
            }}
          >
            {language === 'العربية'
              ? timer > 0
                ? `إعادة الإرسال بعد (${toArabicNumerals(timer < 10 ? `0${timer}` : timer)} ثانية)`
                : 'إعادة إرسال الرمز'
              : `Resend Code ${timer > 0 ? `(00:${timer < 10 ? `0${timer}` : timer}s)` : ''}`}
          </button>
        </div>

        {isResent && (
          <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--brand-green, #7FE87F)', fontWeight: 700, marginBottom: '14px' }}>
            {language === 'العربية'
              ? `✓ تم إرسال رمز جديد إلى +966 ${mobile}`
              : `✓ New 6-digit code dispatched to +966 ${mobile}`}
          </div>
        )}

        <PrimaryButton onClick={handleVerify} disabled={otp.some((d) => !d)}>
          {t('btn.verify', 'Verify & Continue')}{' '}
          <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
        </PrimaryButton>
      </div>

      <div style={{ height: '20px' }} />
    </div>
  );
};
