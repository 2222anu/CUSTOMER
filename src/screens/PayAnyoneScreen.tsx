import React, { useState } from 'react';
import { Search, ChevronRight, Store } from 'lucide-react';
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
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '20px' }}>
      <AppHeader title="Pay Anyone" showBack showSettings />

      {/* Search Input Field */}
      <div style={{ padding: '0 20px', margin: '16px 0 20px 0' }}>
        <label htmlFor="search-contact-input" className="sr-only" style={{ display: 'none' }}>
          Search UPI ID or mobile number
        </label>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: 'none',
          }}
        >
          <Search size={18} color="#2e83ff" />
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
              color: '#0f172a',
              fontSize: '14px',
              fontWeight: '600',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Frequent Contacts */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: '800',
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}
        >
          Frequent Contacts
        </div>

        {filteredContacts.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '13px', padding: '10px 0' }}>
            No contacts found matching "{searchQuery}"
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
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
                aria-label={`Pay ${contact.name}, UPI ID ${contact.upiId}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: index < filteredContacts.length - 1 ? '1px solid #f1f5f9' : 'none',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#eef5ff',
                      color: '#2e83ff',
                      fontWeight: '800',
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #d6e6ff',
                    }}
                  >
                    {contact.avatarInitials}
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>
                      {contact.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#2e83ff', fontWeight: '600', marginTop: '2px' }}>
                      {contact.upiId} &bull; {contact.mobile}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verified Merchants */}
      {filteredMerchants.length > 0 && (
        <div style={{ padding: '0 20px', marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '800',
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            Verified Merchants
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
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
                aria-label={`Pay merchant ${merchant.name}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: index < filteredMerchants.length - 1 ? '1px solid #f1f5f9' : 'none',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#eef5ff',
                      color: '#2e83ff',
                      fontWeight: '800',
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #d6e6ff',
                    }}
                  >
                    <Store size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>
                      {merchant.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#2e83ff', fontWeight: '600', marginTop: '2px' }}>
                      {merchant.upiId}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
