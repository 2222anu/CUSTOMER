import React, { useState } from 'react';
import {
  Bell,
  Eye,
  EyeOff,
  Camera,
  Send,
  Download,
  FileText,
  Zap,
  Smartphone,
  Tv,
  Car,
  ChevronRight,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BankCardCarousel } from '../components/BankCardCarousel';
import { TransactionRow } from '../components/TransactionRow';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';

export const HomeScreen: React.FC = () => {
  const { bankAccounts, transactions, navigateTo, setIsScanModalOpen, openPinModal } = useApp();
  const [showTotalBalance, setShowTotalBalance] = useState(false);

  const totalBalance = bankAccounts.reduce((acc, bank) => acc + bank.balance, 0);
  const recentTransactions = transactions.slice(0, 3);

  const handleTotalBalanceEyeClick = () => {
    if (showTotalBalance) {
      setShowTotalBalance(false);
    } else {
      openPinModal({
        title: 'Check Total Available Balance',
        subTitle: 'Verify 4-digit UPI PIN to view balance',
        amount: totalBalance,
        onSuccess: () => setShowTotalBalance(true),
      });
    }
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '20px' }}>
      {/* 1. White Header with Centered Official Logo */}
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
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: 'none',
              color: '#0f172a',
            }}
          >
            <Bell size={18} color="#0f172a" />
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#2e83ff',
              }}
            />
          </button>
        }
      />

      {/* 2. Total Available Balance Hero Card (MobiKwik Blue Banner, 8px Radius) */}
      <div
        style={{
          margin: '16px 20px 16px 20px',
          backgroundColor: '#2e83ff',
          borderRadius: '8px',
          padding: '18px',
          color: '#ffffff',
          boxShadow: 'none',
          border: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            QTPay Wallet & Balance
          </span>
          <button
            onClick={handleTotalBalanceEyeClick}
            title="Click to enter UPI PIN and view balance"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
            }}
          >
            {showTotalBalance ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div style={{ fontSize: '28px', fontWeight: '900', margin: '12px 0 18px 0', letterSpacing: '0.02em', color: '#ffffff' }}>
          {showTotalBalance ? formatCurrency(totalBalance) : '₹ •••••••••'}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)' }}>
            Linked Accounts: {bankAccounts.length}
          </span>
          <button
            onClick={() => navigateTo('BANK_ACCOUNTS')}
            style={{
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              color: '#2e83ff',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: 'none',
            }}
          >
            View Accounts
          </button>
        </div>
      </div>

      {/* 3. My Bank Accounts Carousel */}
      {bankAccounts.length > 0 && <BankCardCarousel banks={bankAccounts} />}

      {/* 4. Quick Actions Container Card (0 Shadows, MobiKwik Style) */}
      <div
        style={{
          margin: '0 20px 20px 20px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '18px',
          boxShadow: 'none',
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
          Transfer & Pay
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '8px' }}>
          {/* Scan & Pay */}
          <div
            onClick={() => setIsScanModalOpen(true)}
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
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #d6e6ff',
              }}
            >
              <Camera size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>
              Scan & Pay
            </span>
          </div>

          {/* Send Money */}
          <div
            onClick={() => navigateTo('PAY_ANYONE')}
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
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #d6e6ff',
              }}
            >
              <Send size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>
              Send Money
            </span>
          </div>

          {/* Request */}
          <div
            onClick={() => navigateTo('REQUEST_MONEY')}
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
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #d6e6ff',
              }}
            >
              <Download size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>
              Request
            </span>
          </div>

          {/* Pay Bills */}
          <div
            onClick={() => navigateTo('ALL_SERVICES')}
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
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #d6e6ff',
              }}
            >
              <FileText size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>
              Pay Bills
            </span>
          </div>
        </div>
      </div>

      {/* 5. BBPS Services Container Card (0 Shadows) */}
      <div
        style={{
          margin: '0 20px 20px 20px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '18px',
          boxShadow: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Recharge & Utilities</h3>
          <button
            onClick={() => navigateTo('ALL_SERVICES')}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #2e83ff',
              borderRadius: '8px',
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: '800',
              color: '#2e83ff',
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
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              <Zap size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>
              Electricity
            </span>
          </div>

          {/* Mobile */}
          <div
            onClick={() => navigateTo('ALL_SERVICES')}
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
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              <Smartphone size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>
              Mobile
            </span>
          </div>

          {/* DTH */}
          <div
            onClick={() => navigateTo('ALL_SERVICES')}
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
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              <Tv size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>
              DTH
            </span>
          </div>

          {/* FASTag */}
          <div
            onClick={() => navigateTo('ALL_SERVICES')}
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
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#eef5ff',
                color: '#2e83ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              <Car size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>
              FASTag
            </span>
          </div>
        </div>
      </div>

      {/* 6. Recent Transactions Section */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Recent Activity</h3>
          <button
            onClick={() => navigateTo('HISTORY')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2e83ff',
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
    </div>
  );
};
