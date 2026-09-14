import React, { useState } from 'react';
import { User as UserIcon, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const MobileNumberScreen: React.FC = () => {
  const { navigateTo, user, updateUser, setIsLanguageModalOpen, language } = useApp();
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
        backgroundColor: '#1A1A2E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 20px 32px 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header Bar with Language Switcher */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <AlphPayLogo variant="header" size={26} themeMode="dark" />
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="interactive-tap"
            style={{
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>🌐</span>
            <span>{language}</span>
          </button>
        </div>

        {/* Security Tag Header */}
        <div
          style={{
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            borderRadius: '16px',
            padding: '16px 18px',
            color: '#FFFFFF',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'rgba(127, 232, 127, 0.15)',
              color: '#7FE87F',
              border: '1px solid rgba(127, 232, 127, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Secure Sign In & Registration</div>
            <div style={{ fontSize: '12px', color: '#B3B3C2' }}>Bank-grade biometric & device binding</div>
          </div>
        </div>

        {/* Main Input Form Card */}
        <form
          onSubmit={handleContinue}
          style={{
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            borderRadius: '16px',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: designSystem.shadows.md,
          }}
        >
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="name-input"
              style={{
                fontSize: '11px',
                color: '#B3B3C2',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Full Name</span>
              <span style={{ color: '#7FE87F', textTransform: 'none', fontWeight: 700 }}>As per bank records</span>
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1A1A2E',
                border: '1.5px solid #4D4D6B',
                borderRadius: '10px',
                padding: '12px 14px',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  backgroundColor: '#33334D',
                  color: '#7FE87F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0,
                }}
              >
                <UserIcon size={16} />
              </div>
              <input
                id="name-input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Mobile Number Input */}
          <div>
            <label
              htmlFor="mobile-input"
              style={{
                fontSize: '11px',
                color: '#B3B3C2',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'block',
              }}
            >
              Mobile Number
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1A1A2E',
                border: '1.5px solid #7FE87F',
                borderRadius: '10px',
                padding: '10px 14px',
              }}
            >
              {/* Country Code Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  paddingRight: '12px',
                  marginRight: '12px',
                  borderRight: '1px solid #4D4D6B',
                  fontWeight: 800,
                  fontSize: '14px',
                  color: '#FFFFFF',
                }}
              >
                <span>🇮🇳</span>
                <span>+91</span>
              </div>

              <input
                id="mobile-input"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="98765 43210"
                maxLength={10}
                required
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  width: '100%',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '0.05em',
                }}
              />
            </div>
          </div>

          <PrimaryButton type="submit" disabled={mobileNumber.length < 10 || fullName.trim().length === 0}>
            Get OTP & Bind Device <ArrowRight size={18} />
          </PrimaryButton>
        </form>
      </div>

      {/* Security Trust Badges Footer */}
      <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#808099', fontWeight: 700 }}>
          <Lock size={12} color="#7FE87F" />
          <span>256-Bit Hardware Encryption &bull; alph pay Certified</span>
        </div>
      </div>
    </div>
  );
};
