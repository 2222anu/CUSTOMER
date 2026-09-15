import React, { useState } from 'react';
import { ArrowLeft, Delete, ShieldCheck } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { formatCurrency } from '../utils/formatters';

const CARD_SCHEMES = [
  { id: 'mada', label: 'mada Debit', icon: '🇸🇦' },
  { id: 'applepay', label: 'Apple Pay', icon: '' },
  { id: 'visa', label: 'Visa', icon: '💳' },
  { id: 'mastercard', label: 'Mastercard', icon: '💳' },
];

export const SoftPOSTerminalScreen: React.FC = () => {
  const {
    softPosAmount,
    setSoftPosAmount,
    softPosCardScheme,
    setSoftPosCardScheme,
    navigateTo,
    goBack,
    merchantInfo,
  } = useApp();

  const [rawAmountStr, setRawAmountStr] = useState<string>(
    softPosAmount > 0 ? (softPosAmount * 100).toString() : '6700'
  );

  const numericValue = (parseInt(rawAmountStr || '0', 10) / 100) || 0;

  const handleKeyPress = (digit: string) => {
    if (rawAmountStr.length < 8) {
      if (rawAmountStr === '0') setRawAmountStr(digit);
      else setRawAmountStr((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setRawAmountStr((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleCharge = () => {
    if (numericValue > 0) {
      setSoftPosAmount(numericValue);
      navigateTo('SOFTPOS_TAP', {
        amount: numericValue,
        cardScheme: softPosCardScheme,
      });
    }
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
      {/* Top Navigation */}
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
            SoftPOS Terminal
          </div>
          <div style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 700 }}>
            {merchantInfo.businessName}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(127, 232, 127, 0.12)',
            border: '1px solid rgba(127, 232, 127, 0.25)',
            borderRadius: '8px',
            padding: '4px 8px',
            fontSize: '11px',
            fontWeight: 800,
            color: '#7FE87F',
          }}
        >
          <ShieldCheck size={13} />
          <span>mada NFC</span>
        </div>
      </div>

      {/* Center: Amount Display & Scheme Selector */}
      <div style={{ textAlign: 'center', margin: '14px 0' }}>
        <div style={{ fontSize: '11.5px', color: '#A2A2BA', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '6px' }}>
          Enter Charge Amount
        </div>

        <div className="tabular-nums" style={{ fontSize: '42px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {formatCurrency(numericValue)}
        </div>

        {/* 15% ZATCA VAT Breakdown Tag */}
        <div style={{ fontSize: '12px', color: '#7FE87F', fontWeight: 700 }}>
          Includes SAR {(numericValue - numericValue / 1.15).toFixed(2)} (15% ZATCA VAT)
        </div>

        {/* Card Scheme Selection */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          {CARD_SCHEMES.map((scheme) => {
            const isSelected = softPosCardScheme === scheme.id;
            return (
              <button
                key={scheme.id}
                type="button"
                onClick={() => setSoftPosCardScheme(scheme.id)}
                className="interactive-tap"
                style={{
                  backgroundColor: isSelected ? '#1E1E32' : '#151524',
                  border: isSelected ? '1.5px solid #7FE87F' : '1px solid #2C2C44',
                  color: isSelected ? '#FFFFFF' : '#A2A2BA',
                  borderRadius: '12px',
                  padding: '6px 12px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span>{scheme.icon}</span>
                <span>{scheme.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* POS Numeric Keypad */}
      <div style={{ width: '100%', maxWidth: '330px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => handleKeyPress(d)}
              className="interactive-tap"
              style={{
                height: '52px',
                borderRadius: '14px',
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                color: '#FFFFFF',
                fontSize: '22px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {d}
            </button>
          ))}

          {/* Quick Double Zero */}
          <button
            type="button"
            onClick={() => handleKeyPress('00')}
            className="interactive-tap"
            style={{
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            00
          </button>

          {/* Zero */}
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="interactive-tap"
            style={{
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              color: '#FFFFFF',
              fontSize: '22px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            0
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            className="interactive-tap"
            style={{
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              color: '#A2A2BA',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Charge CTA */}
        <div style={{ marginTop: '16px' }}>
          <PrimaryButton onClick={handleCharge} disabled={numericValue <= 0}>
            Charge Contactless ({formatCurrency(numericValue)})
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
