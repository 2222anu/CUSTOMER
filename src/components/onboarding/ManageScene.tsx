import React from 'react';
import { Landmark, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const ManageScene: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Primary Account Card */}
      <div
        style={{
          backgroundColor: '#151524',
          border: '1px solid #2C2C44',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(127, 232, 127, 0.12)',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Landmark size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>HDFC Bank</div>
              <div style={{ fontSize: '11px', color: '#A2A2BA' }}>•••• 4821</div>
            </div>
          </div>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              backgroundColor: 'rgba(127, 232, 127, 0.12)',
              color: '#7FE87F',
              padding: '3px 8px',
              borderRadius: '6px',
            }}
          >
            Primary
          </span>
        </div>

        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '11px', color: '#A2A2BA', fontWeight: 600 }}>Available Balance</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF', marginTop: '2px' }}>₹48,250.00</div>
        </div>
      </div>

      {/* Quick Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div
          style={{
            backgroundColor: '#1E1E32',
            border: '1px solid #2C2C44',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7FE87F', fontSize: '11px', fontWeight: 700 }}>
            <ArrowDownLeft size={14} /> Received
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>₹18,400</div>
        </div>

        <div
          style={{
            backgroundColor: '#1E1E32',
            border: '1px solid #2C2C44',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A2A2BA', fontSize: '11px', fontWeight: 700 }}>
            <ArrowUpRight size={14} /> Spent
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>₹6,150</div>
        </div>
      </div>
    </div>
  );
};
