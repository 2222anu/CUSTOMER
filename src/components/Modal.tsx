import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { designSystem } from '../design-system';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: designSystem.colors.overlay,
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: designSystem.spacing.xl,
      }}
      onClick={onClose}
    >
      <div
        className="fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: designSystem.colors.surface,
          border: `1px solid ${designSystem.colors.borderHairline}`,
          borderRadius: designSystem.radii.lg,
          padding: designSystem.spacing['2xl'],
          boxShadow: designSystem.shadows.none,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: designSystem.spacing.lg }}>
          {title ? (
            <h3 id="modal-title" style={{ fontSize: '18px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary }}>
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              backgroundColor: designSystem.colors.subSurface,
              border: 'none',
              color: designSystem.colors.textSecondary,
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
