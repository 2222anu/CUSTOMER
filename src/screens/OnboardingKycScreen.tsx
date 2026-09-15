import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, UserCheck, ArrowRight, ArrowLeft, Loader2, Calendar, Lock } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { SamaLogo } from '../components/SamaLogo';
import { useApp } from '../state/AppContext';

type KycStep = 'AUTH' | 'CERTIFIED';

export const OnboardingKycScreen: React.FC = () => {
  const { navigateTo, goBack, setIsKycVerified, kycData, isRtl, language } = useApp();

  const [step, setStep] = useState<KycStep>('AUTH');
  const [nationalId, setNationalId] = useState(kycData?.nationalId || '1098472910');
  const [dob, setDob] = useState(kycData?.dob || '1992-05-14');
  const [hasRequestedNafath, setHasRequestedNafath] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [challengeCode, setChallengeCode] = useState<number>(48);
  const [countdown, setCountdown] = useState<number>(60);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setChallengeCode(Math.floor(10 + Math.random() * 89));
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (hasRequestedNafath && countdown > 0 && step === 'AUTH') {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [hasRequestedNafath, countdown, step]);

  const handleRequestNafath = (e?: React.FormEvent) => {
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
    setChallengeCode(Math.floor(10 + Math.random() * 89));
    setCountdown(60);
    setHasRequestedNafath(true);
  };

  const handleApproveInNafath = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsKycVerified(true, {
        nationalId,
        dob,
        verifiedAt: new Date().toLocaleDateString('en-GB'),
      });
      setIsVerifying(false);
      setStep('CERTIFIED');
    }, 1200);
  };

  const handleContinueToBank = () => {
    navigateTo('ONBOARDING_BANK');
  };

  const stepNum = step === 'AUTH' ? 1 : 2;
  const stepLabel =
    step === 'AUTH'
      ? language === 'العربية' ? 'الخطوة ١: مصادقة نفاذ' : 'Step 1: Nafath Authentication'
      : language === 'العربية' ? 'الخطوة ٢: اكتمال التوثيق' : 'Step 2: e-KYC Certified';

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
          title={language === 'العربية' ? 'التوثيق الوطني (نفاذ)' : 'Identity Verification'}
          showBack={true}
          onBack={goBack}
          showSettings={false}
        />

        {/* Streamlined 2-Segment Stepped Progress Indicator */}
        <div style={{ padding: '0 20px', marginTop: '10px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            {[1, 2].map((s) => {
              const isPassed = stepNum >= s;
              const isCurrent = stepNum === s;
              return (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: '5px',
                    borderRadius: '4px',
                    backgroundColor: isPassed ? '#7FE87F' : '#1E1E32',
                    boxShadow: isCurrent ? '0 0 10px rgba(127, 232, 127, 0.45)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                />
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#7FE87F',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#7FE87F',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {stepLabel}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#A2A2BA', fontWeight: 800 }}>
              {stepNum} / 2
            </span>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          {/* STEP 1: AUTHENTICATE (ID INPUT & NAFATH CHALLENGE) */}
          {step === 'AUTH' && (
            <div
              style={{
                backgroundColor: '#151524',
                borderRadius: '20px',
                border: '1px solid #2C2C44',
                padding: '24px 20px',
              }}
              className="fade-in"
            >
              {!hasRequestedNafath ? (
                <form onSubmit={handleRequestNafath} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(127, 232, 127, 0.12)',
                        border: '1px solid rgba(127, 232, 127, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ShieldCheck size={22} color="#7FE87F" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                        {language === 'العربية' ? 'الهوية الوطنية / الإقامة' : 'National ID & Iqama'}
                      </h3>
                      <span style={{ fontSize: '11.5px', color: '#7FE87F', fontWeight: 700 }}>
                        SAMA Tier-1 Digital Identity
                      </span>
                    </div>
                  </div>

                  {/* National ID Input */}
                  <div>
                    <label
                      htmlFor="national-id-input"
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
                        id="national-id-input"
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
                      htmlFor="dob-input"
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
                        id="dob-input"
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

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#1E1E32',
                      border: '1px solid #2C2C44',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      marginTop: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={12} color="#7FE87F" />
                      <span style={{ fontSize: '11.5px', color: '#A2A2BA', fontWeight: 600 }}>
                        NIC & SAMA Direct Rail
                      </span>
                    </div>
                    <SamaLogo height={15} themeMode="green" />
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <PrimaryButton type="submit" disabled={nationalId.length < 10}>
                      {language === 'العربية' ? 'طلب مصادقة نفاذ' : 'Request Nafath Authentication'}{' '}
                      <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                    </PrimaryButton>
                  </div>
                </form>
              ) : isVerifying ? (
                <div style={{ textAlign: 'center', padding: '32px 10px' }} className="fade-in">
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
                    {language === 'العربية' ? 'جاري التحقق من مصادقة نفاذ...' : 'Verifying with Nafath...'}
                  </h4>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }} className="fade-in">
                  <div
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(127, 232, 127, 0.12)',
                      border: '2px solid #7FE87F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                      boxShadow: '0 0 24px rgba(127, 232, 127, 0.25)',
                    }}
                  >
                    <span style={{ fontSize: '40px', fontWeight: 900, color: '#7FE87F', letterSpacing: '1px', fontFamily: 'monospace' }}>
                      {challengeCode}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                    {language === 'العربية' ? 'اختر الرقم في تطبيق نفاذ' : 'Select Code in Nafath App'}
                  </h4>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', backgroundColor: '#1E1E32', border: '1px solid #2C2C44', fontSize: '11.5px', color: '#A2A2BA', fontWeight: 700, marginBottom: '20px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: countdown > 10 ? '#7FE87F' : '#FF4757' }} />
                    {language === 'العربية' ? `ينتهي خلال ${countdown} ثانية` : `Expires in ${countdown}s`}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setHasRequestedNafath(false)}
                      aria-label="Back"
                      className="interactive-tap"
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: '#1E1E32',
                        border: '1px solid #2C2C44',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <ArrowLeft size={20} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                    </button>
                    <div style={{ flex: 1 }}>
                      <PrimaryButton onClick={handleApproveInNafath}>
                        {language === 'العربية' ? 'تمت الموافقة في نفاذ' : 'I Approved in Nafath'}{' '}
                        <CheckCircle2 size={18} />
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: CERTIFIED CONFIRMATION */}
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
                {language === 'العربية' ? 'تم توثيق الهوية عبر نفاذ بنجاح' : 'Nafath e-KYC Certified'}
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
                  <span style={{ fontSize: '12px', color: '#A2A2BA' }}>{language === 'العربية' ? 'مستوى التوثيق' : 'KYC Tier'}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#7FE87F' }}>SAMA Tier-1 Certified</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#A2A2BA' }}>{language === 'العربية' ? 'الحد اليومي' : 'Daily Limit'}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#7FE87F' }}>SAR 50,000</span>
                </div>
              </div>

              <PrimaryButton onClick={handleContinueToBank}>
                {language === 'العربية' ? 'المتابعة لربط الحساب البنكي' : 'Continue to Link Bank Account'}{' '}
                <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};