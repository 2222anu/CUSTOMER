import React, { useState } from 'react';
import { User as UserIcon, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const MobileNumberScreen: React.FC = () => {
  const { navigateTo, user, updateUser, setIsLanguageModalOpen, language } = useApp();
  const [fullName, setFullName] = useState<string>(user.name || 'Fahad Al-Harbi');
  const [mobileNumber, setMobileNumber] = useState<string>('501234567');

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (mobileNumber.length >= 9 && fullName.trim().length > 0) {
      updateUser({ name: fullName, mobile: `+966 ${mobileNumber}` });
      navigateTo('SMS_OTP', { mobile: mobileNumber, name: fullName });
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#0B0B14',
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
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
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
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
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
              border: '1px solid rgba(127, 232, 127, 0.4)',
              color: '#7FE87F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>SAMA Regulated &bull; Sarie Enabled</div>
            <div style={{ fontSize: '12px', color: '#A2A2BA', marginTop: '2px' }}>
              Instant Saudi payments via national banking rail
            </div>
          </div>
        </div>

        {/* Main Content Form */}
        <form onSubmit={handleContinue} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="fullname-input"
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#A2A2BA',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Full Name (as per National ID / Iqama)
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                borderRadius: '14px',
                padding: '12px 14px',
              }}
            >
              <UserIcon size={18} color="#7FE87F" style={{ marginRight: '10px', flexShrink: 0 }} />
              <input
                id="fullname-input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Fahad Al-Harbi"
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
                fontWeight: 800,
                color: '#A2A2BA',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Saudi Mobile Number
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                borderRadius: '14px',
                padding: '12px 14px',
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
                  borderRight: '1px solid #2C2C44',
                  fontWeight: 800,
                  fontSize: '14px',
                  color: '#FFFFFF',
                }}
              >
                <span>🇸🇦</span>
                <span>+966</span>
              </div>

              <input
                id="mobile-input"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                placeholder="50 123 4567"
                maxLength={9}
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

          <PrimaryButton type="submit" disabled={mobileNumber.length < 9 || fullName.trim().length === 0}>
            Get OTP & Verify <ArrowRight size={18} />
          </PrimaryButton>
        </form>
      </div>

      {/* Security Trust Badges Footer */}
      <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#6E6E85', fontWeight: 700 }}>
          <Lock size={12} color="#7FE87F" />
          <span>256-Bit Hardware Encrypted &bull; SAMA & Sarie Network</span>
        </div>
      </div>
    </div>
  );
};
