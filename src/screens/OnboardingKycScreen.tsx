import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, UserCheck, ArrowRight, Loader2, Calendar } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';

type KycStep = 'FORM' | 'VERIFYING' | 'CERTIFIED';

export const OnboardingKycScreen: React.FC = () => {
  const { navigateTo, goBack, setIsKycVerified, kycData, isRtl, language } = useApp();

  const [step, setStep] = useState<KycStep>('FORM');
  const [nationalId, setNationalId] = useState(kycData?.nationalId || '1098472910');
  const [dob, setDob] = useState(kycData?.dob || '1992-05-14');
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (nationalId.replace(/\D/g, '').length < 10) {
      setErrorMsg(
        language === 'العربية'
          ? 'يرجى إدخال رقم هوية وطنية أو إقامة صحيح من ١٠ أرقام.'
          : 'Please enter a valid 10-digit National ID or Iqama Number.'
      );
      return;
    }

    setErrorMsg('');
    setStep('VERIFYING');
    setTimeout(() => {
      setIsKycVerified(true, {
        nationalId,
        dob,
        verifiedAt: new Date().toLocaleDateString('en-GB'),
      });
      setStep('CERTIFIED');
    }, 750);
  };

  const handleContinueToBank = () => {
    navigateTo('ONBOARDING_BANK');
  };

  return (
    <div
      className="fade-in"
      style={{
        backgroundColor: '#080c14',
        backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(52, 211, 153, 0.12) 0%, rgba(7, 13, 10, 0.98) 60%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '32px',
        color: '#FFFFFF',
      }}
    >
      <div>
        <AppHeader
          title={language === 'العربية' ? 'توثيق الهوية' : 'Identity Verification'}
          showBack={true}
          onBack={goBack}
          showSettings={false}
        />

        <div style={{ padding: '0 20px', marginTop: '14px', display: 'flex', justifyContent: 'center' }}>
          <div
            className="main-card fade-in"
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#111726',
              borderRadius: '28px',
              padding: '26px 22px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)',
              boxSizing: 'border-box',
            }}
          >
            {/* Header Identity Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(52, 211, 153, 0.12)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={24} color="#34d399" />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                  {language === 'العربية' ? 'توثيق الهوية الوطنية الرقمية' : 'Digital Identity Verification'}
                </h3>
                <span style={{ fontSize: '11.5px', color: '#34d399', fontWeight: 700 }}>
                  {language === 'العربية' ? 'توثيق فوري وآمن عبر السجل الوطني' : 'Instant National Verification'}
                </span>
              </div>
            </div>

            {/* STEP 1: FORM */}
            {step === 'FORM' && (
              <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* National ID Input */}
                <div>
                  <label
                    htmlFor="onboarding-national-id"
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#9ca3af',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    {language === 'العربية' ? 'رقم الهوية الوطنية / الإقامة (١٠ أرقام)' : 'National ID / Iqama (10 Digits)'}
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#182236',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '14px 16px',
                    }}
                  >
                    <UserCheck size={18} color="#34d399" style={{ marginInlineEnd: '12px', flexShrink: 0 }} />
                    <input
                      id="onboarding-national-id"
                      type="text"
                      maxLength={10}
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="1098472910"
                      required
                      style={{
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        width: '100%',
                        fontVariantNumeric: 'tabular-nums',
                        direction: 'ltr',
                        textAlign: isRtl ? 'right' : 'left',
                      }}
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="onboarding-dob"
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#9ca3af',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    {language === 'العربية' ? 'تاريخ الميلاد' : 'Date of Birth'}
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#182236',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '14px 16px',
                    }}
                  >
                    <Calendar size={18} color="#34d399" style={{ marginInlineEnd: '12px', flexShrink: 0 }} />
                    <input
                      id="onboarding-dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      style={{
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        width: '100%',
                        colorScheme: 'dark',
                      }}
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div style={{ fontSize: '12px', color: '#FF4757', fontWeight: 700 }}>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={nationalId.length < 10}
                  className="action-btn interactive-tap"
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    padding: '15px',
                    backgroundColor: nationalId.length >= 10 ? '#34d399' : '#1f293d',
                    color: nationalId.length >= 10 ? '#0b0f19' : '#6b7280',
                    border: 'none',
                    borderRadius: '16px',
                    fontSize: '14.5px',
                    fontWeight: 800,
                    cursor: nationalId.length >= 10 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: nationalId.length >= 10 ? '0 10px 25px -5px rgba(52, 211, 153, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{language === 'العربية' ? 'توثيق الهوية ومتابعة' : 'Verify & Continue'}</span>
                  <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                </button>
              </form>
            )}

            {/* STEP 2: VERIFYING */}
            {step === 'VERIFYING' && (
              <div style={{ padding: '36px 10px', textAlign: 'center' }} className="fade-in">
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(52, 211, 153, 0.12)',
                    border: '1.5px solid #34d399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                  }}
                >
                  <Loader2 size={32} color="#34d399" className="animate-spin" />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                  {language === 'العربية' ? 'جاري التحقق من الهوية الرقمية...' : 'Verifying Digital Identity...'}
                </h4>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                  {language === 'العربية' ? 'المطابقة المباشرة مع السجل الوطني الموحد' : 'Matching records with national registry'}
                </p>
              </div>
            )}

            {/* STEP 3: CERTIFIED CONFIRMATION */}
            {step === 'CERTIFIED' && (
              <div className="fade-in" style={{ textAlign: 'center', padding: '10px 4px 4px 4px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(52, 211, 153, 0.15)',
                    border: '1.5px solid #34d399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                  }}
                >
                  <CheckCircle2 size={36} color="#34d399" />
                </div>

                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px 0' }}>
                  {language === 'العربية' ? 'تم توثيق الهوية بنجاح' : 'Identity Verified'}
                </h4>

                <div
                  style={{
                    backgroundColor: '#182236',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '16px',
                    marginBottom: '20px',
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{language === 'العربية' ? 'رقم الهوية' : 'National ID'}</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace' }}>
                      {nationalId}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{language === 'العربية' ? 'حالة التوثيق' : 'Status'}</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#34d399' }}>
                      {language === 'العربية' ? 'موثق' : 'Verified'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{language === 'العربية' ? 'الحد اليومي' : 'Daily Limit'}</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#34d399' }}>SAR 50,000</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleContinueToBank}
                  className="action-btn interactive-tap"
                  style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: '#34d399',
                    color: '#0b0f19',
                    border: 'none',
                    borderRadius: '16px',
                    fontSize: '14.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 10px 25px -5px rgba(52, 211, 153, 0.3)',
                  }}
                >
                  <span>{language === 'العربية' ? 'متابعة لربط الحساب البنكي' : 'Continue to Link Bank'}</span>
                  <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
