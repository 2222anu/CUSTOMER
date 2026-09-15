import React, { useState } from 'react';
import { Store, MapPin, Hash, ArrowRight } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { SamaLogo } from '../components/SamaLogo';
import { AlphPayLogo } from '../components/AlphPayLogo';

const CATEGORIES = [
  'Groceries & Gourmet',
  'Food & Drink',
  'Retail & Fashion',
  'Electronics & Tech',
  'Fuel & Auto',
  'Services',
  'Pharmacy & Health',
  'Other Business',
];

const CITIES = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Tabuk', 'Abha'];

export const MerchantSetupScreen: React.FC = () => {
  const { merchantInfo, updateMerchantInfo, navigateTo } = useApp();
  const [businessName, setBusinessName] = useState(merchantInfo.businessName || 'Starmart Supermarket');
  const [category, setCategory] = useState(merchantInfo.category || 'Groceries & Gourmet');
  const [city, setCity] = useState(merchantInfo.city || 'Riyadh');
  const storePhone = merchantInfo.storePhone || '0501234567';
  const [vatNumber] = useState(merchantInfo.vatNumber || '310948201900003');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMerchantInfo({
      businessName,
      category,
      city,
      storePhone,
      vatNumber,
    });
    navigateTo('MERCHANT_BANK_LINK');
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
        padding: '40px 24px 30px 24px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '18px',
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
          }}
        >
          <AlphPayLogo variant="icon" size={36} themeMode="dark" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0', color: '#FFFFFF' }}>
          Business Profile Setup
        </h2>
        <p style={{ fontSize: '13px', color: '#A2A2BA', margin: 0 }}>
          Configure your merchant trading identity for ZATCA e-invoicing
        </p>
      </div>

      {/* Main Form */}
      <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Business Name */}
          <div>
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
              Business / Store Trade Name
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                borderRadius: '14px',
                padding: '12px 16px',
              }}
            >
              <Store size={18} color="#7FE87F" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Starmart Supermarket"
                required
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Business Category Selection Pills */}
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
              Business Category
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  style={{
                    backgroundColor: category === cat ? '#7FE87F' : '#151524',
                    color: category === cat ? '#000000' : '#A2A2BA',
                    border: category === cat ? '1px solid #7FE87F' : '1px solid #2C2C44',
                    borderRadius: '20px',
                    padding: '6px 12px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Operating City */}
          <div>
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
              Operating City / Location
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                borderRadius: '14px',
                padding: '12px 16px',
              }}
            >
              <MapPin size={18} color="#7FE87F" style={{ marginRight: '12px', flexShrink: 0 }} />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} style={{ backgroundColor: '#151524', color: '#FFFFFF' }}>
                    {c}, Saudi Arabia
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Auto-Generated ZATCA 15-Digit VAT Number */}
          <div>
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
              ZATCA Tax Identification / VAT ID (15 Digits)
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#151524',
                border: '1px solid #2C2C44',
                borderRadius: '14px',
                padding: '12px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Hash size={18} color="#7FE87F" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.05em' }}>
                  {vatNumber}
                </span>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#7FE87F',
                  backgroundColor: 'rgba(127, 232, 127, 0.12)',
                  padding: '2px 6px',
                  borderRadius: '6px',
                }}
              >
                ZATCA Phase 2
              </span>
            </div>
          </div>

          {/* Submit CTA */}
          <div style={{ marginTop: '10px' }}>
            <PrimaryButton type="submit" disabled={!businessName.trim()}>
              Continue to Settlement Bank <ArrowRight size={18} />
            </PrimaryButton>
          </div>
        </form>
      </div>

      {/* SAMA Dock */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          width: '100%',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <span style={{ fontSize: '10.5px', color: '#6E6E85', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Regulated & Supervised by
        </span>
        <SamaLogo height={18} themeMode="green" />
      </div>
    </div>
  );
};
