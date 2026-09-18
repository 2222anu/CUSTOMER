import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../state/AppContext';
import { toArabicNumerals } from '../utils/i18n';

interface PinPadProps {
  length?: number;
  onComplete: (pin: string) => void;
  onClearError?: () => void;
  error?: string;
  successMessage?: string;
  customTitle?: string;
}

export const PinPad: React.FC<PinPadProps> = ({
  length = 4,
  onComplete,
  onClearError,
  error,
  successMessage,
  customTitle,
}) => {
  const { language } = useApp();
  const [pin, setPin] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (error) {
      setIsShaking(true);
      setHasError(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 500);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else {
      setHasError(false);
      setIsShaking(false);
    }
  }, [error]);

  const handleKeyPress = useCallback(
    (num: string) => {
      if (hasError || error) {
        setHasError(false);
        setIsShaking(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (onClearError) onClearError();
        setPin(num);
        return;
      }

      setPin((prev) => {
        if (prev.length < length) {
          const nextPin = prev + num;
          if (nextPin.length === length) {
            setTimeout(() => {
              onComplete(nextPin);
            }, 120);
          }
          return nextPin;
        }
        return prev;
      });
    },
    [hasError, error, length, onClearError, onComplete]
  );

  const handleDelete = useCallback(() => {
    if (hasError || error) {
      setHasError(false);
      setIsShaking(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (onClearError) onClearError();
      setPin('');
      return;
    }
    setPin((prev) => (prev.length > 0 ? prev.slice(0, -1) : ''));
  }, [hasError, error, onClearError]);

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
  }, [handleKeyPress, handleDelete]);

  // Determine Title Text and Color
  let titleText = customTitle;
  let titleColor = '#9ca3af';

  if (error || hasError) {
    titleText = error || (language === 'العربية' ? 'الرمز غير صحيح، حاول مرة أخرى' : 'Incorrect PIN, Try Again');
    titleColor = '#f87171';
  } else if (successMessage) {
    titleText = successMessage;
    titleColor = '#7FE87F';
  } else if (!titleText) {
    titleText = language === 'العربية' ? 'أدخل الرمز السري المكون من ٤ أرقام' : 'Enter 4-Digit PIN';
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  return (
    <div
      className={isShaking ? 'shake' : ''}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* PIN Indicators Section */}
      <div className="pin-section" style={{ textAlign: 'center', marginBottom: '24px', width: '100%' }}>
        <div
          className="pin-title"
          id="pin-label"
          style={{
            fontSize: '11px',
            letterSpacing: '1.5px',
            color: titleColor,
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '16px',
            transition: 'color 0.2s ease',
          }}
        >
          {titleText}
        </div>

        <div
          className="pin-dots"
          id="pin-dots"
          role="group"
          aria-label={`PIN input, ${pin.length} of ${length} digits entered`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            direction: 'ltr',
          }}
        >
          {Array.from({ length }).map((_, index) => {
            const isErrorDot = isShaking;
            const isFilled = !isShaking && index < pin.length;

            return (
              <div
                key={index}
                className={`dot ${isFilled ? 'active' : ''} ${isErrorDot ? 'error' : ''}`}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: isErrorDot
                    ? '#f87171'
                    : isFilled
                    ? '#7FE87F'
                    : 'rgba(255, 255, 255, 0.12)',
                  transform: isErrorDot
                    ? 'scale(1.15)'
                    : isFilled
                    ? 'scale(1.2)'
                    : 'scale(1)',
                  boxShadow: isErrorDot
                    ? '0 0 12px rgba(248, 113, 113, 0.6)'
                    : isFilled
                    ? '0 0 12px rgba(127, 232, 127, 0.6)'
                    : 'none',
                  border: isFilled || isErrorDot
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.18)',
                  transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Keypad Grid */}
      <div
        className="keypad"
        role="group"
        aria-label="Numeric PIN keypad"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          width: '100%',
          maxWidth: '380px',
          direction: 'ltr',
        }}
      >
        {keys.map((key, i) => {
          if (key === '') {
            return <div key={i} className="key action-key" style={{ background: 'transparent', border: 'none' }} />;
          }

          if (key === 'delete') {
            return (
              <button
                key={i}
                type="button"
                onClick={handleDelete}
                aria-label="Backspace"
                className="key action-key"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  borderRadius: '14px',
                  height: '56px',
                  fontSize: '22px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  userSelect: 'none',
                }}
              >
                ⌫
              </button>
            );
          }

          const displayDigit = language === 'العربية' ? toArabicNumerals(key) : key;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleKeyPress(key)}
              aria-label={`Digit ${key}`}
              className="key"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '14px',
                height: '56px',
                fontSize: '22px',
                fontWeight: 500,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.12s ease',
                userSelect: 'none',
              }}
            >
              {displayDigit}
            </button>
          );
        })}
      </div>
    </div>
  );
};

