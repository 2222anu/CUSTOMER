import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { designSystem } from '../design-system';

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
  themeMode = 'light',
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
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'bottom-sheet-title' : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: designSystem.colors.overlay,
        backdropFilter: 'blur(4px)',
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
          backgroundColor: isDark ? designSystem.colors.textPrimary : designSystem.colors.surface,
          color: isDark ? designSystem.colors.surface : designSystem.colors.textPrimary,
          borderTopLeftRadius: designSystem.radii.lg,
          borderTopRightRadius: designSystem.radii.lg,
          borderTop: isDark ? '1px solid #1e293b' : `1px solid ${designSystem.colors.borderHairline}`,
          padding: '24px 20px',
          maxHeight: '88vh',
          overflowY: 'auto',
          boxShadow: designSystem.shadows.none,
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : designSystem.colors.borderStrong,
            borderRadius: '2px',
            margin: '0 auto 16px auto',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: designSystem.spacing.xl }}>
          {title ? (
            <h3 id="bottom-sheet-title" style={{ fontSize: '18px', fontWeight: designSystem.typography.weights.extrabold, color: isDark ? designSystem.colors.surface : designSystem.colors.textPrimary }}>
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            aria-label="Close sheet"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : designSystem.colors.subSurface,
              border: 'none',
              color: isDark ? designSystem.colors.surface : designSystem.colors.textSecondary,
              width: '32px',
              height: '32px',
              borderRadius: designSystem.radii.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: designSystem.shadows.none,
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
