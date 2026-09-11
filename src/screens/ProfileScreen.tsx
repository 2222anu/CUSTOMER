import React from 'react';
import {
  Download,
  Landmark,
  Zap,
  CreditCard,
  ShieldCheck,
  Bell,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  ShoppingBag,
  MessageSquare,
  Plane,
  Gift,
  Utensils,
  Edit3,
  QrCode,
  History,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { useApp } from '../state/AppContext';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    language,
    navigateTo,
    setIsLanguageModalOpen,
    setIsLogoutModalOpen,
    setIsEditProfileModalOpen,
  } = useApp();

  return (
    <div className="fade-in" style={{ backgroundColor: '#eaf3ff', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Profile" showSettings={false} />

      {/* User Header Profile Hero Card */}
      <div
        style={{
          margin: '16px 20px 24px 20px',
          backgroundColor: '#0e274d',
          border: '1.5px solid #2e83ff',
          borderRadius: '24px',
          padding: '24px 20px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(14, 39, 77, 0.45), 0 0 15px rgba(46, 131, 255, 0.25)',
        }}
      >
        {/* Avatar with Edit Badge */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: user.avatarBgColor || '#2e83ff',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(46, 131, 255, 0.5)',
              overflow: 'hidden',
            }}
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user.avatarInitials
            )}
          </div>
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            style={{
              position: 'absolute',
              bottom: '0',
              right: '-2px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #0e274d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2e83ff',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
            title="Edit Profile"
          >
            <Edit3 size={14} />
          </button>
        </div>

        {/* User Details */}
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>{user.name}</h2>
        <div style={{ fontSize: '13px', color: '#2e83ff', fontWeight: '700', marginTop: '4px' }}>
          {user.upiId} &bull; {user.mobile}
        </div>
        <div style={{ fontSize: '12px', color: '#82b5ff', fontWeight: '600', marginTop: '3px' }}>
          📧 {user.email}
        </div>

        {/* Action Buttons: Edit Profile & My QR Code */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '18px', width: '100%', justifyContent: 'center' }}>
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            style={{
              flex: 1,
              maxWidth: '150px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '20px',
              backgroundColor: '#2e83ff',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(46, 131, 255, 0.35)',
            }}
          >
            <Edit3 size={14} />
            Edit Profile
          </button>
          <button
            onClick={() => navigateTo('RECEIVE')}
            style={{
              flex: 1,
              maxWidth: '150px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            <QrCode size={14} />
            My QR Code
          </button>
        </div>
      </div>

      {/* Menu Sections */}
      <div style={{ padding: '0 20px', marginBottom: '30px' }}>
        {/* Payment & Banking */}
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#1c4f99', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', marginLeft: '4px' }}>
          Payment & Accounts
        </div>
        <ListRow icon={<Landmark size={18} color="#2e83ff" />} label="Bank Accounts" subLabel="Manage linked bank accounts & balances" onClick={() => navigateTo('BANK_ACCOUNTS')} />
        <ListRow icon={<Zap size={18} color="#2e83ff" />} label="UPI Settings & AutoPay" subLabel="Change UPI PIN, manage mandates" onClick={() => navigateTo('UPI_SETTINGS')} />
        <ListRow icon={<CreditCard size={18} color="#2e83ff" />} label="Payment Methods & Cards" subLabel="Saved credit & debit cards" onClick={() => navigateTo('PAYMENT_METHODS')} />

        {/* Transactions & Money */}
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#1c4f99', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '22px 0 10px 4px' }}>
          Transfers & Requests
        </div>
        <ListRow icon={<Download size={18} color="#2e83ff" />} label="Money Requests" subLabel="Pending payment requests from contacts" onClick={() => navigateTo('MONEY_REQUESTS')} />
        <ListRow icon={<History size={18} color="#2e83ff" />} label="Transaction History" subLabel="View all past statements & receipts" onClick={() => navigateTo('HISTORY')} />
        <ListRow icon={<QrCode size={18} color="#2e83ff" />} label="Receive Money / QR Code" subLabel="Share QR code or UPI ID to get paid" onClick={() => navigateTo('RECEIVE')} />

        {/* Lifestyle & Offers */}
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#1c4f99', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '22px 0 10px 4px' }}>
          Lifestyle & Rewards
        </div>
        <ListRow icon={<ShoppingBag size={18} color="#174280" />} label="Shopping Deals" onClick={() => navigateTo('SHOPPING')} />
        <ListRow icon={<MessageSquare size={18} color="#174280" />} label="Messages & Alerts" onClick={() => navigateTo('MESSAGES')} />
        <ListRow icon={<Plane size={18} color="#174280" />} label="Travel Bookings" onClick={() => navigateTo('TRAVEL')} />
        <ListRow icon={<Gift size={18} color="#2e83ff" />} label="Rewards & Cashback" onClick={() => navigateTo('REWARDS')} />
        <ListRow icon={<Utensils size={18} color="#174280" />} label="Food & Dining" onClick={() => navigateTo('FOOD')} />

        {/* Security & System Settings */}
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#1c4f99', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '22px 0 10px 4px' }}>
          Settings & Security
        </div>
        <ListRow icon={<ShieldCheck size={18} color="#2e83ff" />} label="Security & Biometrics" subLabel="Screen lock, active sessions" onClick={() => navigateTo('SECURITY')} />
        <ListRow icon={<Bell size={18} color="#2e83ff" />} label="Notifications & Alerts" onClick={() => navigateTo('NOTIFICATIONS')} />
        <ListRow icon={<Globe size={18} color="#2e83ff" />} label="App Language" subLabel={`Current: ${language}`} onClick={() => setIsLanguageModalOpen(true)} />
        <ListRow icon={<HelpCircle size={18} color="#2e83ff" />} label="Help & Support" subLabel="24/7 customer care & FAQs" onClick={() => navigateTo('HELP_SUPPORT')} />
        <ListRow icon={<Lock size={18} color="#2e83ff" />} label="Privacy Policy & Terms" onClick={() => navigateTo('PRIVACY')} />

        {/* Log Out */}
        <div style={{ marginTop: '24px' }}>
          <ListRow icon={<LogOut size={18} color="#DC2626" />} label="Log Out of QTPay" onClick={() => setIsLogoutModalOpen(true)} danger />
        </div>
      </div>
    </div>
  );
};
