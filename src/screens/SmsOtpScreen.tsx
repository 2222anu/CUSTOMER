import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

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
    <div className="fade-in" style={{ backgroundColor: designSystem.colors.background, minHeight: '100vh' }}>
      <AppHeader title="OTP Verification" showBack showSettings={false} />

      <div style={{ padding: '24px 20px 32px 20px', minHeight: '82vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div
          style={{
            backgroundColor: designSystem.colors.surface,
            border: `1px solid ${designSystem.colors.borderHairline}`,
            borderRadius: designSystem.radii.lg,
            padding: '28px 24px',
            boxShadow: designSystem.shadows.none,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Top Emblem & Header */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: designSystem.radii.full,
                backgroundColor: designSystem.colors.primaryLight,
                color: designSystem.colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: `1px solid ${designSystem.colors.primaryBorder}`,
              }}
            >
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary, margin: 0 }}>
              Verify Phone Number
            </h3>
            <p style={{ fontSize: '13px', color: designSystem.colors.textSecondary, marginTop: '6px', marginBottom: 0 }}>
              Enter the 6-digit OTP code sent via SMS to <strong style={{ color: designSystem.colors.textPrimary }}>+91 {mobile}</strong>
            </p>
          </div>

          {/* 6-Digit OTP Input Boxes */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
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
                  width: '42px',
                  height: '48px',
                  borderRadius: designSystem.radii.md,
                  backgroundColor: designSystem.colors.inputFill,
                  border: `1.5px solid ${designSystem.colors.primary}`,
                  fontSize: '20px',
                  fontWeight: designSystem.typography.weights.extrabold,
                  color: designSystem.colors.textPrimary,
                  textAlign: 'center',
                  outline: 'none',
                  boxShadow: designSystem.shadows.none,
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
              backgroundColor: designSystem.colors.primaryLight,
              border: `1px solid ${designSystem.colors.primaryBorder}`,
              padding: '12px 16px',
              borderRadius: designSystem.radii.md,
              fontSize: '13px',
              fontWeight: designSystem.typography.weights.bold,
              color: designSystem.colors.primary,
            }}
          >
            <CheckCircle2 size={18} /> SMS OTP Auto-Detected Successfully
          </div>

          {/* Resend Link */}
          <div style={{ textAlign: 'center', fontSize: '13px', color: designSystem.colors.textSecondary }}>
            Didn't receive code?{' '}
            <button
              disabled={timer > 0}
              onClick={handleResend}
              style={{
                background: 'none',
                border: 'none',
                color: timer > 0 ? designSystem.colors.textDisabled : designSystem.colors.primary,
                fontWeight: designSystem.typography.weights.bold,
                cursor: timer > 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Resend OTP {timer > 0 ? `(${timer}s)` : ''}
            </button>
          </div>

          {isResent && (
            <div style={{ textAlign: 'center', fontSize: '12px', color: designSystem.colors.primary, fontWeight: designSystem.typography.weights.semibold }}>
              New OTP sent to +91 {mobile}
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <PrimaryButton onClick={handleVerify}>
            Verify & Proceed →
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
