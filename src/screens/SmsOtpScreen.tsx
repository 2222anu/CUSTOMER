import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { toArabicNumerals } from '../utils/i18n';
import { authenticateWithAnyOtp } from '../services/supabaseClient';

export const SmsOtpScreen: React.FC = () => {
  const { navigateTo, screenParams, goBack, t, isRtl, language, updateUser, activeOtp, setActiveOtp, verifyOtp } = useApp();
  const mobile = screenParams.mobile || '501234567';

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(28);
  const [isResent, setIsResent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showSmsBanner, setShowSmsBanner] = useState<boolean>(true);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    setErrorMsg('');
    const cleanVal = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanVal;
    setOtp(newOtp);

    if (cleanVal && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const isComplete = otp.every((digit) => digit.length > 0);

  const handleVerify = async () => {
    if (!isComplete) return;
    setErrorMsg('');

    const enteredCode = otp.join('');
    const isValid = verifyOtp(enteredCode);

    if (!isValid) {
      setErrorMsg(
        language === 'العربية'
          ? 'رمز التحقق غير صحيح، يرجى التأكد من الرسائل النصية والمحاولة مرة أخرى'
          : 'Invalid verification code. Please check your SMS and try again.'
      );
      setOtp(['', '', '', '', '', '']);
      inputRefs[0].current?.focus();
      return;
    }

    try {
      const authedUser = await authenticateWithAnyOtp(mobile, enteredCode);
      updateUser(authedUser);
    } catch (e) {
      console.warn('Auth notice:', e);
    }

    // Check if user has already set their MPIN
    const hasPin = typeof window !== 'undefined' ? localStorage.getItem('qpay_user_pin') : null;
    if (!hasPin) {
      navigateTo('SET_PIN');
    } else {
      navigateTo('PERMISSIONS');
    }
  };

  const handleResend = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtp(newCode);
    setTimer(30);
    setIsResent(true);
    setShowSmsBanner(true);
    setTimeout(() => setIsResent(false), 3000);
  };

  const handleQuickFill = (codeToFill?: string) => {
    const targetCode = codeToFill || activeOtp || '589204';
    const digits = targetCode.slice(0, 6).split('');
    setOtp(digits);
    setErrorMsg('');
    inputRefs[5].current?.focus();
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
      {/* Top Simulated SMS Notification Banner */}
      {showSmsBanner && (
        <div
          style={{
            backgroundColor: 'rgba(24, 34, 54, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 255, 36, 0.3)',
            borderRadius: '16px',
            padding: '12px 16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 255, 36, 0.15)',
            marginBottom: '20px',
            width: '100%',
            maxWidth: '380px',
            margin: '0 auto 20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>💬</span>
            <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {language === 'العربية' ? 'رسالة نصية • الآن' : 'SMS • Messages'}
              </div>
              <div style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>
                {language === 'العربية' ? 'رمز تحقق QTPay: ' : 'QTPay code: '}
                <strong style={{ color: '#00FF24', fontSize: '14px', letterSpacing: '1px' }}>{activeOtp}</strong>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleQuickFill(activeOtp)}
            style={{
              backgroundColor: '#00FF24',
              color: '#070D0A',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {language === 'العربية' ? 'تعبئة' : 'Autofill'}
          </button>
        </div>
      )}

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
          backgroundColor: '#111726',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '24px 20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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

        {/* Error Alert if incorrect OTP */}
        {errorMsg && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '12px',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* 6-Digit Clean OTP Boxes */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px', direction: 'ltr' }}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              autoFocus={i === 0}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="tabular-nums"
              style={{
                width: '46px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: '#182236',
                border: digit ? '1.5px solid #7FE87F' : '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '20px',
                fontWeight: 800,
                color: '#FFFFFF',
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
            />
          ))}
        </div>

        {/* Resend SMS Counter & Optional Quick-fill Helper */}
        <div style={{ textAlign: 'center', fontSize: '12.5px', color: '#A2A2BA', marginBottom: '18px' }}>
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
            {language === 'العربية' ? 'تم إعادة إرسال الرمز بنجاح' : 'Code resent successfully!'}
          </div>
        )}

        <PrimaryButton onClick={handleVerify} disabled={!isComplete}>
          {t('auth.verify_continue', 'Verify & Continue')} <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
        </PrimaryButton>

        {/* Subtle Testing Helper */}
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <button
            type="button"
            onClick={() => handleQuickFill()}
            style={{
              background: 'none',
              border: 'none',
              color: '#6E6E85',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            {language === 'العربية' ? 'رمز تجريبي: 589204' : 'Demo OTP: 589204'}
          </button>
        </div>
      </div>

      <div style={{ height: '20px' }} />
    </div>
  );
};
