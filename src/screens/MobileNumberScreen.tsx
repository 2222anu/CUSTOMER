import React, { useState } from 'react';
import { User as UserIcon, ArrowRight } from 'lucide-react';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { SamaLogo } from '../components/SamaLogo';
import { useApp } from '../state/AppContext';

export const MobileNumberScreen: React.FC = () => {
  const { navigateTo, user, updateUser } = useApp();
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

      {/* Main Form: Input Fields & Action Button */}
      <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
        <form onSubmit={handleContinue} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                padding: '14px 16px',
                transition: 'border-color 0.2s ease',
              }}
            >
              <UserIcon size={18} color="#7FE87F" style={{ marginRight: '12px', flexShrink: 0 }} />
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

          {/* Saudi Mobile Number Input */}
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
                padding: '14px 16px',
                transition: 'border-color 0.2s ease',
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

          {/* Primary Submit Button */}
          <div style={{ marginTop: '6px' }}>
            <PrimaryButton type="submit" disabled={mobileNumber.length < 9 || fullName.trim().length === 0}>
              Get OTP & Verify <ArrowRight size={18} />
            </PrimaryButton>
          </div>
        </form>
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
