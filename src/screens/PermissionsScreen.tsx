import React, { useState } from 'react';
import { MessageSquare, Phone, Users, Camera, MapPin, Mic, ArrowRight, Lock } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

export const PermissionsScreen: React.FC = () => {
  const { navigateTo, goBack, t, isRtl, language } = useApp();

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
    {
      key: 'sms',
      icon: <MessageSquare size={19} />,
      name: language === 'العربية' ? 'التحقق عبر الرسائل القصيرة (SMS)' : 'SMS Verification',
      required: true,
    },
    {
      key: 'phone',
      icon: <Phone size={19} />,
      name: language === 'العربية' ? 'حالة الشريحة والجهاز' : 'Phone & SIM Status',
      required: true,
    },
    {
      key: 'contacts',
      icon: <Users size={19} />,
      name: language === 'العربية' ? 'الوصول لجهات الاتصال' : 'Contacts Access',
      required: false,
    },
    {
      key: 'camera',
      icon: <Camera size={19} />,
      name: language === 'العربية' ? 'الكاميرا ومسح الباركود' : 'Camera & QR Scanner',
      required: false,
    },
    {
      key: 'location',
      icon: <MapPin size={19} />,
      name: language === 'العربية' ? 'أمان الموقع الجغرافي' : 'Location Security',
      required: false,
    },
    {
      key: 'mic',
      icon: <Mic size={19} />,
      name: language === 'العربية' ? 'التنبيهات الصوتية والدفع الصوتي' : 'Audio Alerts & Voice Pay',
      required: false,
    },
  ];

  const handleGrantPermissions = () => {
    try {
      localStorage.setItem('hasGrantedPermissions', 'true');
    } catch {
      // Ignore
    }
    navigateTo('ONBOARDING_KYC');
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#0B0B14', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '32px', color: '#FFFFFF' }}>
      <div>
        <AppHeader title={t('auth.permissions_title', 'App Permissions')} showBack={true} onBack={goBack} showSettings={false} />

        <div style={{ padding: '20px' }}>
          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#6E6E85',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
              paddingInlineStart: '4px',
            }}
          >
            {language === 'العربية'
              ? `صلاحيات الجهاز (تم منح ${Object.values(toggles).filter(Boolean).length}/٦)`
              : `Device Permissions (${Object.values(toggles).filter(Boolean).length}/6 Granted)`}
          </div>

          {/* Grouped Permissions Card */}
          <div
            style={{
              backgroundColor: '#151524',
              borderRadius: '16px',
              border: '1px solid #2C2C44',
              overflow: 'hidden',
              boxShadow: 'none',
            }}
          >
            {permissions.map((perm, index) => {
              const isOn = toggles[perm.key];
              return (
                <React.Fragment key={perm.key}>
                  {index > 0 && <div style={{ height: '1px', backgroundColor: '#2C2C44', margin: '0 16px' }} />}
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
                          backgroundColor: isOn ? 'rgba(127, 232, 127, 0.15)' : '#1E1E32',
                          color: isOn ? '#7FE87F' : '#A2A2BA',
                          border: isOn ? '1px solid rgba(127, 232, 127, 0.35)' : '1px solid #2C2C44',
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
                        <span style={{ fontWeight: 800, fontSize: '14px', color: '#FFFFFF' }}>
                          {perm.name}
                        </span>
                        {perm.required && (
                          <span style={{ fontSize: '9px', fontWeight: 800, backgroundColor: 'rgba(127, 232, 127, 0.15)', color: '#7FE87F', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(127, 232, 127, 0.3)' }}>
                            {language === 'العربية' ? 'إلزامي' : 'REQUIRED'}
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
                        backgroundColor: isOn ? '#7FE87F' : '#1E1E32',
                        border: isOn ? 'none' : '1px solid #2C2C44',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        flexShrink: 0,
                        direction: 'ltr',
                      }}
                    >
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: isOn ? '#0B0B14' : '#A2A2BA',
                          transform: isOn ? 'translateX(20px)' : 'translateX(0px)',
                          transition: 'transform 0.2s ease',
                          boxShadow: 'none',
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
          {t('auth.allow_continue', 'Allow & Continue')}{' '}
          <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
        </PrimaryButton>

        <div style={{ textAlign: 'center', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={12} color="#6E6E85" />
          <span style={{ fontSize: '11px', color: '#6E6E85', fontWeight: 600 }}>
            {language === 'العربية' ? 'تشفير أجهزة متقدم بمستوى ٢٥٦ بت' : '256-Bit Hardware Encrypted'}
          </span>
        </div>
      </div>
    </div>
  );
};
