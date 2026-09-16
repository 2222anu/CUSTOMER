import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';
import type { Contact } from '../types';

export interface PayAnyoneScreenProps {
  initialContacts?: Contact[];
}

export const PayAnyoneScreen: React.FC<PayAnyoneScreenProps> = ({ initialContacts }) => {
  const { contacts: appContextContacts, navigateTo, t, isRtl, language } = useApp();
  const contacts = initialContacts && initialContacts.length > 0 ? initialContacts : appContextContacts;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.upiId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile.includes(searchQuery)
  );

  const handleSelectContact = (contact: Contact) => {
    navigateTo('SEND_AMOUNT', { contact });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#080c14', minHeight: '100%', paddingBottom: '24px' }}>
      <AppHeader title={t('pay.send_money', 'Pay Anyone')} showBack showSettings />

      {/* Search Input Field */}
      <div style={{ padding: '0 20px', margin: '16px 0 20px 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            borderRadius: '14px',
            padding: '12px 16px',
            boxShadow: 'none',
          }}
        >
          <Search size={18} color="var(--brand-green, #00D09C)" />
          <input
            id="search-contact-input"
            type="text"
            placeholder={language === 'العربية' ? 'ابحث بالاسم، معرف سريع، أو رقم الجوال' : 'Search name, Sarie ID, or number'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Sarie ID or mobile number"
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '14.5px',
              fontWeight: 600,
              width: '100%',
              padding: 0,
              textAlign: isRtl ? 'right' : 'left',
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
                color: '#6E6E85',
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
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {t('pay.quick_contacts', 'Contacts')}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--brand-green)', fontWeight: 700 }}>
            {filteredContacts.length}
          </span>
        </div>

        {filteredContacts.length === 0 ? (
          <div style={{ color: '#6b7280', fontSize: '13px', padding: '16px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            {language === 'العربية' ? 'لم يتم العثور على جهات اتصال' : 'No contacts found'}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'none',
            }}
          >
            {filteredContacts.map((contact, index) => {
              const displayName = t(contact.name, contact.name);
              return (
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
                  aria-label={`Pay ${displayName}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderBottom: index < filteredContacts.length - 1 ? '1px solid var(--color-border)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))',
                        color: 'var(--brand-green, #00D09C)',
                        fontWeight: 800,
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                      }}
                    >
                      {contact.avatarInitials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '14px', color: '#FFFFFF', lineHeight: '18px' }}>
                        {displayName}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#9ca3af', marginTop: '2px' }}>
                        {contact.upiId || contact.mobile}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        backgroundColor: 'var(--brand-green, #00D09C)',
                        color: 'var(--brand-green-ink, #080C14)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      {t('nav.pay', 'Pay')}{' '}
                      <ArrowRight size={12} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
