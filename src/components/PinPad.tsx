import React, { useState } from 'react';
import { Delete } from 'lucide-react';

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

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* PIN Dots Display */}
      <div style={{ display: 'flex', gap: '16px', margin: '20px 0 30px 0' }}>
        {Array.from({ length }).map((_, index) => {
          const isFilled = index < pin.length;
          return (
            <div
              key={index}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: isFilled ? '#B8F7E4' : 'rgba(37, 39, 44, 0.1)',
                border: isFilled ? '1px solid #B8F7E4' : '1px solid rgba(37, 39, 44, 0.25)',
                boxShadow: isFilled ? '0 0 12px rgba(184, 247, 228, 0.6)' : 'none',
                transition: 'all 0.15s ease',
              }}
            />
          );
        })}
      </div>

      {error && (
        <div style={{ color: '#25272C', fontSize: '13px', marginBottom: '16px', fontWeight: '700' }}>
          {error}
        </div>
      )}

      {/* Numeric Keypad Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
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
                style={{
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(37, 39, 44, 0.05)',
                  border: '1px solid rgba(37, 39, 44, 0.1)',
                  color: '#25272C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '20px',
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
              style={{
                height: '60px',
                borderRadius: '16px',
                backgroundColor: 'rgba(37, 39, 44, 0.05)',
                border: '1px solid rgba(37, 39, 44, 0.1)',
                color: '#25272C',
                fontSize: '24px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
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
