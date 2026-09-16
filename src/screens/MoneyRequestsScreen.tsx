import React from 'react';
import { Check, X, ArrowDownLeft } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import { formatSaudiCurrency, translateText } from '../utils/i18n';

export const MoneyRequestsScreen: React.FC = () => {
  const { moneyRequests, openPinModal, completePayment, navigateTo, language, t } = useApp();

  const handlePayRequest = (req: typeof moneyRequests[0]) => {
    openPinModal({
      title: req.requesterName,
      amount: req.amount,
      subTitle: req.note || translateText('Requested Payment', language),
      onSuccess: async () => {
        const txn = await completePayment({
          title: req.requesterName,
          subTitle: translateText('Request Approved Payment', language),
          amount: req.amount,
          avatarInitials: req.requesterName.substring(0, 2).toUpperCase(),
        });
        navigateTo('PAYMENT_SUCCESS', { transaction: txn });
      },
    });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#080c14', minHeight: '100vh', paddingBottom: '32px', color: '#FFFFFF' }}>
      <AppHeader title={translateText('Money Requests', language)} showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {moneyRequests.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              backgroundColor: 'var(--color-surface, #111726)',
              borderRadius: '16px',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              padding: '48px 24px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                color: 'var(--brand-green, #7FE87F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              <ArrowDownLeft size={28} />
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>{translateText('No Pending Requests', language)}</div>
            <p style={{ fontSize: '13px', color: '#A2A2BA', marginTop: '6px', margin: '6px 0 0 0' }}>
              {language === 'العربية'
                ? 'عندما يطلب منك شخص ما أموالاً عبر نظام سريع، ستظهر هنا.'
                : 'When someone requests money from you via Sarie, it will appear here.'}
            </p>
          </div>
        ) : (
          moneyRequests.map((req) => (
            <div
              key={req.id}
              style={{
                backgroundColor: 'var(--color-surface, #111726)',
                border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                      color: 'var(--brand-green, #7FE87F)',
                      fontWeight: 800,
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      flexShrink: 0,
                    }}
                  >
                    {req.requesterName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF' }}>
                        {req.requesterName}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          backgroundColor: 'rgba(127, 232, 127, 0.12)',
                          color: '#7FE87F',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {req.upiId.includes('merchant') || req.upiId.includes('store')
                          ? (language === 'العربية' ? 'طلب متجر' : 'Merchant RTP')
                          : (language === 'العربية' ? 'طلب فوري' : 'Direct RTP')}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#A2A2BA', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{req.upiId}</span>
                      <span>•</span>
                      <span style={{ color: '#F59E0B', fontWeight: 600 }}>
                        {language === 'العربية' ? 'ينتهي خلال ١٥ د' : 'Expires in 15m'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="tabular-nums" style={{ fontSize: '18px', fontWeight: 900, color: 'var(--brand-green, #7FE87F)' }}>
                  {formatSaudiCurrency(req.amount, language)}
                </div>
              </div>

              {req.note && (
                <div
                  style={{
                    backgroundColor: 'var(--color-surface-elevated, #182236)',
                    border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontSize: '12.5px',
                    color: '#A2A2BA',
                    marginBottom: '16px',
                    fontStyle: 'italic',
                  }}
                >
                  "{req.note}"
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="interactive-tap"
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--color-surface-elevated, #182236)',
                    border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                    color: '#A2A2BA',
                    borderRadius: '12px',
                    padding: '12px',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <X size={16} /> {translateText('Decline', language)}
                </button>
                <div style={{ flex: 1.4 }}>
                  <PrimaryButton onClick={() => handlePayRequest(req)}>
                    <Check size={16} /> {t('nav.pay', 'Pay')} {formatSaudiCurrency(req.amount, language)}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

