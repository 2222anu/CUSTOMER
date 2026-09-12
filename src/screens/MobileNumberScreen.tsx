import React, { useState } from 'react';
import { User as UserIcon, ArrowRight, ShieldCheck, Lock, Check } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const MobileNumberScreen: React.FC = () => {
  const { navigateTo, user, updateUser, setIsLanguageModalOpen, language } = useApp();
  const [fullName, setFullName] = useState<string>(user.name || 'Anu');
  const [mobileNumber, setMobileNumber] = useState<string>('9876543210');
  const [selectedSim, setSelectedSim] = useState<'sim1' | 'sim2'>('sim1');

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (mobileNumber.length >= 10 && fullName.trim().length > 0) {
      updateUser({ name: fullName, mobile: `+91 ${mobileNumber}` });
      navigateTo('SMS_OTP', { mobile: mobileNumber, name: fullName, sim: selectedSim });
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 20px 32px 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header Bar with Language Switcher */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <QtPayLogo variant="horizontal" size={26} showTagline={false} />
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="interactive-tap"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '20px',
              padding: '5px 12px',
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span>🌐</span>
            <span>{language}</span>
          </button>
        </div>

        {/* Security Tag Header */}
        <div
          style={{
            backgroundColor: '#0e274d',
            borderRadius: '16px',
            padding: '16px 18px',
            color: '#ffffff',
            marginBottom: '18px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: 'rgba(46, 131, 255, 0.25)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={18} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>UPI Device Registration</div>
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.45' }}>
            Verify your mobile number linked to your bank account to enable instant payments.
          </p>
        </div>

        {/* Main Input Form Card */}
        <form
          onSubmit={handleContinue}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="name-input"
              style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Full Name</span>
              <span style={{ color: '#2e83ff', textTransform: 'none', fontWeight: 700 }}>As per bank records</span>
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '12px 14px',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  backgroundColor: '#eef5ff',
                  color: '#2e83ff',
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
                  color: '#0f172a',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Mobile Number Input with +91 Country Badge */}
          <div>
            <label
              htmlFor="mobile-input"
              style={{
                fontSize: '11px',
                color: '#64748b',
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
                backgroundColor: '#f8fafc',
                border: '1.5px solid #2e83ff',
                borderRadius: '12px',
                padding: '10px 14px',
              }}
            >
              {/* Country Flag Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#eef5ff',
                  border: '1px solid #d6e6ff',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  marginRight: '10px',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: '15px' }}>🇮🇳</span>
                <span style={{ fontWeight: 800, fontSize: '14px', color: '#2e83ff' }}>+91</span>
              </div>
              <input
                id="mobile-input"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={10}
                placeholder="9876543210"
                required
                className="tabular-nums"
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#0f172a',
                  width: '100%',
                  letterSpacing: '0.05em',
                }}
              />
            </div>
          </div>

          {/* SIM Card Slot Selector (Fintech Authenticator) */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Select Registered Bank SIM Slot
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {/* SIM 1 */}
              <div
                onClick={() => setSelectedSim('sim1')}
                className="interactive-tap"
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: selectedSim === 'sim1' ? '#eef5ff' : '#f8fafc',
                  border: selectedSim === 'sim1' ? '1.5px solid #2e83ff' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>SIM 1 (Jio 5G)</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px' }}>Primary Bank Slot</div>
                </div>
                {selectedSim === 'sim1' && (
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#2e83ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={11} strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* SIM 2 */}
              <div
                onClick={() => setSelectedSim('sim2')}
                className="interactive-tap"
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: selectedSim === 'sim2' ? '#eef5ff' : '#f8fafc',
                  border: selectedSim === 'sim2' ? '1.5px solid #2e83ff' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>SIM 2 (Airtel)</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px' }}>Secondary Slot</div>
                </div>
                {selectedSim === 'sim2' && (
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#2e83ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={11} strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11.5px',
              color: '#475569',
              backgroundColor: '#f8fafc',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            }}
          >
            <ShieldCheck size={16} color="#10b981" />
            <span>An automated encrypted SMS will verify your bank UPI profile</span>
          </div>

          <PrimaryButton type="submit" disabled={mobileNumber.length < 10 || fullName.trim().length === 0}>
            Get OTP Verification Code <ArrowRight size={18} />
          </PrimaryButton>
        </form>
      </div>

      {/* Security Trust Badges Footer */}
      <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
          <Lock size={12} color="#2e83ff" />
          <span>NPCI & BHIM UPI Certified &bull; 256-Bit Hardware Encryption</span>
        </div>
      </div>
    </div>
  );
};
