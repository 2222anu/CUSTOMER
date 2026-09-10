import React from 'react';
import { ArrowLeft, Search, Settings } from 'lucide-react';
import { useApp } from '../state/AppContext';

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
        padding: '16px 20px',
        background: '#F4F1EC',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        borderBottom: '1.5px solid #DAD1C8',
      }}
    >
      {showUserInfo ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            onClick={() => navigateTo('PROFILE')}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#F98513',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(249, 133, 19, 0.35)',
            }}
          >
            {user.avatarInitials}
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '16px', color: '#111144' }}>{user.name}</div>
            <div style={{ fontSize: '12px', color: '#F98513', fontWeight: '700' }}>{user.upiId}</div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {showBack && (
            <button
              onClick={handleBack}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #DAD1C8',
                color: '#111144',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={18} />
            </button>
          )}
          {title && <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#111144' }}>{title}</h2>}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {showSearch && (
          <button
            onClick={onSearchClick}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #DAD1C8',
              color: '#111144',
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
        )}

        {rightAction}

        {showSettings && !rightAction && (
          <button
            onClick={() => navigateTo('UPI_SETTINGS')}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #DAD1C8',
              color: '#111144',
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
        )}
      </div>
    </header>
  );
};
