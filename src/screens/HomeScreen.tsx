import React, { useState } from 'react';
import {
  Bell,
  Camera,
  Send,
  QrCode,
  Zap,
  Smartphone,
  Droplets,
  Car,
  ChevronRight,
  Landmark,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { QPayHeroBanner } from '../components/QPayHeroBanner';
import { BankCardCarousel } from '../components/BankCardCarousel';
import { BalanceSummaryModal } from '../components/BalanceSummaryModal';
import { TransactionRow } from '../components/TransactionRow';
import { PaymentPartnerLogo } from '../components/PaymentPartnerLogo';
import { SamaLogo } from '../components/SamaLogo';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';

export const HomeScreen: React.FC = () => {
  const { bankAccounts, transactions, navigateTo, setIsScanModalOpen, openPinModal } = useApp();
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [showTotalBalance, setShowTotalBalance] = useState(true);

  const totalBalance = bankAccounts.reduce((acc, bank) => acc + bank.balance, 0);
  const recentTransactions = transactions.slice(0, 3);

  const handleCheckBalanceClick = () => {
    openPinModal({
      title: 'Check Bank Balance',
      subTitle: 'Enter 4-digit Sarie PIN to view account balance',
      amount: totalBalance,
      onSuccess: () => {
        setIsBalanceModalOpen(true);
      },
    });
  };

  return (
    <div
      className="fade-in"
      style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        paddingBottom: '32px',
        color: '#FFFFFF',
        userSelect: 'none',
      }}
    >
      {/* 1. App Header with Profile, AlphPay Emblem & Notification Bell */}
      <AppHeader
        showUserInfo
        showSettings={false}
        rightAction={
          <button
            onClick={() => navigateTo('NOTIFICATIONS')}
            aria-label="Notifications"
            className="interactive-tap"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: 'none',
              color: '#FFFFFF',
            }}
          >
            <Bell size={18} color="#7FE87F" />
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#7FE87F',
              }}
            />
          </button>
        }
      />

      {/* 2. Total Balance & Instant Sarie Overview Hero */}
      <div style={{ padding: '14px 20px 0 20px' }}>
        <div
          style={{
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '18px',
            padding: '20px 22px',
            boxShadow: 'none',
          }}
        >
          {/* Top meta row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Total Available Balance
              </span>
              <button
                type="button"
                onClick={() => setShowTotalBalance(!showTotalBalance)}
                aria-label={showTotalBalance ? 'Hide total balance' : 'Show total balance'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#A2A2BA',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showTotalBalance ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(127, 232, 127, 0.12)',
                border: '1px solid rgba(127, 232, 127, 0.25)',
                color: '#7FE87F',
                fontSize: '10.5px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '12px',
              }}
            >
              <ShieldCheck size={12} color="#7FE87F" />
              <span>Sarie Rail</span>
            </div>
          </div>

          {/* Amount Display */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div className="tabular-nums" style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              {showTotalBalance ? formatCurrency(totalBalance) : 'SAR ••••••••'}
            </div>

            <button
              onClick={handleCheckBalanceClick}
              className="interactive-tap"
              style={{
                backgroundColor: '#1E1E32',
                border: '1px solid #2C2C44',
                color: '#7FE87F',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '11.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: 'none',
              }}
            >
              Breakdown
            </button>
          </div>
        </div>
      </div>

      {/* 3. Primary Quick Actions: Transfer & Pay */}
      <div style={{ padding: '14px 20px 0 20px' }}>
        <div
          style={{
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '18px',
            padding: '18px 16px',
            boxShadow: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>
              Transfer & Pay
            </h3>
            <span style={{ fontSize: '11px', color: '#7FE87F', fontWeight: 700 }}>
              Zero Fees
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {/* Scan QR */}
            <div
              onClick={() => setIsScanModalOpen(true)}
              className="interactive-tap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}
              >
                <Camera size={22} color="#7FE87F" />
              </div>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>
                Scan QR
              </span>
            </div>

            {/* Send Money */}
            <div
              onClick={() => navigateTo('PAY_ANYONE')}
              className="interactive-tap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}
              >
                <Send size={22} color="#7FE87F" />
              </div>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>
                Send Money
              </span>
            </div>

            {/* Receive */}
            <div
              onClick={() => navigateTo('RECEIVE')}
              className="interactive-tap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}
              >
                <QrCode size={22} color="#7FE87F" />
              </div>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>
                Receive
              </span>
            </div>

            {/* Bank Accounts */}
            <div
              onClick={() => navigateTo('BANK_ACCOUNTS')}
              className="interactive-tap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}
              >
                <Landmark size={22} color="#7FE87F" />
              </div>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>
                Accounts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. My Linked Saudi Bank Accounts Carousel */}
      {bankAccounts.length > 0 && (
        <div style={{ marginTop: '18px' }}>
          <BankCardCarousel banks={bankAccounts} />
        </div>
      )}

      {/* 5. Promotional Hero Banner */}
      <QPayHeroBanner />

      {/* 6. SADAD Bills & Public Utilities */}
      <div style={{ padding: '14px 20px 0 20px' }}>
        <div
          style={{
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '18px',
            padding: '18px 16px',
            boxShadow: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>
                SADAD Utilities & Services
              </h3>
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 800,
                  backgroundColor: 'rgba(127, 232, 127, 0.12)',
                  color: '#7FE87F',
                  border: '1px solid rgba(127, 232, 127, 0.25)',
                  padding: '2px 6px',
                  borderRadius: '6px',
                }}
              >
                SADAD
              </span>
            </div>

            <button
              onClick={() => navigateTo('ALL_SERVICES')}
              className="interactive-tap"
              style={{
                backgroundColor: '#1E1E32',
                border: '1px solid #2C2C44',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#7FE87F',
                cursor: 'pointer',
                boxShadow: 'none',
              }}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {/* Electricity (SEC) */}
            <div
              onClick={() => navigateTo('ELECTRICITY')}
              className="interactive-tap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}
              >
                <Zap size={22} color="#7FE87F" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>
                Electricity
              </span>
            </div>

            {/* Telecom (STC/Mobily/Zain) */}
            <div
              onClick={() => navigateTo('ALL_SERVICES')}
              className="interactive-tap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}
              >
                <Smartphone size={22} color="#7FE87F" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>
                Telecom
              </span>
            </div>

            {/* Water (NWC) */}
            <div
              onClick={() => navigateTo('ALL_SERVICES')}
              className="interactive-tap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}
              >
                <Droplets size={22} color="#7FE87F" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>
                Water
              </span>
            </div>

            {/* Traffic Fines (Absher) */}
            <div
              onClick={() => navigateTo('ALL_SERVICES')}
              className="interactive-tap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}
              >
                <Car size={22} color="#7FE87F" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center' }}>
                Traffic Fines
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Recent Activity Section */}
      <div style={{ padding: '20px 20px 0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Recent Activity
          </h3>
          <button
            onClick={() => navigateTo('HISTORY')}
            style={{
              background: 'none',
              border: 'none',
              color: '#7FE87F',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              boxShadow: 'none',
              padding: 0,
            }}
          >
            View All <ChevronRight size={14} />
          </button>
        </div>

        {recentTransactions.map((txn) => (
          <TransactionRow key={txn.id} transaction={txn} onClick={() => navigateTo('HISTORY')} />
        ))}
      </div>

      {/* 8. Trust & Regulatory Dock (Payment Partner & SAMA) */}
      <div style={{ padding: '14px 20px 0 20px' }}>
        <div
          style={{
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '18px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'none',
          }}
        >
          <div>
            <div style={{ fontSize: '10px', color: '#7FE87F', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
              Official Payment Partner
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF' }}>
              Secured by SAMA National Banking Rail
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

      {/* 9. Verified Sarie Balance Modal Sheet */}
      <BalanceSummaryModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        bankAccounts={bankAccounts}
        totalBalance={totalBalance}
        onManageAccounts={() => navigateTo('BANK_ACCOUNTS')}
      />
    </div>
  );
};
