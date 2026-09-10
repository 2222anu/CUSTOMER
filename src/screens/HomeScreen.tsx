import React from 'react';
import {
  Send,
  Download,
  Scan,
  ArrowUpRight,
  Zap,
  Droplets,
  Flame,
  Globe,
  Smartphone,
  PhoneCall,
  Tv,
  ShoppingBag,
  MessageSquare,
  Plane,
  Gift,
  Utensils,
  ChevronRight,
  Search,
  Settings,
} from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { BankCardCarousel } from '../components/BankCardCarousel';
import { QuickAction } from '../components/QuickAction';
import { ServiceCard } from '../components/ServiceCard';
import { TransactionRow } from '../components/TransactionRow';
import { useApp } from '../state/AppContext';

export const HomeScreen: React.FC = () => {
  const { user, bankAccounts, transactions, navigateTo, setIsScanModalOpen, setIsAppLinksModalOpen } = useApp();

  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="fade-in">
      {/* Header with QTPay Logo */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: '#111144',
          position: 'sticky',
          top: 0,
          zIndex: 20,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            onClick={() => navigateTo('PROFILE')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#F98513',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 14px rgba(249, 133, 19, 0.45)',
            }}
          >
            {user.avatarInitials}
          </div>
          <QtPayLogo variant="header" showTagline={false} themeMode="dark" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsAppLinksModalOpen(true)}
            title="Web / Android / iOS App Downloads"
            style={{
              background: '#F98513',
              border: 'none',
              color: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(249, 133, 19, 0.35)',
            }}
          >
            <Globe size={15} /> App Links
          </button>
          <button
            onClick={() => navigateTo('PAY_ANYONE')}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Search size={18} />
          </button>
          <button
            onClick={() => navigateTo('UPI_SETTINGS')}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Same-Sized Bank Accounts Horizontal Carousel */}
      {bankAccounts.length > 0 && <BankCardCarousel banks={bankAccounts} />}

      {/* Quick Actions Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0 20px',
          marginBottom: '24px',
        }}
      >
        <QuickAction
          label="SEND"
          icon={<Send size={22} />}
          onClick={() => navigateTo('PAY_ANYONE')}
        />
        <QuickAction
          label="RECEIVE"
          icon={<Download size={22} />}
          onClick={() => navigateTo('RECEIVE')}
        />
        <QuickAction
          label="SCAN"
          icon={<Scan size={24} />}
          onClick={() => setIsScanModalOpen(true)}
          highlighted
        />
        <QuickAction
          label="REQUEST"
          icon={<ArrowUpRight size={22} />}
          onClick={() => navigateTo('REQUEST_MONEY')}
        />
      </div>

      {/* Bill Payments Section */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#111144' }}>Bill Payments</h3>
          <button
            onClick={() => navigateTo('ALL_SERVICES')}
            style={{
              background: 'none',
              border: 'none',
              color: '#F98513',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            View All <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          <ServiceCard label="Electricity" icon={<Zap size={20} />} onClick={() => navigateTo('ELECTRICITY')} />
          <ServiceCard label="Water" icon={<Droplets size={20} />} onClick={() => navigateTo('ALL_SERVICES')} />
          <ServiceCard label="Petrol Gas" icon={<Flame size={20} />} onClick={() => navigateTo('ALL_SERVICES')} />
          <ServiceCard label="LPG Cylinder" icon={<Flame size={20} />} onClick={() => navigateTo('ALL_SERVICES')} />
          <ServiceCard label="Mobile" icon={<Smartphone size={20} />} onClick={() => navigateTo('ALL_SERVICES')} />
          <ServiceCard label="Postpaid" icon={<PhoneCall size={20} />} onClick={() => navigateTo('ALL_SERVICES')} />
          <ServiceCard label="Broadband" icon={<Globe size={20} />} onClick={() => navigateTo('ALL_SERVICES')} />
          <ServiceCard label="Landline" icon={<Tv size={20} />} onClick={() => navigateTo('ALL_SERVICES')} />
        </div>
      </div>

      {/* Explore & Lifestyle Section */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0B1F3A' }}>Explore & Lifestyle</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
          <ServiceCard
            label="Shopping"
            icon={<ShoppingBag size={20} />}
            onClick={() => navigateTo('SHOPPING')}
            bgColor="#ECFDF5"
            iconBg="rgba(5, 150, 105, 0.2)"
            iconColor="#059669"
          />
          <ServiceCard
            label="Messages"
            icon={<MessageSquare size={20} />}
            onClick={() => navigateTo('MESSAGES')}
            bgColor="#FFFFFF"
            borderColor="#E2E8F0"
            iconBg="#EFF6FF"
            iconColor="#2563EB"
          />
          <ServiceCard
            label="Travel"
            icon={<Plane size={20} />}
            onClick={() => navigateTo('TRAVEL')}
            bgColor="#EFF6FF"
            iconBg="rgba(37, 99, 235, 0.15)"
            iconColor="#2563EB"
          />
          <ServiceCard
            label="Rewards"
            icon={<Gift size={20} />}
            onClick={() => navigateTo('REWARDS')}
            badge="New"
            bgColor="#ECFDF5"
            borderColor="rgba(5, 150, 105, 0.3)"
            iconBg="#059669"
            iconColor="#FFFFFF"
          />
          <ServiceCard
            label="Food"
            icon={<Utensils size={20} />}
            onClick={() => navigateTo('FOOD')}
            bgColor="#FFFFFF"
            borderColor="#E2E8F0"
            iconBg="rgba(5, 150, 105, 0.12)"
            iconColor="#059669"
          />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0B1F3A' }}>Recent Transactions</h3>
          <button
            onClick={() => navigateTo('HISTORY')}
            style={{
              background: 'none',
              border: 'none',
              color: '#059669',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
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
