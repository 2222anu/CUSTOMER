import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  themeMode?: 'dark' | 'light';
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  themeMode = 'dark',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDark = themeMode === 'dark';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(7, 25, 19, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        className="slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: isDark ? '#071F17' : '#FFFFFF',
          color: isDark ? '#FFFFFF' : 'var(--text-primary)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          borderTop: isDark ? '1px solid rgba(158, 240, 26, 0.2)' : '1px solid var(--card-border)',
          padding: '24px 20px',
          maxHeight: '88vh',
          overflowY: 'auto',
          boxShadow: '0 -15px 40px rgba(7, 25, 19, 0.3)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#DCE7E0',
            borderRadius: '2px',
            margin: '0 auto 16px auto',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          {title ? <h3 style={{ fontSize: '18px', fontWeight: '700', color: isDark ? '#FFFFFF' : 'var(--text-primary)' }}>{title}</h3> : <div />}
          <button
            onClick={onClose}
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'var(--bg-secondary)',
              border: 'none',
              color: isDark ? '#FFFFFF' : 'var(--text-secondary)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
