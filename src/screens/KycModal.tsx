import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, UserCheck, ArrowRight, ArrowLeft, Loader2, Calendar } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { SamaLogo } from '../components/SamaLogo';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';

type KycStep = 'NATIONAL_ID' | 'NAFATH_CHALLENGE' | 'BIOMETRIC_POLLING' | 'VERIFIED_SUCCESS';

export const KycModal: React.FC = () => {
  const { isKycModalOpen, setIsKycModalOpen, setIsKycVerified, isKycVerified, kycData, t, isRtl, language } = useApp();

  const [step, setStep] = useState<KycStep>('NATIONAL_ID');
  const [nationalId, setNationalId] = useState(kycData?.nationalId || '1098472910');
  const [dob, setDob] = useState(kycData?.dob || '1992-05-14');
  const [challengeCode, setChallengeCode] = useState<number>(48);
  const [countdown, setCountdown] = useState<number>(60);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isKycModalOpen) {
      if (isKycVerified) {
        setStep('VERIFIED_SUCCESS');
      } else {
        setStep('NATIONAL_ID');
        setErrorMsg('');
        setChallengeCode(Math.floor(10 + Math.random() * 89));
        setCountdown(60);
      }
    }
  }, [isKycModalOpen, isKycVerified]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'NAFATH_CHALLENGE' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, countdown]);

  if (!isKycModalOpen) return null;

  const handleClose = () => {
    if (step === 'BIOMETRIC_POLLING') return;
    setIsKycModalOpen(false);
  };

  const handleRequestNafath = (e: React.FormEvent) => {
    e.preventDefault();
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
    setStep('NAFATH_CHALLENGE');
  };

  const handleSimulateApproveInNafath = () => {
    setStep('BIOMETRIC_POLLING');
    setTimeout(() => {
      setIsKycVerified(true, {
        nationalId,
        dob,
        verifiedAt: new Date().toLocaleDateString('en-GB'),
      });
      setStep('VERIFIED_SUCCESS');
    }, 1800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#151524',
          border: '1px solid #2C2C44',
          borderRadius: '24px',
          padding: '26px 22px',
          boxSizing: 'border-box',
          boxShadow: 'none',
          color: '#FFFFFF',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'rgba(127, 232, 127, 0.12)',
                border: '1px solid rgba(127, 232, 127, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={20} color="#7FE87F" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                {language === 'العربية' ? 'توثيق نفاذ الوطني (e-KYC)' : 'Nafath National e-KYC'}
              </h3>
              <span style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 700 }}>
                {language === 'العربية' ? 'معتمد من البنك المركزي السعودي (ساما)' : 'SAMA Tier-1 Digital Identity'}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label={t('btn.close', 'Close')}
            style={{
              background: '#1E1E32',
              border: '1px solid #2C2C44',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#A2A2BA',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* STEP 1: NATIONAL ID & DOB */}
        {step === 'NATIONAL_ID' && (
          <form onSubmit={handleRequestNafath} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '13px', color: '#A2A2BA', margin: 0, lineHeight: '1.4' }}>
              {language === 'العربية'
                ? 'أدخل رقم الهوية وتاريخ الميلاد لبدء التحقق البيومتري المباشر عبر تطبيق نفاذ.'
                : 'Enter your Saudi National ID / Iqama and Date of Birth to initiate Nafath biometric authentication.'}
            </p>

            {/* National ID Input */}
            <div>
              <label
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
                {t('sec.national_id', 'National ID / Iqama Number (10 Digits)')}
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
              <div style={{ fontSize: '12px', color: '#FF6B6B', fontWeight: 700 }}>
                {errorMsg}
              </div>
            )}

            {/* SAMA Trust Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(127, 232, 127, 0.06)',
                border: '1px solid rgba(127, 232, 127, 0.2)',
                borderRadius: '12px',
                padding: '10px 14px',
              }}
            >
              <span style={{ fontSize: '11px', color: '#A2A2BA', fontWeight: 600 }}>
                {language === 'العربية' ? 'ربط آمن ومشفر عبر بوابة النفاذ الوطني' : 'Encrypted Link via National Information Center'}
              </span>
              <SamaLogo height={16} themeMode="green" />
            </div>

            <PrimaryButton type="submit" disabled={nationalId.length < 10}>
              {language === 'العربية' ? 'طلب مصادقة نفاذ' : 'Request Nafath Authentication'}{' '}
              <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
            </PrimaryButton>
          </form>
        )}

        {/* STEP 2: NAFATH 2-DIGIT CHALLENGE */}
        {step === 'NAFATH_CHALLENGE' && (
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(127, 232, 127, 0.12)',
                  border: '2.5px solid #7FE87F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  boxShadow: '0 0 20px rgba(127, 232, 127, 0.25)',
                }}
              >
                <span style={{ fontSize: '42px', fontWeight: 900, color: '#7FE87F', letterSpacing: '2px', fontFamily: 'monospace' }}>
                  {challengeCode}
                </span>
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                {language === 'العربية' ? 'اختر الرقم في تطبيق نفاذ' : 'Select This Code in Nafath App'}
              </h4>
              <p style={{ fontSize: '12.5px', color: '#A2A2BA', margin: 0, lineHeight: '1.4' }}>
                {language === 'العربية'
                  ? 'افتح تطبيق نفاذ على هاتفك، واضغط على نفس الرقم الظاهر أعلاه لإتمام بصمة الوجه.'
                  : 'Open your official Nafath app on your mobile, tap the number above, and complete facial recognition.'}
              </p>
            </div>

            {/* Nafath App Step Guide */}
            <div
              style={{
                backgroundColor: '#1E1E32',
                borderRadius: '14px',
                border: '1px solid #2C2C44',
                padding: '14px',
                marginBottom: '18px',
                textAlign: isRtl ? 'right' : 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#7FE87F', color: '#0B0B14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                  1
                </div>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>
                  {language === 'العربية' ? 'افتح تطبيق نفاذ (Nafath App)' : 'Open the official Nafath App'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#7FE87F', color: '#0B0B14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                  2
                </div>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>
                  {language === 'العربية' ? `اختر الرقم (${challengeCode}) من بين الخيارات` : `Select challenge number (${challengeCode})`}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#7FE87F', color: '#0B0B14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                  3
                </div>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>
                  {language === 'العربية' ? 'أكمل التحقق من ملامح الوجه' : 'Complete biometric facial capture'}
                </span>
              </div>
            </div>

            {/* Countdown */}
            <div style={{ fontSize: '12px', color: '#6E6E85', fontWeight: 700, marginBottom: '16px' }}>
              {language === 'العربية'
                ? `صالح لمدة ${countdown} ثانية`
                : `Challenge expires in ${countdown} seconds`}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <SecondaryButton onClick={() => setStep('NATIONAL_ID')}>
                <ArrowLeft size={16} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
              </SecondaryButton>
              <div style={{ flex: 1 }}>
                <PrimaryButton onClick={handleSimulateApproveInNafath}>
                  {language === 'العربية' ? 'تمت الموافقة في نفاذ' : 'I Approved in Nafath'}{' '}
                  <CheckCircle2 size={18} />
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BIOMETRIC POLLING */}
        {step === 'BIOMETRIC_POLLING' && (
          <div className="fade-in" style={{ textAlign: 'center', padding: '30px 10px' }}>
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
              <Loader2 size={32} color="#7FE87F" className="animate-spin" />
            </div>

            <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
              {language === 'العربية' ? 'جاري التحقق من مصادقة نفاذ...' : 'Verifying with Nafath Gateway...'}
            </h4>

            <p style={{ fontSize: '13px', color: '#A2A2BA', margin: 0 }}>
              {language === 'العربية'
                ? 'جاري تأكيد التوثيق البيومتري من مركز المعلومات الوطني والبنك المركزي (ساما).'
                : 'Confirming digital signature with National Information Center & SAMA.'}
            </p>
          </div>
        )}

        {/* STEP 4: VERIFIED SUCCESS */}
        {step === 'VERIFIED_SUCCESS' && (
          <div className="fade-in" style={{ textAlign: 'center', padding: '10px 4px 4px 4px' }}>
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

            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
              {language === 'العربية' ? 'تم توثيق الهوية عبر نفاذ بنجاح' : 'Nafath e-KYC Certified'}
            </h4>

            <p style={{ fontSize: '13px', color: '#A2A2BA', margin: '0 0 18px 0', lineHeight: '1.4' }}>
              {language === 'العربية'
                ? 'تم توثيق حسابك بمستوى الاعتماد الأول (SAMA Tier-1). تم رفع الحد اليومي للتحويل إلى ٥٠,٠٠٠ ر.س.'
                : 'Your identity is fully verified with SAMA Tier-1 certification. Daily transfer limit elevated to SAR 50,000.'}
            </p>

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
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#7FE87F' }}>SAR 50,000 / Day</span>
              </div>
            </div>

            <PrimaryButton onClick={handleClose}>
              {language === 'العربية' ? 'إغلاق ومتابعة' : 'Done & Continue'}
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};
