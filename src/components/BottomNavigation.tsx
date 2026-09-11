import React from 'react';
import { Home, FileText, QrCode, Clock, User } from 'lucide-react';
import { useApp } from '../state/AppContext';
import type { BottomTab } from '../types';
import { designSystem } from '../design-system';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: BottomTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'account', label: 'Account', icon: <FileText size={20} /> },
    { id: 'scan', label: 'Scan & Pay', icon: <QrCode size={24} /> },
    { id: 'history', label: 'History', icon: <Clock size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Bottom Navigation"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: designSystem.colors.surface,
        borderTop: `1px solid ${designSystem.colors.borderHairline}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 4px',
        zIndex: 40,
        boxShadow: designSystem.shadows.none,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isScan = tab.id === 'scan';

        if (isScan) {
          return (
            <div
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveTab(tab.id);
                }
              }}
              style={{
                position: 'relative',
                top: '-18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 45,
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: designSystem.radii.full,
                  backgroundColor: designSystem.colors.primary,
                  color: designSystem.colors.textOnPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: designSystem.shadows.none,
                  border: `3px solid ${designSystem.colors.surface}`,
                }}
              >
                {tab.icon}
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: designSystem.typography.weights.extrabold,
                  color: designSystem.colors.primary,
                  marginTop: '2px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {tab.label}
              </span>
            </div>
          );
        }

        return (
          <div
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveTab(tab.id);
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              height: '100%',
              cursor: 'pointer',
              color: isActive ? designSystem.colors.primary : designSystem.colors.textMuted,
            }}
          >
            {React.cloneElement(tab.icon as React.ReactElement<any>, {
              color: isActive ? designSystem.colors.primary : designSystem.colors.textMuted,
            })}
            <span
              style={{
                fontSize: '11px',
                fontWeight: isActive ? designSystem.typography.weights.bold : designSystem.typography.weights.medium,
                color: isActive ? designSystem.colors.primary : designSystem.colors.textMuted,
                marginTop: '3px',
              }}
            >
              {tab.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
};
