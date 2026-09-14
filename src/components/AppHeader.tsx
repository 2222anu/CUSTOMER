import React from 'react';
import { ArrowLeft, Search, Settings } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { AlphPayLogo } from './AlphPayLogo';
import { designSystem } from '../design-system';

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
  const { user, goBack, navigateTo, currentScreen } = useApp();

  const handleBack = () => {
    if (onBack) onBack();
    else goBack();
  };

  const handleAvatarClick = () => {
    if (currentScreen === 'PROFILE') {
      navigateTo('HOME');
    } else {
      navigateTo('PROFILE');
    }
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        backgroundColor: 'rgba(11, 11, 20, 0.96)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        borderBottom: `1px solid ${designSystem.colors.borderHairline}`,
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
              backgroundColor: '#151524',
              border: `1px solid ${designSystem.colors.borderHairline}`,
              color: '#FFFFFF',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'background-color 0.15s ease, transform 0.1s ease',
            }}
          >
            <ArrowLeft size={18} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              onClick={handleAvatarClick}
              role="button"
              tabIndex={0}
              aria-label={currentScreen === 'PROFILE' ? 'Go to home' : 'View user profile'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#7FE87F',
                color: '#000000',
                fontWeight: '800',
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'none',
                overflow: 'hidden',
                border: '2px solid #0B0B14',
                outline: '1.5px solid #7FE87F',
                transition: 'transform 0.15s ease',
              }}
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                user.avatarInitials
              )}
            </div>
            {showUserInfo && (
              <div style={{ marginLeft: '10px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#FFFFFF', display: 'block', lineHeight: '16px' }}>
                  {user.name}
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#7FE87F' }}>
                  Verified
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center Slot: Official AlphPay Logo or Page Title */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 8px' }}>
        {title ? (
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#FFFFFF', margin: 0, textAlign: 'center', letterSpacing: '-0.01em' }}>
            {title}
          </h2>
        ) : (
          <div onClick={() => navigateTo('HOME')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <AlphPayLogo variant="header" size={24} themeMode="dark" />
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
              backgroundColor: '#151524',
              border: `1px solid ${designSystem.colors.borderHairline}`,
              color: '#FFFFFF',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'background-color 0.15s ease',
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
              backgroundColor: '#151524',
              border: `1px solid ${designSystem.colors.borderHairline}`,
              color: '#FFFFFF',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'background-color 0.15s ease',
            }}
          >
            <Settings size={18} />
          </button>
        )}
      </div>
    </header>
  );
};

