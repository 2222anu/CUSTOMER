import React, { useState } from 'react';
import { User as UserIcon, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const MobileNumberScreen: React.FC = () => {
  const { navigateTo, user, updateUser } = useApp();
  const [fullName, setFullName] = useState<string>(user.name || 'Anu');
  const [mobileNumber, setMobileNumber] = useState<string>('9876543210');

  const handleContinue = () => {
    if (mobileNumber.length >= 10 && fullName.trim().length > 0) {
      updateUser({ name: fullName, mobile: `+91 ${mobileNumber}` });
      navigateTo('SMS_OTP', { mobile: mobileNumber, name: fullName });
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        height: '100%',
        maxHeight: '100vh',
        backgroundColor: '#F4F1EC',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 20px 20px 20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Header Logo */}
      <div style={{ textAlign: 'center', margin: '4px 0 8px 0' }}>
        <QtPayLogo variant="splash" size={100} showTagline={false} themeMode="light" />
      </div>

      {/* Main Content Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #DAD1C8',
          borderRadius: '20px',
          padding: '18px 20px',
          boxShadow: '0 8px 24px rgba(17, 17, 68, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: '#FDE8D7',
              border: '1px solid #F98513',
              color: '#F98513',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Smartphone size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#111144', margin: 0 }}>
              Registration & Login
            </h2>
            <p style={{ fontSize: '11.5px', color: '#5C564D', margin: '2px 0 0 0' }}>
              Enter your details to link UPI account
            </p>
          </div>
        </div>

        {/* Full Name Input Field */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '10.5px', color: '#5C564D', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
            Full Name
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F4F1EC',
              border: '1.5px solid #DAD1C8',
              borderRadius: '14px',
              padding: '10px 14px',
            }}
          >
            <UserIcon size={18} style={{ color: '#F98513', marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                fontWeight: '700',
                color: '#111144',
                width: '100%',
              }}
            />
          </div>
        </div>

        {/* Mobile Number Input Field with +91 Prefix Only */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '10.5px', color: '#5C564D', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
            Mobile Number
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F4F1EC',
              border: '1.5px solid #DAD1C8',
              borderRadius: '14px',
              padding: '10px 14px',
            }}
          >
            <span style={{ fontWeight: '800', fontSize: '15px', color: '#111144', marginRight: '8px' }}>
              +91
            </span>
            <div style={{ width: '1px', height: '18px', backgroundColor: '#DAD1C8', marginRight: '10px' }} />
            <input
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
                fontSize: '16px',
                fontWeight: '700',
                color: '#111144',
                width: '100%',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#5C564D' }}>
          <ShieldCheck size={15} color="#F98513" />
          An SMS with 6-digit OTP will be auto-detected
        </div>
      </div>

      {/* Continue Action Button - Guaranteed to fit inside mobile screen viewport */}
      <div style={{ marginTop: '12px' }}>
        <PrimaryButton onClick={handleContinue} disabled={mobileNumber.length < 10 || fullName.trim().length === 0}>
          Continue <ArrowRight size={18} />
        </PrimaryButton>
      </div>
    </div>
  );
};
