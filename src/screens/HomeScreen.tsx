import React, { useState } from 'react';
import {
  Bell,
  Camera,
  Send,
  QrCode,
  Zap,
  Smartphone,
  Tv,
  Car,
  ChevronRight,
  Landmark,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { QPayHeroBanner } from '../components/QPayHeroBanner';
import { PWAInstallPrompt } from '../components/PWAInstallPrompt';
import { BankCardCarousel } from '../components/BankCardCarousel';
import { BalanceSummaryModal } from '../components/BalanceSummaryModal';
import { TransactionRow } from '../components/TransactionRow';
import { useApp } from '../state/AppContext';

export const HomeScreen: React.FC = () => {
  const { bankAccounts, transactions, navigateTo, setIsScanModalOpen, openPinModal } = useApp();
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);

  const totalBalance = bankAccounts.reduce((acc, bank) => acc + bank.balance, 0);
  const recentTransactions = transactions.slice(0, 3);

  const handleCheckBalanceClick = () => {
    openPinModal({
      title: 'Check Bank Balance',
      subTitle: 'Enter 4-digit UPI PIN to view account balance',
      amount: totalBalance,
      onSuccess: () => {
        setIsBalanceModalOpen(true);
      },
    });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '24px', color: '#FFFFFF' }}>
      {/* App Header with Profile & Notifications */}
      <AppHeader
        showUserInfo
        showSettings={false}
        rightAction={
          <button
            onClick={() => navigateTo('NOTIFICATIONS')}
            aria-label="Notifications"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#2A2A3E',
              border: '1px solid #4D4D6B',
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
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#7FE87F',
              }}
            />
          </button>
        }
      />

      {/* Promotional Hero Banner */}
      <QPayHeroBanner />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* My Bank Accounts Carousel */}
      {bankAccounts.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <BankCardCarousel banks={bankAccounts} />
        </div>
      )}

      {/* Quick Actions Container Card */}
      <div
        style={{
          margin: '0 20px 20px 20px',
          backgroundColor: '#2A2A3E',
          border: '1px solid #4D4D6B',
          borderRadius: '16px',
          padding: '20px 18px',
          boxShadow: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.01em', margin: 0 }}>
            Transfer & Pay
          </h3>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#7FE87F', backgroundColor: 'rgba(127, 232, 127, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(127, 232, 127, 0.3)' }}>
            Instant UPI
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '8px' }}>
          {/* Scan & Pay */}
          <div
            onClick={() => setIsScanModalOpen(true)}
            className="interactive-tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #4D4D6B',
              }}
            >
              <Camera size={22} color="#7FE87F" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', textAlign: 'center', letterSpacing: '-0.01em' }}>
              Scan & Pay
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
              flex: 1,
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #4D4D6B',
              }}
            >
              <Send size={22} color="#7FE87F" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', textAlign: 'center', letterSpacing: '-0.01em' }}>
              Send Money
            </span>
          </div>

          {/* Receive Money */}
          <div
            onClick={() => navigateTo('RECEIVE')}
            className="interactive-tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #4D4D6B',
              }}
            >
              <QrCode size={22} color="#7FE87F" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', textAlign: 'center', letterSpacing: '-0.01em' }}>
              Receive
            </span>
          </div>

          {/* Check Balance */}
          <div
            onClick={handleCheckBalanceClick}
            className="interactive-tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #4D4D6B',
              }}
            >
              <Landmark size={22} color="#7FE87F" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', textAlign: 'center', letterSpacing: '-0.01em' }}>
              Check Balance
            </span>
          </div>
        </div>
      </div>

      {/* BBPS Services Container Card */}
      <div
        style={{
          margin: '0 20px 20px 20px',
          backgroundColor: '#2A2A3E',
          border: '1px solid #4D4D6B',
          borderRadius: '16px',
          padding: '20px 18px',
          boxShadow: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.01em', margin: 0 }}>
            Recharge & Utilities
          </h3>
          <button
            onClick={() => navigateTo('ALL_SERVICES')}
            className="interactive-tap"
            style={{
              backgroundColor: '#3A3A52',
              border: '1px solid #4D4D6B',
              borderRadius: '8px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: '800',
              color: '#7FE87F',
              cursor: 'pointer',
              boxShadow: 'none',
            }}
          >
            View All
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '8px' }}>
          {/* Electricity */}
          <div
            onClick={() => navigateTo('ELECTRICITY')}
            className="interactive-tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #4D4D6B',
              }}
            >
              <Zap size={22} color="#7FE87F" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', textAlign: 'center' }}>
              Electricity
            </span>
          </div>

          {/* Mobile */}
          <div
            onClick={() => navigateTo('ALL_SERVICES')}
            className="interactive-tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #4D4D6B',
              }}
            >
              <Smartphone size={22} color="#7FE87F" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', textAlign: 'center' }}>
              Mobile
            </span>
          </div>

          {/* DTH */}
          <div
            onClick={() => navigateTo('ALL_SERVICES')}
            className="interactive-tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #4D4D6B',
              }}
            >
              <Tv size={22} color="#7FE87F" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', textAlign: 'center' }}>
              DTH
            </span>
          </div>

          {/* FASTag */}
          <div
            onClick={() => navigateTo('ALL_SERVICES')}
            className="interactive-tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: '#3A3A52',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #4D4D6B',
              }}
            >
              <Car size={22} color="#7FE87F" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', textAlign: 'center' }}>
              FASTag
            </span>
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>Recent Activity</h3>
          <button
            onClick={() => navigateTo('HISTORY')}
            style={{
              background: 'none',
              border: 'none',
              color: '#7FE87F',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              boxShadow: 'none',
            }}
          >
            View All <ChevronRight size={14} />
          </button>
        </div>

        {recentTransactions.map((txn) => (
          <TransactionRow key={txn.id} transaction={txn} onClick={() => navigateTo('HISTORY')} />
        ))}
      </div>

      {/* Verified UPI Balance Modal Sheet */}
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
