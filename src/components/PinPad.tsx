import React, { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';
import { designSystem } from '../design-system';

interface PinPadProps {
  length?: number;
  onComplete: (pin: string) => void;
  error?: string;
}

export const PinPad: React.FC<PinPadProps> = ({ length = 4, onComplete, error }) => {
  const [pin, setPin] = useState<string>('');

  const handleKeyPress = (num: string) => {
    if (pin.length < length) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === length) {
        setTimeout(() => {
          onComplete(nextPin);
          setPin('');
        }, 150);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, length]);

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* PIN Dots Display */}
      <div
        role="group"
        aria-label={`UPI PIN input, ${pin.length} of ${length} digits entered`}
        style={{ display: 'flex', gap: designSystem.spacing.lg, margin: '20px 0 30px 0' }}
      >
        {Array.from({ length }).map((_, index) => {
          const isFilled = index < pin.length;
          return (
            <div
              key={index}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: designSystem.radii.full,
                backgroundColor: isFilled ? designSystem.colors.primary : designSystem.colors.primaryLight,
                border: isFilled ? `2px solid ${designSystem.colors.primary}` : `2px solid ${designSystem.colors.borderStrong}`,
                boxShadow: designSystem.shadows.none,
                transition: 'all 0.15s ease',
              }}
            />
          );
        })}
      </div>

      {error && (
        <div role="alert" style={{ color: designSystem.colors.danger, fontSize: '13px', marginBottom: designSystem.spacing.lg, fontWeight: designSystem.typography.weights.bold }}>
          {error}
        </div>
      )}

      {/* Numeric Keypad Grid */}
      <div
        role="group"
        aria-label="Numeric PIN keypad"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: designSystem.spacing.md,
          width: '100%',
          maxWidth: '300px',
        }}
      >
        {keys.map((key, i) => {
          if (key === '') return <div key={i} />;

          if (key === 'delete') {
            return (
              <button
                key={i}
                onClick={handleDelete}
                aria-label="Delete last digit"
                style={{
                  height: '56px',
                  borderRadius: designSystem.radii.md,
                  backgroundColor: designSystem.colors.subSurface,
                  border: `1px solid ${designSystem.colors.borderStrong}`,
                  color: designSystem.colors.textPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '20px',
                  boxShadow: designSystem.shadows.none,
                }}
              >
                <Delete size={22} />
              </button>
            );
          }

          return (
            <button
              key={i}
              onClick={() => handleKeyPress(key)}
              aria-label={`Digit ${key}`}
              style={{
                height: '56px',
                borderRadius: designSystem.radii.md,
                backgroundColor: designSystem.colors.surface,
                border: `1px solid ${designSystem.colors.borderStrong}`,
                color: designSystem.colors.textPrimary,
                fontSize: '22px',
                fontWeight: designSystem.typography.weights.extrabold,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                boxShadow: designSystem.shadows.none,
              }}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};
