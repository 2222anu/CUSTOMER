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
  rightAction,
}) => {
  const { user, goBack, navigateTo, currentScreen, isRtl, t } = useApp();

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

  const displayTitle = title ? t(title, title) : undefined;
  const displayName = t(user.name, user.name);

  return (
    <header
      className="app-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'calc(10px + env(safe-area-inset-top, 0px)) 16px 10px 16px',
        backgroundColor: 'rgba(11, 11, 20, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: `1px solid ${designSystem.colors.borderHairline}`,
        boxShadow: 'none',
        minHeight: 'calc(56px + env(safe-area-inset-top, 0px))',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Left Slot: Back Button or User Avatar Icon (No text) */}
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 2, minWidth: '40px' }}>
        {showBack ? (
          <button
            onClick={handleBack}
            aria-label={t('btn.back', 'Go back')}
            className="interactive-tap"
            style={{
              backgroundColor: 'var(--color-surface, #111726)',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              color: '#FFFFFF',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'background-color 0.15s ease, transform 0.1s ease',
            }}
          >
            <ArrowLeft size={18} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
          </button>
        ) : (
          <div
            onClick={handleAvatarClick}
            role="button"
            tabIndex={0}
            aria-label={currentScreen === 'PROFILE' ? 'Go to home' : 'View user profile'}
            className="interactive-tap"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-green, #7FE87F)',
              color: 'var(--brand-green-ink, #080C14)',
              fontWeight: '800',
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
              overflow: 'hidden',
              border: '2px solid #080C14',
              transition: 'transform 0.15s ease',
              flexShrink: 0,
            }}
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user.avatarInitials
            )}
          </div>
        )}
      </div>

      {/* Exact Top Center Slot: Logo Wordmark or Page Title */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          maxWidth: 'calc(100% - 110px)',
        }}
      >
        {displayTitle ? (
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#FFFFFF',
              margin: 0,
              textAlign: 'center',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {displayTitle}
          </h2>
        ) : (
          <div onClick={() => navigateTo('HOME')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <AlphPayLogo variant="header" size={24} themeMode="dark" />
          </div>
        )}
      </div>

      {/* Right Slot: Search / Settings / Custom Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2, minWidth: '40px', justifyContent: 'flex-end' }}>
        {showSearch && (
          <button
            onClick={onSearchClick}
            aria-label="Search"
            className="interactive-tap"
            style={{
              backgroundColor: 'var(--color-surface, #111726)',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              color: '#FFFFFF',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
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
            aria-label="Settings"
            className="interactive-tap"
            style={{
              backgroundColor: 'var(--color-surface, #111726)',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              color: '#FFFFFF',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
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

