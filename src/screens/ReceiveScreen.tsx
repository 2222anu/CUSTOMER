import React, { useState } from 'react';
import { Copy, CheckCircle2, Share2, Landmark, Zap, ShieldCheck } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { QRCodeView } from '../components/QRCodeView';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { qrService } from '../services/qrService';

export const ReceiveScreen: React.FC = () => {
  const { user, bankAccounts, t, language } = useApp();
  const isAr = language === 'العربية' || language === 'ar';

  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);

  const primaryBank = bankAccounts.find((b) => b.isPrimary) || bankAccounts[0];
  const sarieAlias = user.upiId || 'fahad@sarie';
  const fullIban = 'SA0380000000608010167519';
  const formattedIban = 'SA03 8000 0000 6080 1016 7519';
  const displayName = t(user.name, user.name);

  const upiQrString = qrService.getUpiQrString(sarieAlias, user.name);

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(sarieAlias);
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2000);
  };

  const handleCopyIban = () => {
    navigator.clipboard.writeText(fullIban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'QTPay Sarie & IBAN Details',
          text: `${isAr ? 'بيانات التحويل عبر سريع والآيبان:' : 'Sarie & IBAN Payment Details:'}\n${isAr ? 'الاسم:' : 'Name:'} ${displayName}\n${isAr ? 'معرّف سريع:' : 'SARIE Alias:'} ${sarieAlias}\n${isAr ? 'الآيبان:' : 'IBAN:'} ${formattedIban}`,
        })
        .catch(() => {});
    } else {
      handleCopyIban();
    }
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#080c14', minHeight: '100%', paddingBottom: '96px', color: '#FFFFFF' }}>
      <AppHeader title={t('receive.title', 'Receive Money')} showBack />

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Main QR and Identity Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            borderRadius: '24px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* User Avatar */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
              color: 'var(--brand-green, #7FE87F)',
              fontWeight: 800,
              fontSize: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              user.avatarInitials
            )}
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            {displayName}
          </h2>
          <div style={{ fontSize: '12px', color: '#8E9BAE', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="var(--brand-green, #7FE87F)" />
            <span>{primaryBank ? t(primaryBank.bankName, primaryBank.bankName) : 'Al Rajhi Bank'} • {isAr ? 'حساب معتمد' : 'Verified Sarie Account'}</span>
          </div>

          {/* QR Code Container */}
          <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '18px', margin: '20px 0' }}>
            <QRCodeView value={upiQrString} size={180} />
          </div>

          <div style={{ fontSize: '11.5px', color: '#8E9BAE', fontWeight: 600 }}>
            {isAr ? 'امسح الرمز للدفع الفوري عبر أي تطبيق بنكي سعودي' : 'Scan to pay instantly via any Saudi Banking App'}
          </div>
        </div>

        {/* 1. SARIE Alias Box + Copy Alias */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            borderRadius: '16px',
            padding: '16px 18px',
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
                borderRadius: '12px',
                backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                color: 'var(--brand-green, #7FE87F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#8E9BAE', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {isAr ? 'معرّف سريع (SARIE Alias)' : 'SARIE Alias'}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px', fontFamily: 'monospace' }} dir="ltr">
                {sarieAlias}
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyAlias}
            className="interactive-tap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: copiedAlias ? 'var(--brand-green, #7FE87F)' : 'var(--color-surface-elevated, #182236)',
              color: copiedAlias ? '#080C14' : 'var(--brand-green, #7FE87F)',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {copiedAlias ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            <span>{copiedAlias ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ المعرّف' : 'Copy Alias')}</span>
          </button>
        </div>

        {/* 2. IBAN Box + Copy IBAN */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
            borderRadius: '16px',
            padding: '16px 18px',
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
                borderRadius: '12px',
                backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                color: 'var(--brand-green, #7FE87F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Landmark size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#8E9BAE', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {isAr ? 'رقم الآيبان (IBAN)' : 'IBAN Number'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px', fontFamily: 'monospace', letterSpacing: '0.04em' }} dir="ltr">
                {formattedIban}
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyIban}
            className="interactive-tap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: copiedIban ? 'var(--brand-green, #7FE87F)' : 'var(--color-surface-elevated, #182236)',
              color: copiedIban ? '#080C14' : 'var(--brand-green, #7FE87F)',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {copiedIban ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            <span>{copiedIban ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الآيبان' : 'Copy IBAN')}</span>
          </button>
        </div>

        {/* Share Action Button */}
        <PrimaryButton onClick={handleShare}>
          <Share2 size={18} /> {isAr ? 'مشاركة بيانات الحساب والرمز' : 'Share QR & Account Details'}
        </PrimaryButton>
      </div>
    </div>
  );
};
