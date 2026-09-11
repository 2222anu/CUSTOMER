import React, { useState } from 'react';
import { MessageSquare, Phone, Users, Camera, MapPin, Mic, ShieldCheck } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

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

  const handleToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const permissions = [
    { key: 'sms', icon: <MessageSquare size={20} />, name: 'SMS Permission', desc: 'Required for automatic OTP detection & UPI device binding' },
    { key: 'phone', icon: <Phone size={20} />, name: 'Phone Permission', desc: 'Required to verify SIM slot and device identity' },
    { key: 'contacts', icon: <Users size={20} />, name: 'Contacts Permission', desc: 'Required to send and receive money from your contacts' },
    { key: 'camera', icon: <Camera size={20} />, name: 'Camera Permission', desc: 'Required to scan merchant and payee QR codes' },
    { key: 'location', icon: <MapPin size={20} />, name: 'Location Permission', desc: 'Required for location-based transaction fraud prevention' },
    { key: 'mic', icon: <Mic size={20} />, name: 'Microphone Permission', desc: 'Required for voice payment commands and helpline support' },
  ];

  const handleGrantPermissions = () => {
    localStorage.setItem('hasGrantedPermissions', 'true');
    navigateTo('HOME');
  };

  return (
    <div className="fade-in" style={{ backgroundColor: designSystem.colors.background, minHeight: '100vh' }}>
      <AppHeader title="App Permissions" showBack={true} onBack={goBack} showSettings={false} />

      <div style={{ padding: '20px', minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Header Card */}
          <div
            style={{
              backgroundColor: designSystem.colors.surface,
              border: `1px solid ${designSystem.colors.borderHairline}`,
              borderRadius: designSystem.radii.md,
              padding: '18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: designSystem.shadows.none,
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: designSystem.radii.md,
                backgroundColor: designSystem.colors.primaryLight,
                color: designSystem.colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: `1px solid ${designSystem.colors.primaryBorder}`,
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary, margin: 0 }}>
                Enable QTPay Permissions
              </h3>
              <p style={{ fontSize: '12px', color: designSystem.colors.textSecondary, marginTop: '2px', margin: 0 }}>
                Toggle individual permissions ON or OFF anytime
              </p>
            </div>
          </div>

          <div style={{ fontSize: '12px', fontWeight: designSystem.typography.weights.bold, color: designSystem.colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Required Device Access
          </div>

          {/* List of 6 Permissions with Interactive ON/OFF Toggles */}
          {permissions.map((perm) => {
            const isOn = toggles[perm.key];
            return (
              <div
                key={perm.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '14px 16px',
                  backgroundColor: designSystem.colors.surface,
                  border: `1px solid ${designSystem.colors.borderHairline}`,
                  borderRadius: designSystem.radii.md,
                  marginBottom: '10px',
                  boxShadow: designSystem.shadows.none,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: designSystem.radii.md,
                      backgroundColor: isOn ? designSystem.colors.primaryLight : designSystem.colors.subSurface,
                      color: isOn ? designSystem.colors.primary : designSystem.colors.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {perm.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: designSystem.typography.weights.bold, fontSize: '14px', color: designSystem.colors.textPrimary }}>
                      {perm.name}
                    </div>
                    <div style={{ fontSize: '11px', color: designSystem.colors.textSecondary, marginTop: '2px' }}>
                      {perm.desc}
                    </div>
                  </div>
                </div>

                {/* ON / OFF Toggle Switch */}
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
                    borderRadius: designSystem.radii.full,
                    backgroundColor: isOn ? designSystem.colors.primary : designSystem.colors.borderStrong,
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
                      borderRadius: designSystem.radii.full,
                      backgroundColor: designSystem.colors.surface,
                      transform: isOn ? 'translateX(20px)' : 'translateX(0px)',
                      transition: 'transform 0.2s ease',
                      boxShadow: designSystem.shadows.none,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <PrimaryButton onClick={handleGrantPermissions}>
            Save & Continue
          </PrimaryButton>
          <SecondaryButton onClick={handleGrantPermissions}>
            Skip for Now
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};
