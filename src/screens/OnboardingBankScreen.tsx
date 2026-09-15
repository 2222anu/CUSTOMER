import React, { useState } from 'react';
import { Landmark, Check, Phone, CreditCard, ArrowRight, ArrowLeft, Loader2, CheckCircle2, Lock } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';

interface SaudiBankOption {
  name: string;
  code: string;
  prefix: string;
}

const SAUDI_BANKS: SaudiBankOption[] = [
  { name: 'Al Rajhi Bank', code: 'SA03', prefix: 'RJHI' },
  { name: 'Saudi National Bank (SNB)', code: 'SA58', prefix: 'NCBK' },
  { name: 'Riyad Bank', code: 'SA44', prefix: 'RIBL' },
  { name: 'Banque Saudi Fransi', code: 'SA12', prefix: 'BSFR' },
  { name: 'Alinma Bank', code: 'SA05', prefix: 'INMA' },
  { name: 'Arab National Bank (anb)', code: 'SA10', prefix: 'ARNB' },
  { name: 'Saudi Awwal Bank (SAB)', code: 'SA22', prefix: 'SABB' },
  { name: 'Bank AlJazira', code: 'SA60', prefix: 'BJAZ' },
];

export const OnboardingBankScreen: React.FC = () => {
  const { navigateTo, goBack, addBankAccount, user, t, language, isRtl } = useApp();

  const [step, setStep] = useState<'SELECT_BANK' | 'MATCH_METHOD' | 'OTP' | 'SUCCESS'>('SELECT_BANK');
  const [selectedBank, setSelectedBank] = useState<string>('Al Rajhi Bank');
  const [matchMethod, setMatchMethod] = useState<'mobile' | 'iban'>('mobile');
  const [customIban, setCustomIban] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('4821');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const selectedBankObj = SAUDI_BANKS.find((b) => b.name === selectedBank) || SAUDI_BANKS[0];

  const handleContinueToMatch = () => {
    setErrorMessage('');
    setStep('MATCH_METHOD');
  };

  const handleRequestOtp = () => {
    if (matchMethod === 'iban') {
      const cleanIban = customIban.replace(/\s+/g, '').toUpperCase();
      if (!cleanIban.startsWith('SA') || cleanIban.length < 15) {
        setErrorMessage(
          language === 'العربية'
            ? 'يرجى إدخال رقم آيبان سعودي صحيح يبدأ بـ SA'
            : 'Please enter a valid Saudi IBAN starting with SA.'
        );
        return;
      }
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
    }, 600);
  };

  const handleVerifyOtpAndLink = async () => {
    if (otpCode.length < 4) {
      setErrorMessage(
        language === 'العربية'
          ? 'يرجى إدخال رمز التحقق المكون من ٤ أرقام'
          : 'Please enter the 4-digit verification code.'
      );
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    const generatedIban =
      matchMethod === 'iban' && customIban
        ? customIban.toUpperCase()
        : `${selectedBankObj.code} •••• ${Math.floor(1000 + Math.random() * 9000)}`;

    const matchedValue = matchMethod === 'mobile' ? user.mobile : generatedIban;

    await addBankAccount(selectedBank, {
      iban: generatedIban,
      accountType: 'Primary Account',
      matchedWith: matchedValue,
    });

    setIsLoading(false);
    setStep('SUCCESS');
  };

  const handleFinishOnboarding = () => {
    try {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    } catch {
      // Ignore
    }
    navigateTo('HOME');
  };

  const getBankStepInfo = () => {
    switch (step) {
      case 'SELECT_BANK':
        return {
          stepNum: 1,
          label: language === 'العربية' ? 'الخطوة ١: اختيار البنك السعودي' : 'Step 1: Select Saudi Bank',
        };
      case 'MATCH_METHOD':
        return {
          stepNum: 2,
          label: language === 'العربية' ? 'الخطوة ٢: طريقة مطابقة الحساب' : 'Step 2: Account Match Method',
        };
      case 'OTP':
        return {
          stepNum: 3,
          label: language === 'العربية' ? 'الخطوة ٣: رمز التحقق البنكي' : 'Step 3: Bank SMS Authorization',
        };
      case 'SUCCESS':
        return {
          stepNum: 4,
          label: language === 'العربية' ? 'الخطوة ٤: تم ربط الحساب بنجاح' : 'Step 4: Bank Account Linked',
        };
    }
  };

  const { stepNum, label: stepLabel } = getBankStepInfo();

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
          title={language === 'العربية' ? 'ربط الحساب البنكي' : 'Link Bank Account'}
          showBack={true}
          onBack={goBack}
          showSettings={false}
        />

        {/* Dynamic 4-Segment Stepped Progress Indicator */}
        <div style={{ padding: '0 20px', marginTop: '10px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            {[1, 2, 3, 4].map((s) => {
              const isPassed = stepNum >= s;
              const isCurrent = stepNum === s;
              return (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '4px',
                    backgroundColor: isPassed ? '#7FE87F' : '#1E1E32',
                    boxShadow: isCurrent ? '0 0 8px rgba(127, 232, 127, 0.45)' : 'none',
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
              {stepNum} / 4
            </span>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          {/* STEP 1: SELECT BANK */}
          {step === 'SELECT_BANK' && (
            <div
              style={{
                backgroundColor: '#151524',
                borderRadius: '20px',
                border: '1px solid #2C2C44',
                padding: '24px 20px',
              }}
              className="fade-in"
            >
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px 0' }}>
                {language === 'العربية' ? 'اختر البنك السعودي' : 'Select Saudi Bank'}
              </h3>

              <div
                role="radiogroup"
                aria-label="Available Banks"
                style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto', paddingInlineEnd: '4px' }}
              >
                {SAUDI_BANKS.map((bank) => {
                  const isSelected = selectedBank === bank.name;
                  const displayBankName = t(bank.name, bank.name);
                  return (
                    <div
                      key={bank.name}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => setSelectedBank(bank.name)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedBank(bank.name);
                        }
                      }}
                      className="interactive-tap"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        backgroundColor: isSelected ? '#1E1E32' : '#151524',
                        border: isSelected ? '1.5px solid #7FE87F' : '1px solid #2C2C44',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: '#1E1E32',
                            color: isSelected ? '#7FE87F' : '#A2A2BA',
                            border: `1px solid ${isSelected ? 'rgba(127, 232, 127, 0.4)' : '#2C2C44'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '11px',
                          }}
                        >
                          <Landmark size={18} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
                            {displayBankName}
                          </div>
                          <div style={{ fontSize: '11px', color: '#6E6E85', marginTop: '1px', fontFamily: 'monospace' }} dir="ltr">
                            Sarie Rail • Code {bank.code}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isSelected ? 'none' : '1.5px solid #2C2C44',
                          backgroundColor: isSelected ? '#7FE87F' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '20px' }}>
                <PrimaryButton onClick={handleContinueToMatch}>
                  {language === 'العربية' ? 'المتابعة لمطابقة الحساب' : 'Continue to Account Match'}{' '}
                  <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                </PrimaryButton>
              </div>
            </div>
          )}

          {/* STEP 2: MATCH METHOD */}
          {step === 'MATCH_METHOD' && (
            <div
              style={{
                backgroundColor: '#151524',
                borderRadius: '20px',
                border: '1px solid #2C2C44',
                padding: '24px 20px',
              }}
              className="fade-in"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#1E1E32',
                  borderRadius: '12px',
                  border: '1px solid #2C2C44',
                  marginBottom: '16px',
                }}
              >
                <Landmark size={20} color="#7FE87F" />
                <div>
                  <div style={{ fontSize: '11px', color: '#6E6E85', textTransform: 'uppercase', fontWeight: 800 }}>
                    {language === 'العربية' ? 'البنك المحدد' : 'Selected Bank'}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                    {t(selectedBank, selectedBank)}
                  </div>
                </div>
              </div>

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
                {language === 'العربية' ? 'اختر طريقة المطابقة البنكية' : 'Choose Account Match Method'}
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {/* Match to Phone */}
                <div
                  tabIndex={0}
                  role="radio"
                  aria-checked={matchMethod === 'mobile'}
                  onClick={() => setMatchMethod('mobile')}
                  className="interactive-tap"
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    backgroundColor: matchMethod === 'mobile' ? '#1E1E32' : '#151524',
                    border: matchMethod === 'mobile' ? '1.5px solid #7FE87F' : '1px solid #2C2C44',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={18} color={matchMethod === 'mobile' ? '#7FE87F' : '#A2A2BA'} />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>
                        {language === 'العربية' ? 'مطابقة برقم الجوال المسجل' : 'Match Registered Mobile Number'}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#7FE87F', fontFamily: 'monospace', marginTop: '2px' }} dir="ltr">
                        {user.mobile}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: matchMethod === 'mobile' ? 'none' : '1.5px solid #2C2C44',
                      backgroundColor: matchMethod === 'mobile' ? '#7FE87F' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {matchMethod === 'mobile' && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>

                {/* Match to Direct IBAN */}
                <div
                  tabIndex={0}
                  role="radio"
                  aria-checked={matchMethod === 'iban'}
                  onClick={() => setMatchMethod('iban')}
                  className="interactive-tap"
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    backgroundColor: matchMethod === 'iban' ? '#1E1E32' : '#151524',
                    border: matchMethod === 'iban' ? '1.5px solid #7FE87F' : '1px solid #2C2C44',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CreditCard size={18} color={matchMethod === 'iban' ? '#7FE87F' : '#A2A2BA'} />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>
                        {language === 'العربية' ? 'إدخال رقم الآيبان مباشرة (IBAN)' : 'Direct Saudi IBAN Input'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px' }}>
                        {language === 'العربية' ? 'إدخال يدوي لرقم الحساب الدولي' : 'Manual 24-character IBAN format'}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: matchMethod === 'iban' ? 'none' : '1.5px solid #2C2C44',
                      backgroundColor: matchMethod === 'iban' ? '#7FE87F' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {matchMethod === 'iban' && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>
              </div>

              {matchMethod === 'iban' && (
                <div style={{ marginBottom: '16px' }} className="fade-in">
                  <label
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#A2A2BA',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '6px',
                      display: 'block',
                    }}
                  >
                    {language === 'العربية' ? 'رقم الآيبان (IBAN)' : 'Saudi IBAN'}
                  </label>
                  <input
                    type="text"
                    value={customIban}
                    onChange={(e) => setCustomIban(e.target.value.toUpperCase())}
                    placeholder="SA03 8000 0000 6080 1012 3456"
                    maxLength={29}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#1E1E32',
                      border: '1px solid #2C2C44',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                    dir="ltr"
                  />
                </div>
              )}

              {errorMessage && (
                <div style={{ fontSize: '12px', color: '#FF6B6B', fontWeight: 700, marginBottom: '14px' }}>
                  {errorMessage}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setStep('SELECT_BANK')}
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
                  <PrimaryButton onClick={handleRequestOtp} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        {language === 'العربية' ? 'طلب رمز التحقق البنكي' : 'Request Bank OTP'}{' '}
                        <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                      </>
                    )}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: OTP VERIFICATION */}
          {step === 'OTP' && (
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
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(127, 232, 127, 0.12)',
                  border: '1px solid rgba(127, 232, 127, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                }}
              >
                <Lock size={24} color="#7FE87F" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                {language === 'العربية' ? 'التحقق الأمني للبنك' : 'Bank SMS Security Code'}
              </h4>
              <p style={{ fontSize: '12.5px', color: '#A2A2BA', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                {language === 'العربية'
                  ? `أدخل رمز التحقق المرسل من ${t(selectedBank, selectedBank)} إلى جوالك`
                  : `Enter the 4-digit OTP sent by ${selectedBank} to your mobile`}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  style={{
                    width: '180px',
                    height: '52px',
                    borderRadius: '12px',
                    backgroundColor: '#1E1E32',
                    border: '1.5px solid #7FE87F',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    fontFamily: 'monospace',
                    letterSpacing: '8px',
                    outline: 'none',
                  }}
                  dir="ltr"
                />
              </div>

              {errorMessage && (
                <div style={{ fontSize: '12px', color: '#FF6B6B', fontWeight: 700, marginBottom: '14px', textAlign: 'center' }}>
                  {errorMessage}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setStep('MATCH_METHOD')}
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
                  <PrimaryButton onClick={handleVerifyOtpAndLink} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />{' '}
                        {language === 'العربية' ? 'جاري توثيق الحساب...' : 'Linking with Sarie Rail...'}
                      </>
                    ) : (
                      <>
                        {language === 'العربية' ? 'تأكيد وربط الحساب' : 'Authorize & Link Account'}{' '}
                        <Check size={18} />
                      </>
                    )}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'SUCCESS' && (
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

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px 0' }}>
                {language === 'العربية' ? 'تم ربط الحساب بنجاح' : 'Bank Account Linked'}
              </h3>

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
                  <span style={{ fontSize: '12px', color: '#A2A2BA' }}>{language === 'العربية' ? 'البنك' : 'Bank'}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF' }}>{t(selectedBank, selectedBank)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#A2A2BA' }}>{language === 'العربية' ? 'حالة الربط' : 'Status'}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#7FE87F' }}>
                    {language === 'العربية' ? 'نشط عبر سريع' : 'Active on Sarie'}
                  </span>
                </div>
              </div>

              <PrimaryButton onClick={handleFinishOnboarding}>
                {language === 'العربية' ? 'إتمام الإعداد والدخول للرئيسية' : 'Complete Setup & Go to Home'}{' '}
                <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};