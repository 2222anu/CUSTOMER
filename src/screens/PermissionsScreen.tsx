import React, { useState } from 'react';
import { MessageSquare, Phone, Users, Camera, MapPin, Mic, ShieldCheck, ArrowRight, Lock, Landmark, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { useApp } from '../state/AppContext';

export const PermissionsScreen: React.FC = () => {
  const { navigateTo, goBack } = useApp();

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    sms: true,
    phone: true,
    contacts: true,
    camera: true,
    location: true,
    mic: false,
  });
  const [isDiscovering, setIsDiscovering] = useState<boolean>(false);
  const [discoveryStep, setDiscoveryStep] = useState<number>(0);

  const handleToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const permissions = [
    {
      key: 'sms',
      icon: <MessageSquare size={19} />,
      name: 'SMS Verification',
      required: true,
    },
    {
      key: 'phone',
      icon: <Phone size={19} />,
      name: 'Phone & SIM Status',
      required: true,
    },
    {
      key: 'contacts',
      icon: <Users size={19} />,
      name: 'Contacts Access',
      required: false,
    },
    {
      key: 'camera',
      icon: <Camera size={19} />,
      name: 'Camera & QR Scanner',
      required: false,
    },
    {
      key: 'location',
      icon: <MapPin size={19} />,
      name: 'Location Security',
      required: false,
    },
    {
      key: 'mic',
      icon: <Mic size={19} />,
      name: 'Voice Assistant',
      required: false,
    },
  ];

  const handleGrantPermissions = () => {
    try {
      localStorage.setItem('hasGrantedPermissions', 'true');
      localStorage.setItem('hasCompletedOnboarding', 'true');
    } catch {
      // Ignore
    }

    setIsDiscovering(true);
    setDiscoveryStep(1);

    setTimeout(() => {
      setDiscoveryStep(2);
    }, 900);

    setTimeout(() => {
      setDiscoveryStep(3);
    }, 1800);

    setTimeout(() => {
      navigateTo('HOME');
    }, 2700);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '32px', color: '#ffffff' }}>
      <div>
        <AppHeader title="App Permissions" showBack={true} onBack={goBack} showSettings={false} />

        <div style={{ padding: '20px' }}>
          {/* Header Card - Clean & Minimal */}
          <div
            style={{
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
              borderRadius: '18px',
              padding: '16px 18px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                color: '#7FE87F',
                border: '1px solid rgba(127, 232, 127, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              NPCI Mandated Security
            </div>
          </div>

          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#B3B3C2',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
              paddingLeft: '4px',
            }}
          >
            Device Permissions ({Object.values(toggles).filter(Boolean).length}/6 Granted)
          </div>

          {/* Grouped Permissions Card */}
          <div
            style={{
              backgroundColor: '#2A2A3E',
              borderRadius: '18px',
              border: '1px solid #4D4D6B',
              overflow: 'hidden',
            }}
          >
            {permissions.map((perm, index) => {
              const isOn = toggles[perm.key];
              return (
                <React.Fragment key={perm.key}>
                  {index > 0 && <div style={{ height: '1px', backgroundColor: '#3A3A52', margin: '0 16px' }} />}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      padding: '14px 16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          backgroundColor: isOn ? 'rgba(127, 232, 127, 0.15)' : '#3A3A52',
                          color: isOn ? '#7FE87F' : '#B3B3C2',
                          border: isOn ? '1px solid rgba(127, 232, 127, 0.35)' : '1px solid #4D4D6B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {perm.icon}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '14px', color: '#ffffff' }}>
                          {perm.name}
                        </span>
                        {perm.required && (
                          <span style={{ fontSize: '9px', fontWeight: 800, backgroundColor: 'rgba(127, 232, 127, 0.15)', color: '#7FE87F', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(127, 232, 127, 0.3)' }}>
                            REQUIRED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Switch Toggle */}
                    <div
                      role="switch"
                      aria-checked={isOn}
                      aria-label={perm.name}
                      tabIndex={0}
                      onClick={() => handleToggle(perm.key)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleToggle(perm.key);
                        }
                      }}
                      style={{
                        width: '46px',
                        height: '26px',
                        borderRadius: '9999px',
                        backgroundColor: isOn ? '#7FE87F' : '#3A3A52',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: isOn ? '#000000' : '#B3B3C2',
                          transform: isOn ? 'translateX(20px)' : 'translateX(0px)',
                          transition: 'transform 0.2s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <PrimaryButton onClick={handleGrantPermissions}>
          Allow Permissions & Enter alph pay <ArrowRight size={18} />
        </PrimaryButton>
        <SecondaryButton onClick={handleGrantPermissions}>
          Skip & Customize Later
        </SecondaryButton>

        <div style={{ textAlign: 'center', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={12} color="#B3B3C2" />
          <span style={{ fontSize: '11px', color: '#B3B3C2', fontWeight: 600 }}>
            256-Bit Hardware Encrypted
          </span>
        </div>
      </div>

      {/* Interactive Bank Discovery & Instant KYC Modal */}
      {isDiscovering && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 10, 20, 0.82)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="fade-in"
            style={{
              backgroundColor: '#2A2A3E',
              borderRadius: '20px',
              border: '1px solid #4D4D6B',
              padding: '28px 24px',
              width: '100%',
              maxWidth: '380px',
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                color: '#7FE87F',
                border: '1px solid rgba(127, 232, 127, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              {discoveryStep === 1 && <Loader2 size={32} className="animate-spin" />}
              {discoveryStep === 2 && <Landmark size={32} />}
              {discoveryStep === 3 && <CheckCircle2 size={36} color="#7FE87F" />}
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0' }}>
              {discoveryStep === 1 && 'Discovering Bank Accounts...'}
              {discoveryStep === 2 && 'Accounts Found & Linked!'}
              {discoveryStep === 3 && 'KYC Verified • Ready!'}
            </h3>

            <p style={{ fontSize: '13px', color: '#B3B3C2', margin: '0 0 20px 0', lineHeight: '1.4' }}>
              {discoveryStep === 1 && 'Binding SIM card and verifying NPCI UPI registration on +91 98765 43210'}
              {discoveryStep === 2 && 'Discovered ICICI Bank (Savings •••• 3616) and YES Bank accounts'}
              {discoveryStep === 3 && 'Instant Aadhaar e-KYC authentication successful. Redirecting to home...'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: discoveryStep >= 1 ? 'rgba(127, 232, 127, 0.12)' : '#3A3A52',
                  border: `1px solid ${discoveryStep >= 1 ? 'rgba(127, 232, 127, 0.35)' : '#4D4D6B'}`,
                }}
              >
                {discoveryStep >= 1 ? <CheckCircle2 size={16} color="#7FE87F" /> : <Loader2 size={16} color="#B3B3C2" />}
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: discoveryStep >= 1 ? '#ffffff' : '#B3B3C2' }}>
                  Device Binding & SIM Verification
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: discoveryStep >= 2 ? 'rgba(127, 232, 127, 0.12)' : '#3A3A52',
                  border: `1px solid ${discoveryStep >= 2 ? 'rgba(127, 232, 127, 0.35)' : '#4D4D6B'}`,
                }}
              >
                {discoveryStep >= 2 ? <CheckCircle2 size={16} color="#7FE87F" /> : <Loader2 size={16} color="#B3B3C2" />}
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: discoveryStep >= 2 ? '#ffffff' : '#B3B3C2' }}>
                  Bank Accounts Discovered (ICICI, YES Bank)
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: discoveryStep >= 3 ? 'rgba(127, 232, 127, 0.2)' : '#3A3A52',
                  border: `1px solid ${discoveryStep >= 3 ? '#7FE87F' : '#4D4D6B'}`,
                }}
              >
                {discoveryStep >= 3 ? <CheckCircle2 size={16} color="#7FE87F" /> : <Sparkles size={16} color="#B3B3C2" />}
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: discoveryStep >= 3 ? '#7FE87F' : '#B3B3C2' }}>
                  NPCI Instant e-KYC Authenticated
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
