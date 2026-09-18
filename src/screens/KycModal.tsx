import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  ArrowRight,
  Loader2,
  Calendar,
  UploadCloud,
  FileText,
  X,
  Sparkles,
  RefreshCw,
  Building2,
} from 'lucide-react';
import { BottomSheet } from '../components/BottomSheet';
import { SamaLogo } from '../components/SamaLogo';
import { useApp } from '../state/AppContext';

type KycStep = 'FORM' | 'VERIFYING' | 'CERTIFIED';

export const KycModal: React.FC = () => {
  const {
    isKycModalOpen,
    setIsKycModalOpen,
    isKycVerified,
    kycData,
    submitReKyc,
    isRtl,
    language,
  } = useApp();

  const isAr = language === 'العربية';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<KycStep>('FORM');
  const [docType, setDocType] = useState<string>('national_id');
  const [nationalId, setNationalId] = useState(kycData?.nationalId || '1098472910');
  const [dob, setDob] = useState(kycData?.dob || '1992-05-14');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; previewUrl: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isKycModalOpen) {
      if (isKycVerified) {
        setStep('CERTIFIED');
      } else {
        setStep('FORM');
        setErrorMsg('');
      }
    }
  }, [isKycModalOpen, isKycVerified]);

  const handleClose = () => {
    if (step === 'VERIFYING') return;
    setIsKycModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeKb = Math.round(file.size / 1024);
    const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setSelectedFile({
        name: file.name,
        size: sizeStr,
        previewUrl: uploadEvent.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUseSampleDoc = () => {
    setSelectedFile({
      name: docType === 'iqama' ? 'Iqama_Digital_Copy_2026.pdf' : 'National_ID_Saudi_2026.jpg',
      size: '1.2 MB',
      previewUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=60',
    });
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const cleanId = nationalId.replace(/\D/g, '');
    if (cleanId.length < 10) {
      setErrorMsg(
        isAr
          ? 'يرجى إدخال رقم هوية وطنية أو إقامة صحيح من ١٠ أرقام.'
          : 'Please enter a valid 10-digit National ID or Iqama Number.'
      );
      return;
    }

    if (!selectedFile) {
      setErrorMsg(
        isAr
          ? 'يرجى إرفاق صورة الهوية أو المستند لإتمام التحقق (Re-KYC).'
          : 'Please attach a copy of your National ID or Iqama document to continue.'
      );
      return;
    }

    setErrorMsg('');
    setStep('VERIFYING');

    setTimeout(async () => {
      await submitReKyc({
        frontDocUrl: selectedFile.previewUrl,
        docType,
        nationalId: cleanId,
        dob,
      });
      setStep('CERTIFIED');
    }, 1200);
  };

  return (
    <BottomSheet
      isOpen={isKycModalOpen}
      onClose={handleClose}
      title={isAr ? 'توثيق الهوية الوطنية (Re-KYC)' : 'Identity Verification (Re-KYC)'}
    >
      <div style={{ paddingBottom: '8px' }}>
        {/* Header Identity Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              backgroundColor: 'rgba(127, 232, 127, 0.15)',
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
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              {isAr ? 'إعادة توثيق الهوية (Re-KYC)' : 'Digital Identity & Re-KYC'}
            </h3>
            <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600, marginTop: '2px', display: 'block' }}>
              {isAr ? 'ربط مباشر مع النفاذ الوطني الموحد وسامـا' : 'Direct verification with Nafath & SAMA'}
            </span>
          </div>
        </div>

        {/* STEP 1: FORM */}
        {step === 'FORM' && (
          <form onSubmit={handleVerify} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Document Type Selector */}
            <div>
              <label
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
                {isAr ? 'نوع الوثيقة الرسمية' : 'Document Type'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setDocType('national_id')}
                  className="interactive-tap"
                  style={{
                    padding: '12px 10px',
                    borderRadius: '14px',
                    backgroundColor: docType === 'national_id' ? 'rgba(127, 232, 127, 0.15)' : '#182236',
                    border: docType === 'national_id' ? '1.5px solid #7FE87F' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: docType === 'national_id' ? '#7FE87F' : '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Building2 size={14} />
                  <span>{isAr ? 'الهوية الوطنية' : 'Saudi National ID'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDocType('iqama')}
                  className="interactive-tap"
                  style={{
                    padding: '12px 10px',
                    borderRadius: '14px',
                    backgroundColor: docType === 'iqama' ? 'rgba(127, 232, 127, 0.15)' : '#182236',
                    border: docType === 'iqama' ? '1.5px solid #7FE87F' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: docType === 'iqama' ? '#7FE87F' : '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <UserCheck size={14} />
                  <span>{isAr ? 'هوية مقيم (إقامة)' : 'Iqama Residence'}</span>
                </button>
              </div>
            </div>

            {/* National ID / Iqama Input */}
            <div>
              <label
                htmlFor="modal-national-id"
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
                {docType === 'iqama' ? (isAr ? 'رقم الإقامة (١٠ أرقام تبدأ بـ ٢)' : 'Iqama Number (10 digits starting with 2)') : (isAr ? 'رقم الهوية الوطنية (١٠ أرقام تبدأ بـ ١)' : 'National ID Number (10 digits starting with 1)')}
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#182236',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '13px 16px',
                  gap: '12px',
                }}
              >
                <UserCheck size={18} color="#7FE87F" style={{ flexShrink: 0 }} />
                <input
                  id="modal-national-id"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder={docType === 'iqama' ? '2489102941' : '1098472910'}
                  required
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    flex: 1,
                    minWidth: 0,
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
                htmlFor="modal-dob"
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
                {isAr ? 'تاريخ الميلاد' : 'Date of Birth'}
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#182236',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '13px 16px',
                  gap: '12px',
                }}
              >
                <Calendar size={18} color="#7FE87F" style={{ flexShrink: 0 }} />
                <input
                  id="modal-dob"
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
                    flex: 1,
                    minWidth: 0,
                    colorScheme: 'dark',
                  }}
                />
              </div>
            </div>

            {/* Re-KYC Document Upload Zone (USER-20) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                  }}
                >
                  {isAr ? 'إرفاق صورة الوثيقة (Re-KYC)' : 'Attach ID Document Photo / PDF'}
                </label>
                <button
                  type="button"
                  onClick={handleUseSampleDoc}
                  className="interactive-tap"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#7FE87F',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Sparkles size={12} />
                  <span>{isAr ? 'استخدام نموذج تجريبي' : 'Use Sample ID'}</span>
                </button>
              </div>

              {/* Hidden Real File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {selectedFile ? (
                /* Selected File Card */
                <div
                  style={{
                    backgroundColor: '#182236',
                    border: '1.5px solid #7FE87F',
                    borderRadius: '16px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(127, 232, 127, 0.15)',
                        color: '#7FE87F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', wordBreak: 'break-all' }}>
                        {selectedFile.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 700, marginTop: '2px' }}>
                        {selectedFile.size} • {isAr ? 'جاهز للرفع والتحقق' : 'Ready to verify'}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="interactive-tap"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: 'none',
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {isAr ? 'تغيير' : 'Change'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="interactive-tap"
                      style={{
                        background: 'rgba(255, 71, 87, 0.15)',
                        border: 'none',
                        color: '#FF4757',
                        borderRadius: '8px',
                        padding: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Upload Dropzone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  className="interactive-tap"
                  style={{
                    backgroundColor: '#182236',
                    border: '1.5px dashed rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    padding: '24px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(127, 232, 127, 0.12)',
                      color: '#7FE87F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px auto',
                    }}
                  >
                    <UploadCloud size={22} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                    {isAr ? 'انقر لرفع صورة الهوية أو اسحب الملف هنا' : 'Tap to upload ID photo or drag & drop'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#8E9BAE', marginTop: '4px' }}>
                    {isAr ? 'صيغ مدعومة: JPG, PNG, PDF (الحد الأقصى ٥ ميجابايت)' : 'Supported formats: JPG, PNG, PDF (Up to 5MB)'}
                  </div>
                </div>
              )}
            </div>

            {errorMsg && (
              <div style={{ fontSize: '12px', color: '#FF4757', fontWeight: 700, backgroundColor: 'rgba(255, 71, 87, 0.1)', padding: '10px 14px', borderRadius: '12px' }}>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="action-btn interactive-tap"
              style={{
                marginTop: '4px',
                width: '100%',
                padding: '15px',
                backgroundColor: '#7FE87F',
                color: '#080C14',
                border: 'none',
                borderRadius: '16px',
                fontSize: '14.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(127, 232, 127, 0.3)',
              }}
            >
              <span>{isAr ? 'توثيق الهوية عبر النفاذ الوطني' : 'Verify via Nafath & SAMA'}</span>
              <ArrowRight size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
            </button>
          </form>
        )}

        {/* STEP 2: VERIFYING */}
        {step === 'VERIFYING' && (
          <div style={{ textAlign: 'center', padding: '36px 10px' }} className="fade-in">
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
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
              {isAr ? 'جاري التحقق والمطابقة مع النفاذ الوطني...' : 'Verifying with Nafath Registry...'}
            </h4>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
              {isAr ? 'مطابقة الوثائق المرفقة وسجل البنك المركزي السعودي' : 'Matching attached documents with SAMA & Absher records'}
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
              {isAr ? 'تم توثيق الهوية الوطنية بنجاح' : 'National ID Verified'}
            </h4>
            <div style={{ fontSize: '12px', color: '#7FE87F', fontWeight: 700, marginBottom: '18px' }}>
              {isAr ? 'حسابك معتمد وموثق بالكامل لدى سامـا' : 'Fully certified & compliant with SAMA regulations'}
            </div>

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
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{isAr ? 'رقم الهوية' : 'National ID'}</span>
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace' }}>
                  {kycData?.nationalId || nationalId}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{isAr ? 'حالة التوثيق' : 'Status'}</span>
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#7FE87F' }}>
                  {isAr ? 'معتمد وموثق (Nafath)' : 'Certified (Nafath)'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{isAr ? 'الحد اليومي المتاح' : 'Daily Sarie Limit'}</span>
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#7FE87F' }}>SAR 50,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{isAr ? 'تاريخ التوثيق' : 'Verified At'}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#8E9BAE' }}>
                  {kycData?.verifiedAt || new Date().toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setStep('FORM')}
                className="interactive-tap"
                style={{
                  flex: 1,
                  padding: '14px',
                  backgroundColor: '#111726',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <RefreshCw size={14} color="#7FE87F" />
                <span>{isAr ? 'إعادة التوثيق (Re-KYC)' : 'Update Documents'}</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="action-btn interactive-tap"
                style={{
                  flex: 1,
                  padding: '14px',
                  backgroundColor: '#7FE87F',
                  color: '#080C14',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{isAr ? 'إغلاق ومتابعة' : 'Done & Close'}</span>
              </button>
            </div>
          </div>
        )}

        {/* SAMA Verification Footer */}
        <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <SamaLogo height={12} themeMode="green" />
          <span style={{ fontSize: '10.5px', color: '#9ca3af', fontWeight: 600 }}>
            {isAr
              ? 'توثيق رسمي ومعتمد • البنك المركزي السعودي والنفاذ الوطني'
              : 'Official Identity Verification • SAMA & Nafath Regulated'}
          </span>
        </div>
      </div>
    </BottomSheet>
  );
};
