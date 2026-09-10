import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const SmsOtpScreen: React.FC = () => {
  const { navigateTo, screenParams } = useApp();
  const mobile = screenParams.mobile || '9876543210';

  const [otp, setOtp] = useState<string[]>(['5', '8', '9', '2', '0', '4']);
  const [timer, setTimer] = useState(30);
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

  return (
    <div className="fade-in">
      <AppHeader title="OTP Verification" showBack showSettings={false} />

      <div style={{ padding: '24px 20px', minHeight: '82vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Header Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #DAD1C8',
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '28px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(17, 17, 68, 0.04)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FDE8D7',
                color: '#F98513',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px auto',
                border: '1px solid #F98513',
              }}
            >
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111144', margin: 0 }}>
              Auto-Detecting OTP
            </h3>
            <p style={{ fontSize: '13px', color: '#5C564D', marginTop: '6px', marginBottom: 0 }}>
              Verification code sent to <strong style={{ color: '#111144' }}>+91 {mobile}</strong>
            </p>
          </div>

          {/* 6-Digit OTP Boxes */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const newOtp = [...otp];
                  newOtp[i] = e.target.value;
                  setOtp(newOtp);
                }}
                style={{
                  width: '46px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #F98513',
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#111144',
                  textAlign: 'center',
                  outline: 'none',
                  boxShadow: '0 2px 10px rgba(249, 133, 19, 0.15)',
                }}
              />
            ))}
          </div>

          {/* Auto-Detect Success Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#FDE8D7',
              border: '1px solid #F98513',
              padding: '12px 16px',
              borderRadius: '14px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#F98513',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={18} /> SMS OTP Auto-Detected Successfully
          </div>

          {/* Resend Link */}
          <div style={{ textAlign: 'center', fontSize: '13px', color: '#5C564D' }}>
            Didn't receive code?{' '}
            <button
              disabled={timer > 0}
              onClick={handleResend}
              style={{
                background: 'none',
                border: 'none',
                color: timer > 0 ? '#8E887E' : '#F98513',
                fontWeight: '700',
                cursor: timer > 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Resend OTP {timer > 0 ? `(${timer}s)` : ''}
            </button>
          </div>

          {isResent && (
            <div style={{ textAlign: 'center', fontSize: '12px', color: '#F98513', fontWeight: '600', marginTop: '8px' }}>
              New OTP sent to +91 {mobile}
            </div>
          )}
        </div>

        <PrimaryButton onClick={handleVerify}>
          Verify & Continue
        </PrimaryButton>
      </div>
    </div>
  );
};
