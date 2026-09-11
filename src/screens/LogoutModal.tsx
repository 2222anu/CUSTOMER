import React, { useState } from 'react';
import { LogOut, CheckCircle2 } from 'lucide-react';
import { BottomSheet } from '../components/BottomSheet';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

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
              borderRadius: designSystem.radii.full,
              backgroundColor: designSystem.colors.primaryLight,
              color: designSystem.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              boxShadow: designSystem.shadows.none,
              border: `2px solid ${designSystem.colors.primary}`,
            }}
          >
            <CheckCircle2 size={32} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary }}>
            Logged Out Successfully
          </h3>
          <p style={{ color: designSystem.colors.textSecondary, fontSize: '13px', marginTop: '6px' }}>
            Returning to mobile registration screen...
          </p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '10px 0 20px 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: designSystem.radii.full,
              backgroundColor: designSystem.colors.primaryLight,
              color: designSystem.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              border: `1px solid ${designSystem.colors.borderHairline}`,
            }}
          >
            <LogOut size={26} />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: designSystem.typography.weights.extrabold, marginBottom: '8px', color: designSystem.colors.textPrimary }}>
            Confirm Logout
          </h3>
          <p style={{ color: designSystem.colors.textSecondary, fontSize: '14px', marginBottom: '24px' }}>
            Are you sure you want to log out of QTPay? Your session will be safely cleared.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              style={{
                flex: 1,
                backgroundColor: designSystem.colors.surface,
                border: `1px solid ${designSystem.colors.borderStrong}`,
                borderRadius: designSystem.radii.md,
                padding: '14px',
                color: designSystem.colors.textSecondary,
                fontWeight: designSystem.typography.weights.bold,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: designSystem.shadows.none,
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLogout}
              style={{
                flex: 1,
                backgroundColor: designSystem.colors.danger,
                border: 'none',
                borderRadius: designSystem.radii.md,
                padding: '14px',
                color: designSystem.colors.textOnPrimary,
                fontWeight: designSystem.typography.weights.extrabold,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: designSystem.shadows.none,
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
