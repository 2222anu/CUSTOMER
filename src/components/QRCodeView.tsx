import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeViewProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({
  value,
  size = 200,
  fgColor = '#061611',
  bgColor = '#FFFFFF',
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        padding: '18px',
        borderRadius: '24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 12px 35px rgba(0,0,0,0.4), 0 0 30px rgba(158, 240, 26, 0.2)',
        border: '4px solid var(--neon-primary)',
      }}
    >
      <QRCodeSVG
        value={value}
        size={size}
        fgColor={fgColor}
        bgColor={bgColor}
        level="H"
        includeMargin={false}
      />
    </div>
  );
};
