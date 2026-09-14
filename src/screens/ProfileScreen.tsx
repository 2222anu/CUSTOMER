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
  CheckCircle2,
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
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '36px' }}>
      <AppHeader title="Profile" showSettings={false} showBack={true} onBack={() => navigateTo('HOME')} />

      {/* User Header Profile Hero Card */}
      <div
        style={{
          margin: '16px 20px 24px 20px',
          backgroundColor: '#2A2A3E',
          border: '1px solid #4D4D6B',
          borderRadius: '20px',
          padding: '24px 20px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'none',
        }}
      >
        {/* Top Right Verified Pill */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(127, 232, 127, 0.15)',
            border: '1px solid #7FE87F',
            borderRadius: '20px',
            padding: '3px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: '#7FE87F',
          }}
        >
          <CheckCircle2 size={11} color="#7FE87F" /> KYC VERIFIED
        </div>

        {/* Avatar with Edit Badge */}
        <div style={{ position: 'relative', marginBottom: '14px', marginTop: '6px' }}>
          <div
            onClick={() => navigateTo('HOME')}
            role="button"
            tabIndex={0}
            aria-label="Go to Home"
            className="interactive-tap"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#3A3A52',
              color: '#7FE87F',
              fontWeight: '800',
              fontSize: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid #7FE87F',
              cursor: 'pointer',
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
            aria-label="Edit profile picture"
            className="interactive-tap"
            style={{
              position: 'absolute',
              bottom: '0',
              right: '-2px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#3A3A52',
              border: '1px solid #4D4D6B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7FE87F',
              cursor: 'pointer',
            }}
            title="Edit Profile"
          >
            <Edit3 size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* User Details */}
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>
          {user.name}
        </h2>
        <div style={{ fontSize: '12px', color: '#7FE87F', fontWeight: '700', marginTop: '4px', letterSpacing: '0.01em' }}>
          {user.upiId} &bull; {user.mobile}
        </div>
        <div style={{ fontSize: '11px', color: '#B3B3C2', fontWeight: '600', marginTop: '3px' }}>
          {user.email}
        </div>

        {/* Action Buttons: Edit Profile & My QR Code */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '18px', width: '100%', justifyContent: 'center' }}>
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            className="interactive-tap"
            style={{
              flex: 1,
              maxWidth: '150px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#7FE87F',
              border: 'none',
              color: '#000000',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            <Edit3 size={14} color="#000000" />
            Edit Profile
          </button>
          <button
            onClick={() => navigateTo('RECEIVE')}
            className="interactive-tap"
            style={{
              flex: 1,
              maxWidth: '150px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#3A3A52',
              border: '1px solid #4D4D6B',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            <QrCode size={14} color="#7FE87F" />
            My QR Code
          </button>
        </div>
      </div>

      {/* Menu Sections */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Payment & Banking */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#808099', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Payment & Accounts
          </div>
          <div style={{ backgroundColor: '#2A2A3E', border: '1px solid #4D4D6B', borderRadius: '16px', overflow: 'hidden', padding: '6px 6px 0 6px' }}>
            <ListRow icon={<Landmark size={18} color="#7FE87F" />} label="Bank Accounts" onClick={() => navigateTo('BANK_ACCOUNTS')} />
            <ListRow icon={<Zap size={18} color="#7FE87F" />} label="UPI Settings & PIN" onClick={() => navigateTo('UPI_SETTINGS')} />
            <ListRow icon={<CreditCard size={18} color="#7FE87F" />} label="Payment Methods & Cards" onClick={() => navigateTo('PAYMENT_METHODS')} />
          </div>
        </div>

        {/* Transactions & Money */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#808099', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Transfers & Requests
          </div>
          <div style={{ backgroundColor: '#2A2A3E', border: '1px solid #4D4D6B', borderRadius: '16px', overflow: 'hidden', padding: '6px 6px 0 6px' }}>
            <ListRow icon={<Download size={18} color="#7FE87F" />} label="Money Requests" onClick={() => navigateTo('MONEY_REQUESTS')} />
            <ListRow icon={<History size={18} color="#7FE87F" />} label="Transaction History" onClick={() => navigateTo('HISTORY')} />
            <ListRow icon={<QrCode size={18} color="#7FE87F" />} label="Receive Money / QR Code" onClick={() => navigateTo('RECEIVE')} />
          </div>
        </div>

        {/* Lifestyle & Offers */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#808099', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Lifestyle & Rewards
          </div>
          <div style={{ backgroundColor: '#2A2A3E', border: '1px solid #4D4D6B', borderRadius: '16px', overflow: 'hidden', padding: '6px 6px 0 6px' }}>
            <ListRow icon={<Gift size={18} color="#7FE87F" />} label="Rewards & Scratch Cards" onClick={() => navigateTo('REWARDS')} />
            <ListRow icon={<ShoppingBag size={18} color="#7FE87F" />} label="Shopping Deals & Offers" onClick={() => navigateTo('SHOPPING')} />
            <ListRow icon={<MessageSquare size={18} color="#7FE87F" />} label="Messages & Alerts" onClick={() => navigateTo('MESSAGES')} />
            <ListRow icon={<Plane size={18} color="#7FE87F" />} label="Travel Bookings" onClick={() => navigateTo('TRAVEL')} />
            <ListRow icon={<Utensils size={18} color="#7FE87F" />} label="Food & Dining" onClick={() => navigateTo('FOOD')} />
          </div>
        </div>

        {/* Security & System Settings */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#808099', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Settings & Security
          </div>
          <div style={{ backgroundColor: '#2A2A3E', border: '1px solid #4D4D6B', borderRadius: '16px', overflow: 'hidden', padding: '6px 6px 0 6px' }}>
            <ListRow icon={<ShieldCheck size={18} color="#7FE87F" />} label="Security & Active Devices" onClick={() => navigateTo('SECURITY')} />
            <ListRow icon={<Bell size={18} color="#7FE87F" />} label="Notifications & Alerts" onClick={() => navigateTo('NOTIFICATIONS')} />
            <ListRow
              icon={<Globe size={18} color="#7FE87F" />}
              label="App Language"
              rightElement={<span style={{ fontSize: '12px', fontWeight: 800, color: '#7FE87F' }}>{language}</span>}
              onClick={() => setIsLanguageModalOpen(true)}
            />
            <ListRow icon={<HelpCircle size={18} color="#7FE87F" />} label="Help & Support Center" onClick={() => navigateTo('HELP_SUPPORT')} />
            <ListRow icon={<Lock size={18} color="#7FE87F" />} label="Privacy Policy & Terms" onClick={() => navigateTo('PRIVACY')} />
          </div>
        </div>

        {/* Log Out */}
        <div>
          <div style={{ backgroundColor: '#2A2A3E', border: '1px solid #4D4D6B', borderRadius: '16px', overflow: 'hidden', padding: '6px 6px 0 6px' }}>
            <ListRow
              icon={<LogOut size={18} color="#FF4757" />}
              label="Log Out of alph pay"
              danger={true}
              onClick={() => setIsLogoutModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
