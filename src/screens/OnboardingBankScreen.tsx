import React, { useState, useRef } from 'react';
import { ArrowRight, Loader2, CheckCircle2, Landmark, Smartphone, CreditCard } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { SamaLogo } from '../components/SamaLogo';
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

type BankStep = 'SELECT_AND_MATCH' | 'AUTHORIZE_AND_CONNECT';

export const OnboardingBankScreen: React.FC = () => {
  const { navigateTo, goBack, addBankAccount, user, t, language, isRtl } = useApp();

  const [step, setStep] = useState<BankStep>('SELECT_AND_MATCH');
  const [selectedBank, setSelectedBank] = useState<string>('Al Rajhi Bank');
  const [matchMethod, setMatchMethod] = useState<'mobile' | 'iban'>('mobile');
  const [customIban, setCustomIban] = useState<string>('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['4', '8', '2', '1']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const selectedBankObj = SAUDI_BANKS.find((b) => b.name === selectedBank) || SAUDI_BANKS[0];

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
      setIsAuthorized(false);
      setStep('AUTHORIZE_AND_CONNECT');
    }, 400);
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = cleanValue;
    setOtpDigits(newDigits);

    if (cleanValue && index < 3) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtpAndLink = async () => {
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 4) {
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
    setIsAuthorized(true);
  };

  const handleFinishOnboarding = () => {
    try {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    } catch {
      // Ignore
    }
    navigateTo('HOME');
  };

  return (
    <div
      className="fade-in"
      style={{
        backgroundColor: '#080c14',
        backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(127, 232, 127, 0.08) 0%, rgba(7, 13, 10, 0.98) 60%)',
        minHeight: '100%',
        paddingBottom: '40px',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppHeader
        title={language === 'العربية' ? 'ربط الحساب البنكي' : 'Link Bank Account'}
        showBack={true}
        onBack={goBack}
        showSettings={false}
      />

      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'center', width: '100%', boxSizing: 'border-box' }}>
        <div
          className="main-card fade-in"
          style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#111726',
            borderRadius: '24px',
            padding: '24px 20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            boxSizing: 'border-box',
          }}
        >
          {/* Header Bank Identity Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: 'rgba(127, 232, 127, 0.14)',
                border: '1px solid rgba(127, 232, 127, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Landmark size={24} color="#7FE87F" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                {language === 'العربية' ? 'اختر البنك' : 'Select Bank'}
              </h3>
              <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500, marginTop: '2px', display: 'block' }}>
                {language === 'العربية' ? 'ربط فوري عبر نظام سريع' : 'Instant linking with Sarie'}
              </span>
            </div>
          </div>

          {/* STEP 1: SELECT BANK & MATCH METHOD */}
          {step === 'SELECT_AND_MATCH' && (
            <div id="selectionView" className="fade-in">
              <div
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '10px',
                  display: 'block',
                }}
              >
                {language === 'العربية' ? 'البنوك المتاحة' : 'Available Banks'}
              </div>

              <div
                className="bank-list"
                role="radiogroup"
                aria-label="Available Banks"
                style={{
                  maxHeight: '260px',
                  overflowY: 'auto',
                  paddingInlineEnd: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '20px',
                }}
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
                        if (e.key === 'Enter' || e.key === ' ') setSelectedBank(bank.name);
                      }}
                      className={`bank-item interactive-tap ${isSelected ? 'selected' : ''}`}
                      style={{
                        backgroundColor: isSelected ? 'var(--brand-green-tint)' : 'var(--color-surface-elevated)',
                        border: isSelected ? '1.5px solid var(--brand-green)' : '1px solid var(--color-border)',
                        borderRadius: '16px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div className="bank-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          className="bank-icon"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--brand-green-tint)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Landmark size={20} color="var(--brand-green)" />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>{displayBankName}</div>
                          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginTop: '2px' }}>
                            Sarie • {bank.code}
                          </div>
                        </div>
                      </div>
                      <div className="radio-dot" />
                    </div>
                  );
                })}
              </div>

              {/* Account Match Method */}
              <div className="match-section" style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '10px',
                  }}
                >
                  {language === 'العربية' ? 'طريقة الربط' : 'Link With'}
                </div>
                <div className="match-tabs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div
                    className={`match-tab interactive-tap ${matchMethod === 'mobile' ? 'active' : ''}`}
                    onClick={() => setMatchMethod('mobile')}
                    style={{
                      backgroundColor: matchMethod === 'mobile' ? 'var(--brand-green-tint)' : 'var(--color-surface-elevated)',
                      border: matchMethod === 'mobile' ? '1px solid var(--brand-green)' : '1px solid var(--color-border)',
                      color: matchMethod === 'mobile' ? 'var(--brand-green)' : '#9ca3af',
                      borderRadius: '14px',
                      padding: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <Smartphone size={16} color={matchMethod === 'mobile' ? 'var(--brand-green)' : '#9ca3af'} />
                    <span>{language === 'العربية' ? 'رقم الجوال' : 'Mobile Number'}</span>
                  </div>
                  <div
                    className={`match-tab interactive-tap ${matchMethod === 'iban' ? 'active' : ''}`}
                    onClick={() => setMatchMethod('iban')}
                    style={{
                      backgroundColor: matchMethod === 'iban' ? 'var(--brand-green-tint)' : 'var(--color-surface-elevated)',
                      border: matchMethod === 'iban' ? '1px solid var(--brand-green)' : '1px solid var(--color-border)',
                      color: matchMethod === 'iban' ? 'var(--brand-green)' : '#9ca3af',
                      borderRadius: '14px',
                      padding: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <CreditCard size={16} color={matchMethod === 'iban' ? 'var(--brand-green)' : '#9ca3af'} />
                    <span>{language === 'العربية' ? 'الآيبان (IBAN)' : 'IBAN'}</span>
                  </div>
                </div>

                {matchMethod === 'iban' && (
                  <div style={{ marginTop: '12px' }} className="fade-in">
                    <input
                      type="text"
                      value={customIban}
                      onChange={(e) => setCustomIban(e.target.value.toUpperCase())}
                      placeholder="SA03 8000 0000 6080 1012 3456"
                      maxLength={29}
                      style={{
                        width: '100%',
                        padding: '13px 16px',
                        borderRadius: '14px',
                        backgroundColor: 'var(--color-surface-elevated)',
                        border: '1px solid var(--color-border)',
                        color: '#FFFFFF',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                      dir="ltr"
                    />
                  </div>
                )}
              </div>

              {errorMessage && (
                <div style={{ fontSize: '12px', color: '#FF4757', fontWeight: 700, marginBottom: '14px' }}>
                  {errorMessage}
                </div>
              )}

              <button
                className="action-btn interactive-tap"
                onClick={handleRequestOtp}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#7FE87F',
                  color: '#080c14',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '14.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 25px -5px rgba(127, 232, 127, 0.3)',
                }}
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>{language === 'العربية' ? 'طلب رمز التحقق البنكي' : 'Request Bank OTP'}</span>
                    <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 2: OTP ENTRY VIEW */}
          {step === 'AUTHORIZE_AND_CONNECT' && (
            <div id="otpView" className="otp-container" style={{ display: 'block', textAlign: 'center' }}>
              {!isAuthorized ? (
                <>
                  <div
                    style={{
                      fontSize: '16.5px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {language === 'العربية' ? 'إدخال رمز التحقق البنكي' : 'Enter Bank OTP'}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#9ca3af', marginBottom: '22px', lineHeight: '1.5' }}>
                    {language === 'العربية'
                      ? `يرجى إدخال رمز التحقق المرسل إلى رقم جوالك المسجل والمرتبط بـ ${t(selectedBank, selectedBank)}.`
                      : `Please enter the verification code sent to your registered mobile number linked with ${selectedBank}.`}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '22px', direction: 'ltr' }}>
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={otpInputRefs[idx]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="otp-box"
                        autoFocus={idx === 0}
                        style={{
                          width: '48px',
                          height: '52px',
                          backgroundColor: '#182236',
                          border: digit ? '1.5px solid #7FE87F' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '14px',
                          fontSize: '20px',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          textAlign: 'center',
                          outline: 'none',
                        }}
                      />
                    ))}
                  </div>

                  {errorMessage && (
                    <div style={{ fontSize: '12px', color: '#FF4757', fontWeight: 700, marginBottom: '14px' }}>
                      {errorMessage}
                    </div>
                  )}

                  <button
                    className="action-btn interactive-tap"
                    onClick={handleVerifyOtpAndLink}
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: '#7FE87F',
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
                      boxShadow: '0 10px 25px -5px rgba(127, 232, 127, 0.3)',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />{' '}
                        <span>{language === 'العربية' ? 'جاري الربط...' : 'Authorizing...'}</span>
                      </>
                    ) : (
                      <span>{language === 'العربية' ? 'تأكيد وربط الحساب' : 'Authorize & Link Account'}</span>
                    )}
                  </button>

                  <button
                    onClick={() => setStep('SELECT_AND_MATCH')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '16px',
                    }}
                  >
                    {language === 'العربية' ? '← العودة لاختيار البنك' : '← Back to bank selection'}
                  </button>
                </>
              ) : (
                <div className="fade-in" style={{ padding: '8px 0', textAlign: 'center' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(127, 232, 127, 0.16)',
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
                      backgroundColor: '#182236',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '16px',
                      marginBottom: '20px',
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>{language === 'العربية' ? 'البنك' : 'Bank'}</span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>{t(selectedBank, selectedBank)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>{language === 'العربية' ? 'حالة الربط' : 'Status'}</span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#7FE87F' }}>
                        {language === 'العربية' ? 'نشط عبر سريع' : 'Active on Sarie'}
                      </span>
                    </div>
                  </div>

                  <button
                    className="action-btn interactive-tap"
                    onClick={handleFinishOnboarding}
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: '#7FE87F',
                      color: '#080c14',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: '14.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 10px 25px -5px rgba(127, 232, 127, 0.3)',
                    }}
                  >
                    <span>{language === 'العربية' ? 'إتمام الإعداد والدخول للرئيسية' : 'Complete Setup & Go to Home'}</span>
                    <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SAMA Verification Footer */}
          <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <SamaLogo height={12} themeMode="green" />
            <span style={{ fontSize: '10.5px', color: '#9ca3af', fontWeight: 600 }}>
              {language === 'العربية'
                ? 'ربط مباشر مع البنك • موثق من البنك المركزي وسريع'
                : 'Direct Bank Binding • SAMA & Sarie Authenticated'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};