import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { SamaLogo } from '../components/SamaLogo';
import { useApp } from '../state/AppContext';

export const SmsOtpScreen: React.FC = () => {
  const { navigateTo, screenParams, goBack } = useApp();
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
        backgroundColor: '#000000',
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
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '20px',
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px',
            boxShadow: 'none',
          }}
        >
          <AlphPayLogo variant="icon" size={40} themeMode="dark" />
        </div>

        <AlphPayLogo variant="horizontal" size={28} themeMode="dark" />
      </div>

      {/* Main OTP Verification Form */}
      <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
            Enter 6-Digit Code
          </h2>
          <p style={{ fontSize: '13px', color: '#A2A2BA', margin: '0 0 10px 0' }}>
            Sent via SMS to <span style={{ color: '#7FE87F', fontWeight: 700 }}>+966 {mobile}</span>
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
            Change Number
          </button>
        </div>

        {/* 6-Digit OTP Boxes */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '18px' }}>
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={digit}
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
                backgroundColor: '#151524',
                border: digit ? '1.5px solid #7FE87F' : '1px solid #2C2C44',
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
            backgroundColor: 'rgba(127, 232, 127, 0.08)',
            border: '1px solid rgba(127, 232, 127, 0.25)',
            padding: '10px 14px',
            borderRadius: '10px',
            marginBottom: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="#7FE87F" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>
              Auto-Read OTP: 589204
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="interactive-tap"
            style={{
              backgroundColor: '#7FE87F',
              color: '#0B0B14',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Autofill
          </button>
        </div>

        {/* Resend SMS Counter */}
        <div style={{ textAlign: 'center', fontSize: '12.5px', color: '#A2A2BA', marginBottom: '20px' }}>
          Didn't receive SMS?{' '}
          <button
            disabled={timer > 0}
            onClick={handleResend}
            style={{
              background: 'none',
              border: 'none',
              color: timer > 0 ? '#6E6E85' : '#7FE87F',
              fontWeight: 800,
              cursor: timer > 0 ? 'not-allowed' : 'pointer',
              padding: 0,
            }}
          >
            Resend Code {timer > 0 ? `(00:${timer < 10 ? `0${timer}` : timer}s)` : ''}
          </button>
        </div>

        {isResent && (
          <div style={{ textAlign: 'center', fontSize: '12px', color: '#7FE87F', fontWeight: 700, marginBottom: '14px' }}>
            ✓ New 6-digit code dispatched to +966 {mobile}
          </div>
        )}

        <PrimaryButton onClick={handleVerify} disabled={otp.some((d) => !d)}>
          Verify & Continue <ArrowRight size={18} />
        </PrimaryButton>
      </div>

      {/* Down in Center: Associated with SAMA */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            color: '#6E6E85',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Associated with
        </span>
        <SamaLogo height={20} themeMode="green" />
      </div>
    </div>
  );
};

