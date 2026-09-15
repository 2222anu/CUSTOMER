import React, { useState } from 'react';
import { ArrowLeft, Link2, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { SamaLogo } from '../components/SamaLogo';

export const PaymentLinkGeneratorScreen: React.FC = () => {
  const {
    merchantInfo,
    processMerchantCollection,
    navigateTo,
    goBack,
  } = useApp();

  const [orderRef, setOrderRef] = useState('Order #ORD-8839');
  const [customerName, setCustomerName] = useState('Sara Al-Mansoor');
  const [amount, setAmount] = useState('320.00');
  const [generatedLink, setGeneratedLink] = useState('https://alphpay.sa/pay/lnk_8839201');
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const numAmount = parseFloat(amount) || 0;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const linkId = 'lnk_' + Math.floor(1000000 + Math.random() * 9000000);
    setGeneratedLink(`https://alphpay.sa/pay/${linkId}`);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${customerName}, here is your payment link for ${orderRef} (${merchantInfo.businessName}):\nAmount: SAR ${numAmount.toFixed(2)}\nPay securely via mada / Apple Pay / Sarie:\n${generatedLink}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSimulateRemotePayment = async () => {
    if (numAmount <= 0) return;
    setIsSimulating(true);
    await processMerchantCollection({
      amount: numAmount,
      paymentMethod: 'payment_link',
      orderRef,
      customerMasked: customerName,
    });
    setTimeout(() => {
      setIsSimulating(false);
      navigateTo('MERCHANT_PAYMENT_SUCCESS');
    }, 800);
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 20px 24px 20px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={goBack}
          aria-label="Back"
          className="interactive-tap"
          style={{
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            color: '#FFFFFF',
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
            Payment Link Generator
          </div>
          <div style={{ fontSize: '11px', color: '#B478FF', fontWeight: 700 }}>
            Remote Customer Settlement
          </div>
        </div>

        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: 'rgba(180, 120, 255, 0.12)',
            border: '1px solid rgba(180, 120, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B478FF',
          }}
        >
          <Link2 size={18} />
        </div>
      </div>

      {/* Form & Link Card */}
      <div style={{ width: '100%', maxWidth: '380px', margin: '14px auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Order Ref */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
              Order Reference / Invoice #
            </label>
            <input
              type="text"
              value={orderRef}
              onChange={(e) => setOrderRef(e.target.value)}
              placeholder="Order #ORD-8839"
              required
              style={{
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                width: '100%',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          {/* Customer Name */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Sara Al-Mansoor"
              required
              style={{
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                width: '100%',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          {/* Amount in SAR */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
              Total Amount (SAR)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="320.00"
              required
              style={{
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 800,
                width: '100%',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>
        </form>

        {/* Generated Link Display Card */}
        <div
          style={{
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '16px',
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', marginBottom: '6px' }}>
            Generated Secure Payment Link
          </div>
          <div
            style={{
              backgroundColor: '#1E1E32',
              border: '1px solid #2C2C44',
              borderRadius: '10px',
              padding: '10px 12px',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: '#7FE87F',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: '12px',
            }}
          >
            {generatedLink}
          </div>

          {/* Quick Sharing Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <button
              onClick={handleShareWhatsApp}
              className="interactive-tap"
              style={{
                backgroundColor: '#25D366',
                color: '#000000',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <MessageSquare size={15} /> WhatsApp
            </button>

            <button
              onClick={handleCopy}
              className="interactive-tap"
              style={{
                backgroundColor: '#1E1E32',
                color: '#FFFFFF',
                border: '1px solid #2C2C44',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              {copied ? <Check size={15} color="#7FE87F" /> : <Copy size={15} />}
              {copied ? 'Link Copied' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Simulate Remote Payment */}
        <PrimaryButton onClick={handleSimulateRemotePayment} disabled={isSimulating || numAmount <= 0}>
          <Sparkles size={16} /> Simulate Customer Paid Link
        </PrimaryButton>
      </div>

      {/* SAMA Dock */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
        <span style={{ fontSize: '10.5px', color: '#6E6E85', fontWeight: 700 }}>
          Protected by SAMA Sarie & 256-Bit SSL Gateway
        </span>
        <SamaLogo height={14} themeMode="green" />
      </div>
    </div>
  );
};
