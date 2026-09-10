import React, { useState } from 'react';
import { LogOut, CheckCircle2 } from 'lucide-react';
import { BottomSheet } from '../components/BottomSheet';
import { useApp } from '../state/AppContext';

export const LogoutModal: React.FC = () => {
  const { isLogoutModalOpen, setIsLogoutModalOpen, performLogout } = useApp();
  const [isLoggedOutSuccess, setIsLoggedOutSuccess] = useState(false);

  const handleConfirmLogout = () => {
    setIsLoggedOutSuccess(true);
    setTimeout(() => {
      setIsLoggedOutSuccess(false);
      performLogout();
    }, 1400);
  };

  return (
    <BottomSheet
      isOpen={isLogoutModalOpen}
      onClose={() => {
        if (!isLoggedOutSuccess) setIsLogoutModalOpen(false);
      }}
      title={isLoggedOutSuccess ? undefined : 'Log out'}
      themeMode="light"
    >
      {isLoggedOutSuccess ? (
        <div className="fade-in" style={{ textAlign: 'center', padding: '20px 0' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#FDE8D7',
              color: '#F98513',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              boxShadow: '0 4px 15px rgba(249, 133, 19, 0.4)',
            }}
          >
            <CheckCircle2 size={32} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111144' }}>
            Logged Out Successfully
          </h3>
          <p style={{ color: '#5C564D', fontSize: '13px', marginTop: '6px' }}>
            Returning to mobile registration screen...
          </p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '10px 0 20px 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FDE8D7',
              color: '#F98513',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
            }}
          >
            <LogOut size={26} />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#111144' }}>
            Confirm Logout
          </h3>
          <p style={{ color: '#5C564D', fontSize: '14px', marginBottom: '24px' }}>
            Are you sure you want to log out of QTPay? Your session will be safely cleared.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              style={{
                flex: 1,
                backgroundColor: '#F4F1EC',
                border: '1.5px solid #DAD1C8',
                borderRadius: '16px',
                padding: '16px',
                color: '#5C564D',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLogout}
              style={{
                flex: 1,
                backgroundColor: '#F98513',
                border: 'none',
                borderRadius: '16px',
                padding: '16px',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(249, 133, 19, 0.35)',
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};
