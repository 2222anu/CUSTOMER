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
    <div className="fade-in">
      <AppHeader title="Pay Anyone" showBack showSettings />

      {/* Search Input Field */}
      <div style={{ padding: '0 20px', margin: '12px 0 20px 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '12px 16px',
            boxShadow: '0 2px 10px rgba(7, 25, 19, 0.03)',
          }}
        >
          <Search size={18} color="#071913" />
          <input
            type="text"
            placeholder="Enter UPI ID or mobile number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '14px',
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
            fontWeight: '700',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}
        >
          Frequent Contacts
        </div>

        {filteredContacts.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', padding: '10px 0' }}>
            No contacts found matching "{searchQuery}"
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleSelectContact(contact)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--card-border)',
                borderRadius: '18px',
                marginBottom: '10px',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(7, 25, 19, 0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(158, 240, 26, 0.18)',
                    color: '#071913',
                    fontWeight: '700',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {contact.avatarInitials}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>
                    {contact.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {contact.upiId} &bull; {contact.mobile}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="var(--text-secondary)" />
            </div>
          ))
        )}
      </div>

      {/* Merchants */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}
        >
          Merchants
        </div>

        {filteredMerchants.map((merchant) => (
          <div
            key={merchant.id}
            onClick={() => handleSelectContact(merchant)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--card-border)',
              borderRadius: '18px',
              marginBottom: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(7, 25, 19, 0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(158, 240, 26, 0.15)',
                  color: '#071913',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Store size={22} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>
                  {merchant.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {merchant.upiId}
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-secondary)" />
          </div>
        ))}
      </div>
    </div>
  );
};
