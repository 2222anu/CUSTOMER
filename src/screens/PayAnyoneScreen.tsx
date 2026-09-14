import React, { useState } from 'react';
import { Search, ChevronRight, Store, X, ArrowRight } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';
import type { Contact } from '../types';

export const PayAnyoneScreen: React.FC = () => {
  const { contacts, merchants, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.upiId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile.includes(searchQuery)
  );

  const filteredMerchants = merchants.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.upiId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectContact = (contact: Contact) => {
    navigateTo('SEND_AMOUNT', { contact });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '24px' }}>
      <AppHeader title="Pay Anyone" showBack showSettings />

      {/* Search Input Field */}
      <div style={{ padding: '0 20px', margin: '16px 0 20px 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: 'none',
            transition: 'border-color 0.2s ease',
          }}
        >
          <Search size={18} color="#7FE87F" />
          <input
            id="search-contact-input"
            type="text"
            placeholder="Enter Name, UPI ID or mobile number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search UPI ID or mobile number"
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '14.5px',
              fontWeight: 600,
              width: '100%',
              padding: 0,
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="interactive-tap"
              style={{
                background: 'none',
                border: 'none',
                color: '#808099',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Frequent Contacts */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#B3B3C2',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Frequent Contacts
          </span>
          <span style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 700 }}>
            {filteredContacts.length} available
          </span>
        </div>

        {filteredContacts.length === 0 ? (
          <div style={{ color: '#808099', fontSize: '13px', padding: '16px', textAlign: 'center', backgroundColor: '#2A2A3E', borderRadius: '12px', border: '1px solid #4D4D6B' }}>
            No contacts found matching "{searchQuery}"
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: 'none',
            }}
          >
            {filteredContacts.map((contact, index) => (
              <div
                key={contact.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectContact(contact)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectContact(contact);
                  }
                }}
                className="interactive-tap"
                aria-label={`Pay ${contact.name}, UPI ID ${contact.upiId}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: index < filteredContacts.length - 1 ? '1px solid #3A3A52' : 'none',
                  cursor: 'pointer',
                  backgroundColor: '#2A2A3E',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#3A3A52',
                      color: '#7FE87F',
                      fontWeight: 800,
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #4D4D6B',
                      flexShrink: 0,
                    }}
                  >
                    {contact.avatarInitials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF', lineHeight: '18px' }}>
                      {contact.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#7FE87F', fontWeight: 600, marginTop: '2px' }}>
                      {contact.upiId} &bull; <span style={{ color: '#B3B3C2' }}>{contact.mobile}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      backgroundColor: '#7FE87F',
                      color: '#000000',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    Pay <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredMerchants.length > 0 && (
        <div style={{ padding: '0 20px', marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#B3B3C2',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            Verified Merchants
          </div>

          <div
            style={{
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: 'none',
            }}
          >
            {filteredMerchants.map((merchant, index) => (
              <div
                key={merchant.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectContact(merchant)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectContact(merchant);
                  }
                }}
                className="interactive-tap"
                aria-label={`Pay merchant ${merchant.name}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: index < filteredMerchants.length - 1 ? '1px solid #3A3A52' : 'none',
                  cursor: 'pointer',
                  backgroundColor: '#2A2A3E',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#3A3A52',
                      color: '#7FE87F',
                      fontWeight: 800,
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #4D4D6B',
                      flexShrink: 0,
                    }}
                  >
                    <Store size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF', lineHeight: '18px' }}>
                      {merchant.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#7FE87F', fontWeight: 600, marginTop: '2px' }}>
                      {merchant.upiId}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#808099" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
