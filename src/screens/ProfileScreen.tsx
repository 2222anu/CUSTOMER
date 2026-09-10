import React, { useState } from 'react';
import {
  Grid,
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
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ListRow } from '../components/ListRow';
import { QtPayLogo } from '../components/QtPayLogo';
import { useApp } from '../state/AppContext';
import { EditProfileModal } from './EditProfileModal';

export const ProfileScreen: React.FC = () => {
  const { user, language, navigateTo, setIsLanguageModalOpen, setIsLogoutModalOpen, setIsAppLinksModalOpen } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="fade-in">
      <AppHeader title="Profile" showSettings={false} />

      {/* User Header Profile Summary with QTPay Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 20px 24px 20px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: '#F98513',
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            boxShadow: '0 0 25px rgba(249, 133, 19, 0.45)',
          }}
        >
          {user.avatarInitials}
          <button
            onClick={() => setIsEditModalOpen(true)}
            style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: '#111144',
              border: '2px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
            title="Edit Profile"
          >
            <Edit3 size={13} />
          </button>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111144', margin: 0 }}>{user.name}</h2>
        <div style={{ fontSize: '13px', color: '#F98513', fontWeight: '600', marginTop: '2px', marginBottom: '8px' }}>
          {user.upiId}
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '20px',
            backgroundColor: '#FDE8D7',
            border: '1px solid #F98513',
            color: '#F98513',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          <Edit3 size={13} />
          Edit Profile
        </button>

        <QtPayLogo variant="horizontal" showTagline={false} />
      </div>

      {/* Profile / Service Menu */}
      <div style={{ padding: '0 20px', marginBottom: '30px' }}>
        <ListRow icon={<Edit3 size={18} />} label="Edit Profile Details" subLabel={`${user.name} • ${user.mobile}`} onClick={() => setIsEditModalOpen(true)} />
        <ListRow icon={<Grid size={18} />} label="All Services" onClick={() => navigateTo('ALL_SERVICES')} />
        <ListRow icon={<Globe size={18} />} label="Web, Android & iOS Apps" subLabel="Downloads & Links" onClick={() => setIsAppLinksModalOpen(true)} />
        <ListRow icon={<Download size={18} />} label="Money Requests" onClick={() => navigateTo('MONEY_REQUESTS')} />
        <ListRow icon={<Landmark size={18} />} label="Bank Accounts" onClick={() => navigateTo('BANK_ACCOUNTS')} />
        <ListRow icon={<Zap size={18} />} label="UPI Settings" onClick={() => navigateTo('UPI_SETTINGS')} />
        <ListRow icon={<CreditCard size={18} />} label="Payment Methods" onClick={() => navigateTo('PAYMENT_METHODS')} />

        <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '20px 0 10px 0' }}>
          Lifestyle & Offers
        </div>
        <ListRow icon={<ShoppingBag size={18} />} label="Shopping Deals" onClick={() => navigateTo('SHOPPING')} />
        <ListRow icon={<MessageSquare size={18} />} label="Messages & Alerts" onClick={() => navigateTo('MESSAGES')} />
        <ListRow icon={<Plane size={18} />} label="Travel Bookings" onClick={() => navigateTo('TRAVEL')} />
        <ListRow icon={<Gift size={18} />} label="Rewards & Points" onClick={() => navigateTo('REWARDS')} />
        <ListRow icon={<Utensils size={18} />} label="Food & Dining" onClick={() => navigateTo('FOOD')} />

        <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '20px 0 10px 0' }}>
          Settings & Support
        </div>
        <ListRow icon={<ShieldCheck size={18} />} label="Security" onClick={() => navigateTo('SECURITY')} />
        <ListRow icon={<Bell size={18} />} label="Notifications" onClick={() => navigateTo('NOTIFICATIONS')} />
        <ListRow icon={<Globe size={18} />} label="Language" subLabel={language} onClick={() => setIsLanguageModalOpen(true)} />
        <ListRow icon={<HelpCircle size={18} />} label="Help & Support" onClick={() => navigateTo('HELP_SUPPORT')} />
        <ListRow icon={<Lock size={18} />} label="Privacy" onClick={() => navigateTo('PRIVACY')} />
        <ListRow icon={<LogOut size={18} />} label="Log Out" onClick={() => setIsLogoutModalOpen(true)} danger />
      </div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
};
