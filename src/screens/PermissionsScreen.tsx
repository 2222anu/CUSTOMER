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
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '32px' }}>
      <div>
        <AppHeader title="App Permissions" showBack={true} onBack={goBack} showSettings={false} />

        <div style={{ padding: '20px' }}>
          {/* Header Card - Clean & Minimal */}
          <div
            style={{
              backgroundColor: '#0e274d',
              border: '1px solid #1e3a8a',
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
                backgroundColor: 'rgba(46, 131, 255, 0.25)',
                color: '#38bdf8',
                border: '1px solid rgba(46, 131, 255, 0.4)',
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
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
              paddingLeft: '4px',
            }}
          >
            Device Permissions ({Object.values(toggles).filter(Boolean).length}/6 Granted)
          </div>

          {/* Grouped Permissions Card - Main Items Only */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}
          >
            {permissions.map((perm, index) => {
              const isOn = toggles[perm.key];
              return (
                <React.Fragment key={perm.key}>
                  {index > 0 && <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />}
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
                          backgroundColor: isOn ? '#eef5ff' : '#f8fafc',
                          color: isOn ? '#2e83ff' : '#94a3b8',
                          border: isOn ? '1px solid #d6e6ff' : '1px solid #e2e8f0',
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
                        <span style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a' }}>
                          {perm.name}
                        </span>
                        {perm.required && (
                          <span style={{ fontSize: '9px', fontWeight: 800, backgroundColor: 'rgba(46, 131, 255, 0.1)', color: '#2e83ff', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(46, 131, 255, 0.2)' }}>
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
                        backgroundColor: isOn ? '#2e83ff' : '#cbd5e1',
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
                          backgroundColor: '#ffffff',
                          transform: isOn ? 'translateX(20px)' : 'translateX(0px)',
                          transition: 'transform 0.2s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
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
          Allow Permissions & Enter QTPay <ArrowRight size={18} />
        </PrimaryButton>
        <SecondaryButton onClick={handleGrantPermissions}>
          Skip & Customize Later
        </SecondaryButton>

        <div style={{ textAlign: 'center', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={12} color="#64748b" />
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
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
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
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
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '28px 24px',
              width: '100%',
              maxWidth: '380px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              {discoveryStep === 1 && <Loader2 size={32} className="animate-spin" />}
              {discoveryStep === 2 && <Landmark size={32} />}
              {discoveryStep === 3 && <CheckCircle2 size={36} color="#10b981" />}
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
              {discoveryStep === 1 && 'Discovering Bank Accounts...'}
              {discoveryStep === 2 && 'Accounts Found & Linked!'}
              {discoveryStep === 3 && 'KYC Verified • Ready!'}
            </h3>

            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: '1.4' }}>
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
                  backgroundColor: discoveryStep >= 1 ? '#eef5ff' : '#f8fafc',
                  border: `1px solid ${discoveryStep >= 1 ? '#d6e6ff' : '#e2e8f0'}`,
                }}
              >
                {discoveryStep >= 1 ? <CheckCircle2 size={16} color="#2e83ff" /> : <Loader2 size={16} color="#94a3b8" />}
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: discoveryStep >= 1 ? '#0f172a' : '#64748b' }}>
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
                  backgroundColor: discoveryStep >= 2 ? '#eef5ff' : '#f8fafc',
                  border: `1px solid ${discoveryStep >= 2 ? '#d6e6ff' : '#e2e8f0'}`,
                }}
              >
                {discoveryStep >= 2 ? <CheckCircle2 size={16} color="#2e83ff" /> : <Loader2 size={16} color="#94a3b8" />}
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: discoveryStep >= 2 ? '#0f172a' : '#64748b' }}>
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
                  backgroundColor: discoveryStep >= 3 ? '#d1fae5' : '#f8fafc',
                  border: `1px solid ${discoveryStep >= 3 ? '#a7f3d0' : '#e2e8f0'}`,
                }}
              >
                {discoveryStep >= 3 ? <CheckCircle2 size={16} color="#10b981" /> : <Sparkles size={16} color="#94a3b8" />}
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: discoveryStep >= 3 ? '#065f46' : '#64748b' }}>
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
