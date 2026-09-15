import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, UserCheck, ArrowRight, Loader2, Calendar } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

type KycStep = 'FORM' | 'VERIFYING' | 'CERTIFIED';

export const OnboardingKycScreen: React.FC = () => {
  const { navigateTo, goBack, setIsKycVerified, kycData, isRtl, language } = useApp();

  const [step, setStep] = useState<KycStep>('FORM');
  const [nationalId, setNationalId] = useState(kycData?.nationalId || '1098472910');
  const [dob, setDob] = useState(kycData?.dob || '1992-05-14');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // If user already verified, navigate directly
    if (localStorage.getItem('isKycVerified') === 'true') {
      navigateTo('ONBOARDING_BANK');
    }
  }, [navigateTo]);

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
    }, 800);
  };

  const handleContinueToBank = () => {
    navigateTo('ONBOARDING_BANK');
  };

  return (
    <div
      className="fade-in"
      style={{
        backgroundColor: '#0B0B14',
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

        <div style={{ padding: '0 20px', marginTop: '14px' }}>
          {/* STEP 1: FORM */}
          {step === 'FORM' && (
            <div
              style={{
                backgroundColor: '#151524',
                borderRadius: '20px',
                border: '1px solid #2C2C44',
                padding: '24px 20px',
                boxShadow: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(127, 232, 127, 0.12)',
                    border: '1px solid rgba(127, 232, 127, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShieldCheck size={22} color="#7FE87F" />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                    {language === 'العربية' ? 'توثيق الهوية الرقمية' : 'Digital Identity Verification'}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: '#7FE87F', fontWeight: 700 }}>
                    {language === 'العربية' ? 'توثيق فوري وآمن' : 'Instant & Secure Verification'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* National ID Input */}
                <div>
                  <label
                    htmlFor="onboarding-national-id"
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
                    {language === 'العربية' ? 'رقم الهوية الوطنية / الإقامة (١٠ أرقام)' : 'National ID / Iqama (10 Digits)'}
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#1E1E32',
                      border: '1px solid #2C2C44',
                      borderRadius: '14px',
                      padding: '13px 16px',
                    }}
                  >
                    <UserCheck size={18} color="#7FE87F" style={{ marginInlineEnd: '12px', flexShrink: 0 }} />
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
                      color: '#A2A2BA',
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
                      backgroundColor: '#1E1E32',
                      border: '1px solid #2C2C44',
                      borderRadius: '14px',
                      padding: '13px 16px',
                    }}
                  >
                    <Calendar size={18} color="#7FE87F" style={{ marginInlineEnd: '12px', flexShrink: 0 }} />
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

                <div style={{ marginTop: '8px' }}>
                  <PrimaryButton type="submit" disabled={nationalId.length < 10}>
                    {language === 'العربية' ? 'توثيق الهوية ومتابعة' : 'Verify & Continue'}{' '}
                    <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                  </PrimaryButton>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: VERIFYING */}
          {step === 'VERIFYING' && (
            <div
              style={{
                backgroundColor: '#151524',
                borderRadius: '20px',
                border: '1px solid #2C2C44',
                padding: '40px 20px',
                textAlign: 'center',
              }}
              className="fade-in"
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(127, 232, 127, 0.12)',
                  border: '1.5px solid #7FE87F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <Loader2 size={32} color="#7FE87F" className="animate-spin" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                {language === 'العربية' ? 'جاري التحقق من الهوية...' : 'Verifying Identity...'}
              </h4>
            </div>
          )}

          {/* STEP 3: CERTIFIED CONFIRMATION */}
          {step === 'CERTIFIED' && (
            <div
              style={{
                backgroundColor: '#151524',
                borderRadius: '20px',
                border: '1px solid #2C2C44',
                padding: '24px 20px',
                textAlign: 'center',
              }}
              className="fade-in"
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(127, 232, 127, 0.15)',
                  border: '1.5px solid #7FE87F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <CheckCircle2 size={36} color="#7FE87F" />
              </div>

              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px 0' }}>
                {language === 'العربية' ? 'تم توثيق الهوية بنجاح' : 'Identity Verified'}
              </h4>

              <div
                style={{
                  backgroundColor: '#1E1E32',
                  borderRadius: '14px',
                  border: '1px solid #2C2C44',
                  padding: '14px',
                  marginBottom: '20px',
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#A2A2BA' }}>{language === 'العربية' ? 'رقم الهوية' : 'National ID'}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace' }}>
                    {nationalId}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#A2A2BA' }}>{language === 'العربية' ? 'حالة التوثيق' : 'Status'}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#7FE87F' }}>
                    {language === 'العربية' ? 'موثق' : 'Verified'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#A2A2BA' }}>{language === 'العربية' ? 'الحد اليومي' : 'Daily Limit'}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#7FE87F' }}>SAR 50,000</span>
                </div>
              </div>

              <PrimaryButton onClick={handleContinueToBank}>
                {language === 'العربية' ? 'متابعة لربط الحساب البنكي' : 'Continue to Link Bank'}{' '}
                <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};