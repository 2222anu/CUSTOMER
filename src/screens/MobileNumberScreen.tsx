import React, { useState } from 'react';
import { User as UserIcon, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const MobileNumberScreen: React.FC = () => {
  const { navigateTo, user, updateUser } = useApp();
  const [fullName, setFullName] = useState<string>(user.name || 'Anu');
  const [mobileNumber, setMobileNumber] = useState<string>('9876543210');

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (mobileNumber.length >= 10 && fullName.trim().length > 0) {
      updateUser({ name: fullName, mobile: `+91 ${mobileNumber}` });
      navigateTo('SMS_OTP', { mobile: mobileNumber, name: fullName });
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: designSystem.colors.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px 32px 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 16px 0' }}>
        <QtPayLogo variant="horizontal" size={28} themeMode="light" showTagline={true} />
      </div>

      {/* Main Registration Card */}
      <form
        onSubmit={handleContinue}
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
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary, margin: 0, letterSpacing: '-0.01em' }}>
            Welcome to QTPay
          </h2>
          <p style={{ fontSize: '13px', color: designSystem.colors.textSecondary, margin: '4px 0 0 0', lineHeight: '1.4' }}>
            Enter your mobile number to link your bank account & set up UPI
          </p>
        </div>

        {/* Full Name Input Field */}
        <div>
          <label htmlFor="name-input" style={{ fontSize: '11px', color: designSystem.colors.textSecondary, fontWeight: designSystem.typography.weights.bold, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
            Full Name (As in Bank Account)
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: designSystem.colors.inputFill,
              border: `1px solid ${designSystem.colors.borderStrong}`,
              borderRadius: designSystem.radii.md,
              padding: '12px 14px',
            }}
          >
            <UserIcon size={18} style={{ color: designSystem.colors.primary, marginRight: '12px', flexShrink: 0 }} />
            <input
              id="name-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              required
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                fontWeight: designSystem.typography.weights.bold,
                color: designSystem.colors.textPrimary,
                width: '100%',
              }}
            />
          </div>
        </div>

        {/* Mobile Number Input Field with +91 Country Badge */}
        <div>
          <label htmlFor="mobile-input" style={{ fontSize: '11px', color: designSystem.colors.textSecondary, fontWeight: designSystem.typography.weights.bold, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
            Mobile Number
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: designSystem.colors.inputFill,
              border: `1.5px solid ${designSystem.colors.primaryBorder}`,
              borderRadius: designSystem.radii.md,
              padding: '12px 14px',
            }}
          >
            {/* Country Flag Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: designSystem.colors.primaryLight, padding: '4px 8px', borderRadius: designSystem.radii.xs, marginRight: '10px' }}>
              <span style={{ fontSize: '14px' }}>🇮🇳</span>
              <span style={{ fontWeight: designSystem.typography.weights.extrabold, fontSize: '14px', color: designSystem.colors.primary }}>+91</span>
            </div>
            <input
              id="mobile-input"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              maxLength={10}
              placeholder="9876543210"
              required
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: '17px',
                fontWeight: designSystem.typography.weights.extrabold,
                color: designSystem.colors.textPrimary,
                width: '100%',
                letterSpacing: '0.05em',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: designSystem.colors.textSecondary, backgroundColor: designSystem.colors.background, padding: '10px 12px', borderRadius: designSystem.radii.sm, border: `1px solid ${designSystem.colors.borderHairline}` }}>
          <ShieldCheck size={16} color={designSystem.colors.primary} />
          <span>A 6-digit SMS OTP will be automatically generated</span>
        </div>

        <PrimaryButton type="submit" disabled={mobileNumber.length < 10 || fullName.trim().length === 0}>
          Get OTP <ArrowRight size={18} />
        </PrimaryButton>
      </form>

      {/* Security Footer */}
      <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: designSystem.colors.textMuted, fontWeight: designSystem.typography.weights.bold }}>
        <Lock size={12} color={designSystem.colors.textMuted} />
        <span>256-Bit Bank Grade Encryption • NPCI & UPI Verified</span>
      </div>
    </div>
  );
};
