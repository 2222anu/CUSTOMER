import React from 'react';
import { ArrowLeft, Search, Settings } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { QtPayLogo } from './QtPayLogo';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  onSearchClick?: () => void;
  showSettings?: boolean;
  showUserInfo?: boolean;
  rightAction?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  showSearch = false,
  onSearchClick,
  showSettings = true,
  showUserInfo = false,
  rightAction,
}) => {
  const { user, goBack, navigateTo } = useApp();

  const handleBack = () => {
    if (onBack) onBack();
    else goBack();
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        borderBottom: '1px solid #e2e8f0',
        boxShadow: 'none',
      }}
    >
      {/* Left Slot: Back Button or User Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', minWidth: '40px' }}>
        {showBack ? (
          <button
            onClick={handleBack}
            aria-label="Go back"
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
            }}
          >
            <ArrowLeft size={18} />
          </button>
        ) : (
          <div
            onClick={() => navigateTo('PROFILE')}
            role="button"
            tabIndex={0}
            aria-label="View user profile"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#2e83ff',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
              overflow: 'hidden',
              border: '2px solid #ffffff',
            }}
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user.avatarInitials
            )}
          </div>
        )}
      </div>

      {/* Center Slot: Official Vector Logo or Page Title */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px' }}>
        {title ? (
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: 0, textAlign: 'center' }}>
            {title}
          </h2>
        ) : (
          <div onClick={() => navigateTo('HOME')} style={{ cursor: 'pointer' }}>
            <QtPayLogo variant="header" size={26} themeMode="light" />
          </div>
        )}
      </div>

      {/* Right Slot: Search / Settings / Custom Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '40px', justifyContent: 'flex-end' }}>
        {showSearch && (
          <button
            onClick={onSearchClick}
            aria-label="Search"
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
            }}
          >
            <Search size={18} />
          </button>
        )}

        {rightAction}

        {showSettings && !rightAction && (
          <button
            onClick={() => navigateTo('UPI_SETTINGS')}
            aria-label="UPI Settings"
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
            }}
          >
            <Settings size={18} />
          </button>
        )}
      </div>
    </header>
  );
};
