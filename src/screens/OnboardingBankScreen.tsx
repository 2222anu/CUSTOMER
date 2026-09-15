import React, { useState, useRef } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
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

        <div style={{ padding: '0 20px', marginTop: '12px' }}>
          <div className="main-card">
            {/* STEP 1: SELECT BANK & MATCH METHOD */}
            {step === 'SELECT_AND_MATCH' && (
              <div id="selectionView" className="fade-in">
                <div className="section-title">
                  {language === 'العربية' ? 'اختر البنك السعودي' : 'Select Saudi Bank'}
                </div>

                <div className="bank-list" role="radiogroup" aria-label="Available Banks">
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
                        className={`bank-item ${isSelected ? 'selected' : ''}`}
                      >
                        <div className="bank-info">
                          <div className="bank-icon">🏛️</div>
                          <div>
                            <div className="bank-name">{displayBankName}</div>
                            <div className="bank-meta">Sarie • {bank.code}</div>
                          </div>
                        </div>
                        <div className="radio-dot" />
                      </div>
                    );
                  })}
                </div>

                {/* Account Match Method */}
                <div className="match-section">
                  <div className="section-title" style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>
                    {language === 'العربية' ? 'طريقة مطابقة الحساب' : 'ACCOUNT MATCH METHOD'}
                  </div>
                  <div className="match-tabs">
                    <div
                      className={`match-tab ${matchMethod === 'mobile' ? 'active' : ''}`}
                      onClick={() => setMatchMethod('mobile')}
                    >
                      <span>📱</span> {language === 'العربية' ? 'الجوال المسجل' : 'Registered Mobile'}
                    </div>
                    <div
                      className={`match-tab ${matchMethod === 'iban' ? 'active' : ''}`}
                      onClick={() => setMatchMethod('iban')}
                    >
                      <span>💳</span> {language === 'العربية' ? 'الآيبان السعودي' : 'Saudi IBAN'}
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
                          padding: '12px 14px',
                          borderRadius: '14px',
                          backgroundColor: '#182236',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
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
                  <div style={{ fontSize: '12px', color: '#FF6B6B', fontWeight: 700, marginBottom: '12px' }}>
                    {errorMessage}
                  </div>
                )}

                <button className="action-btn" onClick={handleRequestOtp} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      {language === 'العربية' ? 'طلب رمز التحقق البنكي' : 'Request Bank OTP'}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* STEP 2: OTP ENTRY VIEW */}
            {step === 'AUTHORIZE_AND_CONNECT' && (
              <div id="otpView" className="otp-container" style={{ display: 'block' }}>
                {!isAuthorized ? (
                  <>
                    <div className="section-title">
                      {language === 'العربية' ? 'إدخال رمز التحقق البنكي' : 'Enter Bank OTP'}
                    </div>
                    <div className="otp-desc" id="otpDescText">
                      {language === 'العربية'
                        ? `يرجى إدخال رمز التحقق المرسل إلى رقم جوالك المسجل والمرتبط بـ ${t(selectedBank, selectedBank)}.`
                        : `Please enter the verification code sent to your registered mobile number linked with ${selectedBank}.`}
                    </div>

                    <div className="otp-inputs">
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
                        />
                      ))}
                    </div>

                    {errorMessage && (
                      <div style={{ fontSize: '12px', color: '#FF6B6B', fontWeight: 700, marginBottom: '14px' }}>
                        {errorMessage}
                      </div>
                    )}

                    <button className="action-btn" onClick={handleVerifyOtpAndLink} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />{' '}
                          {language === 'العربية' ? 'جاري الربط...' : 'Authorizing...'}
                        </>
                      ) : (
                        <>{language === 'العربية' ? 'تأكيد وربط الحساب' : 'Authorize & Link Account'}</>
                      )}
                    </button>

                    <button className="back-link" onClick={() => setStep('SELECT_AND_MATCH')}>
                      {language === 'العربية' ? '← العودة لاختيار البنك' : '← Back to bank selection'}
                    </button>
                  </>
                ) : (
                  <div className="fade-in" style={{ padding: '8px 0' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(52, 211, 153, 0.15)',
                        border: '1.5px solid #34d399',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px auto',
                      }}
                    >
                      <CheckCircle2 size={34} color="#34d399" />
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px 0' }}>
                      {language === 'العربية' ? 'تم ربط الحساب بنجاح' : 'Bank Account Linked'}
                    </h3>

                    <div
                      style={{
                        backgroundColor: '#182236',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '14px 16px',
                        marginBottom: '22px',
                        textAlign: isRtl ? 'right' : 'left',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>{language === 'العربية' ? 'البنك' : 'Bank'}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>{t(selectedBank, selectedBank)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>{language === 'العربية' ? 'حالة الربط' : 'Status'}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#34d399' }}>
                          {language === 'العربية' ? 'نشط عبر سريع' : 'Active on Sarie'}
                        </span>
                      </div>
                    </div>

                    <button className="action-btn" onClick={handleFinishOnboarding}>
                      {language === 'العربية' ? 'إتمام الإعداد والدخول للرئيسية' : 'Complete Setup & Go to Home'}{' '}
                      <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};