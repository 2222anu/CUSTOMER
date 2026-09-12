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
    <div className="fade-in" style={{ backgroundColor: '#f4f6f8', minHeight: '100%', paddingBottom: '36px' }}>
      <AppHeader title="Profile" showSettings={false} showBack={true} onBack={() => navigateTo('HOME')} />

      {/* User Header Profile Hero Card */}
      <div
        style={{
          margin: '16px 20px 24px 20px',
          background: 'linear-gradient(145deg, #0e274d 0%, #0a1c36 100%)',
          border: '1.5px solid rgba(46, 131, 255, 0.35)',
          borderRadius: '20px',
          padding: '24px 20px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative glow ring */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46,131,255,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Avatar with Edit Badge */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <div
            onClick={() => navigateTo('HOME')}
            role="button"
            tabIndex={0}
            aria-label="Go to Home"
            className="interactive-tap"
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
              overflow: 'hidden',
              border: '3px solid rgba(255, 255, 255, 0.25)',
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
              backgroundColor: '#FFFFFF',
              border: '2px solid #0e274d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2e83ff',
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
        <div style={{ fontSize: '12px', color: '#82b5ff', fontWeight: '700', marginTop: '4px', letterSpacing: '0.01em' }}>
          {user.upiId} &bull; {user.mobile}
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', marginTop: '3px' }}>
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
              padding: '9px 14px',
              borderRadius: '12px',
              backgroundColor: '#2e83ff',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            <Edit3 size={14} />
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
              padding: '9px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
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
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Payment & Banking */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Payment & Accounts
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
            <ListRow icon={<Landmark size={18} color="#2e83ff" />} label="Bank Accounts" onClick={() => navigateTo('BANK_ACCOUNTS')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<Zap size={18} color="#2e83ff" />} label="UPI Settings & AutoPay" onClick={() => navigateTo('UPI_SETTINGS')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<CreditCard size={18} color="#2e83ff" />} label="Payment Methods & Cards" onClick={() => navigateTo('PAYMENT_METHODS')} />
          </div>
        </div>

        {/* Transactions & Money */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Transfers & Requests
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
            <ListRow icon={<Download size={18} color="#2e83ff" />} label="Money Requests" onClick={() => navigateTo('MONEY_REQUESTS')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<History size={18} color="#2e83ff" />} label="Transaction History" onClick={() => navigateTo('HISTORY')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<QrCode size={18} color="#2e83ff" />} label="Receive Money / QR Code" onClick={() => navigateTo('RECEIVE')} />
          </div>
        </div>

        {/* Lifestyle & Offers */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Lifestyle & Rewards
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
            <ListRow icon={<Gift size={18} color="#2e83ff" />} label="Rewards & Cashback" onClick={() => navigateTo('REWARDS')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<ShoppingBag size={18} color="#2e83ff" />} label="Shopping Deals" onClick={() => navigateTo('SHOPPING')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<MessageSquare size={18} color="#2e83ff" />} label="Messages & Alerts" onClick={() => navigateTo('MESSAGES')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<Plane size={18} color="#2e83ff" />} label="Travel Bookings" onClick={() => navigateTo('TRAVEL')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<Utensils size={18} color="#2e83ff" />} label="Food & Dining" onClick={() => navigateTo('FOOD')} />
          </div>
        </div>

        {/* Security & System Settings */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Settings & Security
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
            <ListRow icon={<ShieldCheck size={18} color="#2e83ff" />} label="Security & Biometrics" onClick={() => navigateTo('SECURITY')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<Bell size={18} color="#2e83ff" />} label="Notifications & Alerts" onClick={() => navigateTo('NOTIFICATIONS')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow
              icon={<Globe size={18} color="#2e83ff" />}
              label="App Language"
              rightElement={<span style={{ fontSize: '12px', fontWeight: 800, color: '#2e83ff' }}>{language}</span>}
              onClick={() => setIsLanguageModalOpen(true)}
            />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<HelpCircle size={18} color="#2e83ff" />} label="Help & Support" onClick={() => navigateTo('HELP_SUPPORT')} />
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0 16px' }} />
            <ListRow icon={<Lock size={18} color="#2e83ff" />} label="Privacy Policy & Terms" onClick={() => navigateTo('PRIVACY')} />
          </div>
        </div>

        {/* Log Out */}
        <div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #fee2e2', borderRadius: '16px', overflow: 'hidden' }}>
            <ListRow icon={<LogOut size={18} color="#DC2626" />} label="Log Out of QTPay" onClick={() => setIsLogoutModalOpen(true)} danger />
          </div>
        </div>
      </div>
    </div>
  );
};
