import React from 'react';
import {
  CreditCard,
  QrCode,
  Link2,
  Volume2,
  ChevronRight,
  Landmark,
  Store,
  Monitor,
  User,
  ReceiptText,
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';
import { SamaLogo } from '../components/SamaLogo';
import { PaymentPartnerLogo } from '../components/PaymentPartnerLogo';

export const MerchantHomeScreen: React.FC = () => {
  const {
    merchantInfo,
    merchantCollections,
    navigateTo,
    setUserRole,
    speakSoundBox,
  } = useApp();

  const totalToday = merchantCollections.reduce((acc, c) => acc + (c.status === 'settled' ? c.amount : 0), 0);
  const totalVat = merchantCollections.reduce((acc, c) => acc + (c.status === 'settled' ? c.vatAmount : 0), 0);
  const settledCount = merchantCollections.filter((c) => c.status === 'settled').length;
  const recentCollections = merchantCollections.slice(0, 3);

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'softpos_mada':
        return { label: 'mada Tap', bg: 'rgba(127, 232, 127, 0.12)', color: '#7FE87F' };
      case 'softpos_applepay':
        return { label: 'Apple Pay', bg: 'rgba(255, 255, 255, 0.12)', color: '#FFFFFF' };
      case 'softpos_visa':
      case 'softpos_mastercard':
        return { label: 'Card Tap', bg: 'rgba(92, 163, 255, 0.15)', color: '#5CA3FF' };
      case 'zatca_qr':
        return { label: 'ZATCA QR', bg: 'rgba(235, 180, 50, 0.15)', color: '#EBB432' };
      case 'payment_link':
        return { label: 'Remote Link', bg: 'rgba(180, 120, 255, 0.15)', color: '#B478FF' };
      default:
        return { label: 'Sarie POS', bg: 'rgba(127, 232, 127, 0.12)', color: '#7FE87F' };
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        paddingBottom: '36px',
        color: '#FFFFFF',
        userSelect: 'none',
      }}
    >
      {/* 1. Top Merchant Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          backgroundColor: '#000000',
          borderBottom: '1px solid #2C2C44',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}
      >
        {/* Merchant Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'rgba(127, 232, 127, 0.15)',
              border: '1px solid rgba(127, 232, 127, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7FE87F',
            }}
          >
            <Store size={20} />
          </div>
          <div>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
              {merchantInfo.businessName}
            </div>
            <div style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 700, marginTop: '2px' }}>
              CR: {merchantInfo.crNumber}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Role Switcher Pill */}
          <button
            onClick={() => {
              setUserRole('customer');
              navigateTo('HOME');
            }}
            title="Switch to Customer Mode"
            className="interactive-tap"
            style={{
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '6px 12px',
              fontSize: '11.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
            }}
          >
            <User size={13} color="#7FE87F" />
            <span>Personal</span>
          </button>

          {/* Web Admin Portal Mode */}
          <button
            onClick={() => navigateTo('MERCHANT_WEB')}
            title="Open Merchant Web Admin"
            className="interactive-tap"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#1E1E32',
              border: '1px solid #2C2C44',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7FE87F',
              cursor: 'pointer',
            }}
          >
            <Monitor size={17} />
          </button>
        </div>
      </header>

      {/* 2. Today's Total Collections Hero Summary Card */}
      <div style={{ padding: '16px 20px 0 20px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #18182E 0%, #151524 60%, #10101C 100%)',
            border: '1.5px solid #2C2C44',
            borderRadius: '20px',
            padding: '22px 20px',
            boxShadow: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Today's Collections
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: 'rgba(127, 232, 127, 0.15)',
                  color: '#7FE87F',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  border: '1px solid rgba(127, 232, 127, 0.25)',
                }}
              >
                {settledCount} Sales
              </span>
            </div>

            <button
              onClick={() => speakSoundBox(totalToday)}
              title="Test SoundBox Voice Announcement"
              className="interactive-tap"
              style={{
                background: 'none',
                border: 'none',
                color: '#7FE87F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11.5px',
                fontWeight: 700,
                padding: 0,
              }}
            >
              <Volume2 size={15} /> SoundBox
            </button>
          </div>

          {/* Big Amount */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <div>
              <div className="tabular-nums" style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {formatCurrency(totalToday)}
              </div>
              <div style={{ fontSize: '11.5px', color: '#A2A2BA', marginTop: '2px' }}>
                Incl. <span style={{ color: '#7FE87F', fontWeight: 700 }}>SAR {totalVat.toFixed(2)}</span> ZATCA 15% VAT
              </div>
            </div>

            <button
              onClick={() => navigateTo('SOFTPOS_TERMINAL')}
              className="interactive-tap"
              style={{
                backgroundColor: '#7FE87F',
                color: '#000000',
                border: 'none',
                borderRadius: '10px',
                padding: '9px 16px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <CreditCard size={16} /> Tap to Pay
            </button>
          </div>

          {/* Payout & Settlement Info Footer */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11.5px',
              color: '#A2A2BA',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Landmark size={14} color="#7FE87F" />
              <span>Settles to {merchantInfo.settlementBank}</span>
            </div>
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Auto 12:00 AM</span>
          </div>
        </div>
      </div>

      {/* 3. Payment Acceptance Tools Grid */}
      <div style={{ padding: '18px 20px 0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Payment Acceptance Suite
          </h3>
          <span style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 700 }}>
            mada & Sarie POS
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {/* 1. SoftPOS Contactless Card Terminal */}
          <div
            onClick={() => navigateTo('SOFTPOS_TERMINAL')}
            className="interactive-tap"
            style={{
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              borderRadius: '18px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '120px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7FE87F',
                }}
              >
                <CreditCard size={20} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#7FE87F', backgroundColor: 'rgba(127, 232, 127, 0.12)', padding: '2px 6px', borderRadius: '6px' }}>
                mada NFC
              </span>
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                SoftPOS Terminal
              </div>
              <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px' }}>
                Contactless tap to pay
              </div>
            </div>
          </div>

          {/* 2. ZATCA E-Invoicing QR Code Generator */}
          <div
            onClick={() => navigateTo('MERCHANT_QR_GENERATOR')}
            className="interactive-tap"
            style={{
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              borderRadius: '18px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '120px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EBB432',
                }}
              >
                <QrCode size={20} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#EBB432', backgroundColor: 'rgba(235, 180, 50, 0.12)', padding: '2px 6px', borderRadius: '6px' }}>
                ZATCA Phase 2
              </span>
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                ZATCA QR Code
              </div>
              <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px' }}>
                Dynamic tax invoice QR
              </div>
            </div>
          </div>

          {/* 3. Remote Payment Link */}
          <div
            onClick={() => navigateTo('PAYMENT_LINK_GENERATOR')}
            className="interactive-tap"
            style={{
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              borderRadius: '18px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '120px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#B478FF',
                }}
              >
                <Link2 size={20} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#B478FF', backgroundColor: 'rgba(180, 120, 255, 0.12)', padding: '2px 6px', borderRadius: '6px' }}>
                WhatsApp
              </span>
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                Payment Link
              </div>
              <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px' }}>
                Share remote order link
              </div>
            </div>
          </div>

          {/* 4. SoundBox Notifier */}
          <div
            onClick={() => navigateTo('SOUNDBOX_NOTIFIER')}
            className="interactive-tap"
            style={{
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              borderRadius: '18px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '120px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7FE87F',
                }}
              >
                <Volume2 size={20} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#7FE87F', backgroundColor: 'rgba(127, 232, 127, 0.12)', padding: '2px 6px', borderRadius: '6px' }}>
                Voice Alert
              </span>
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                SoundBox Unit
              </div>
              <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px' }}>
                Arabic & English audio
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Customer Collections Ledger */}
      <div style={{ padding: '22px 20px 0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Recent Collections
          </h3>
          <button
            onClick={() => navigateTo('MERCHANT_COLLECTIONS')}
            className="interactive-tap"
            style={{
              background: 'none',
              border: 'none',
              color: '#7FE87F',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              padding: 0,
            }}
          >
            Full Ledger <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recentCollections.map((col) => {
            const badge = getMethodBadge(col.paymentMethod);
            return (
              <div
                key={col.id}
                onClick={() => navigateTo('MERCHANT_COLLECTIONS')}
                className="interactive-tap"
                style={{
                  backgroundColor: '#151524',
                  border: '1px solid #2C2C44',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: badge.bg,
                      color: badge.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '12px',
                      flexShrink: 0,
                    }}
                  >
                    <ReceiptText size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                      {col.orderRef} • {col.customerMasked}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: badge.color, fontWeight: 700 }}>{badge.label}</span>
                      <span>&bull;</span>
                      <span>{col.date}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="tabular-nums" style={{ fontSize: '15px', fontWeight: 900, color: col.status === 'refunded' ? '#FF6B6B' : '#7FE87F' }}>
                    {col.status === 'refunded' ? '- ' : '+ '}{formatCurrency(col.amount)}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6E6E85', marginTop: '2px', fontWeight: 600 }}>
                    VAT: SAR {col.vatAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Trust & SAMA Compliance Dock */}
      <div style={{ padding: '20px 20px 0 20px' }}>
        <div
          style={{
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '18px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '10px', color: '#7FE87F', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
              SAMA Certified Merchant Engine
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF' }}>
              ZATCA Phase 2 E-Invoicing Compliant
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ backgroundColor: '#1E1E32', border: '1px solid #2C2C44', borderRadius: '10px', padding: '6px 8px', display: 'flex', alignItems: 'center' }}>
              <PaymentPartnerLogo size={20} width={64} height={32} themeMode="dark" />
            </div>
            <div style={{ backgroundColor: '#1E1E32', border: '1px solid #2C2C44', borderRadius: '10px', padding: '6px 8px', display: 'flex', alignItems: 'center' }}>
              <SamaLogo height={16} themeMode="green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
