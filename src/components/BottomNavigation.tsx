import React from 'react';
import { Home, Send, Scan, History, User } from 'lucide-react';
import { useApp } from '../state/AppContext';
import type { BottomTab } from '../types';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: BottomTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'pay', label: 'Pay', icon: <Send size={20} /> },
    { id: 'scan', label: 'Scan', icon: <Scan size={26} /> },
    { id: 'history', label: 'History', icon: <History size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <nav
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '75px',
        backgroundColor: '#111144',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 10px',
        zIndex: 40,
        boxShadow: '0 -8px 25px rgba(17, 17, 68, 0.4)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isScan = tab.id === 'scan';

        if (isScan) {
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                position: 'relative',
                top: '-22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 45,
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#F98513',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(249, 133, 19, 0.45), 0 0 15px rgba(249, 133, 19, 0.25)',
                  border: '4px solid #111144',
                  transition: 'transform 0.15s ease',
                }}
              >
                {tab.icon}
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#F98513',
                  marginTop: '4px',
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
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              height: '100%',
              cursor: 'pointer',
              color: isActive ? '#F98513' : 'rgba(255, 255, 255, 0.65)',
              transition: 'color 0.15s ease',
            }}
          >
            {React.cloneElement(tab.icon as React.ReactElement<any>, {
              color: isActive ? '#F98513' : 'rgba(255, 255, 255, 0.65)',
            })}
            <span
              style={{
                fontSize: '11px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#F98513' : 'rgba(255, 255, 255, 0.65)',
                marginTop: '4px',
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
