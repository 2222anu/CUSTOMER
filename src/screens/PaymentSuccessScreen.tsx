import React, { useState } from 'react';
import { Check, Share2, FileText, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { useApp } from '../state/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import type { Transaction } from '../types';

export const PaymentSuccessScreen: React.FC = () => {
  const { screenParams, lastTransaction, navigateTo } = useApp();
  const [downloadMsg, setDownloadMsg] = useState(false);

  const txn: Transaction = screenParams.transaction || lastTransaction || {
    id: 'QT98472910482',
    title: 'State Power Corporation',
    subTitle: 'Electricity Bill Payment',
    amount: 2620.14,
    type: 'sent',
    date: 'TODAY',
    timestamp: new Date(),
    utr: 'UTR984729104821',
  };

  const handleDone = () => {
    navigateTo('HOME');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'alph pay Receipt',
        text: `Payment Successful! ${formatCurrency(txn.amount)} paid to ${txn.title}. UTR: ${txn.utr}`,
      }).catch(() => {});
    } else {
      setDownloadMsg(true);
      setTimeout(() => setDownloadMsg(false), 2500);
    }
  };

  const handleDownloadReceipt = () => {
    setDownloadMsg(true);
    setTimeout(() => setDownloadMsg(false), 2500);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#0B0B14', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Receipt" showSettings={false} />

      <div style={{ padding: '24px 20px', textAlign: 'center' }}>
        {/* Animated Diamond Checkmark */}
        <div style={{ margin: '12px 0 20px 0' }}>
          <div className="diamond-check-container">
            <div className="diamond-shape" />
            <Check size={38} className="diamond-icon" strokeWidth={3.5} />
          </div>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
          Payment Successful
        </h2>
        <div style={{ fontSize: '13px', color: '#A2A2BA', marginBottom: '14px' }}>
          Paid to <strong style={{ color: '#FFFFFF' }}>{txn.title}</strong>
        </div>

        {/* Large Amount Display */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#7FE87F',
            marginBottom: '20px',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
          }}
        >
          {formatCurrency(txn.amount)}
        </div>

        {/* Transaction Details Breakdown Card */}
        <div
          style={{
            backgroundColor: '#151524',
            border: '1px solid #2C2C44',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'left',
            boxShadow: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#A2A2BA', fontSize: '13px' }}>Payee</span>
            <span style={{ fontWeight: '700', fontSize: '13px', color: '#FFFFFF' }}>{txn.title}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#A2A2BA', fontSize: '13px' }}>Transaction ID</span>
            <span style={{ fontWeight: '600', fontSize: '12px', color: '#FFFFFF', fontFamily: 'monospace' }}>{txn.id}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#A2A2BA', fontSize: '13px' }}>UTR Number</span>
            <span style={{ fontWeight: '600', fontSize: '12px', color: '#FFFFFF', fontFamily: 'monospace' }}>{txn.utr}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#A2A2BA', fontSize: '13px' }}>Date & Time</span>
            <span style={{ fontWeight: '600', fontSize: '13px', color: '#FFFFFF' }}>{formatDate(txn.timestamp)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2C2C44', paddingTop: '12px' }}>
            <span style={{ color: '#A2A2BA', fontSize: '13px' }}>Payment Method</span>
            <span style={{ fontWeight: '700', fontSize: '13px', color: '#7FE87F' }}>ICICI Bank •••• 3616</span>
          </div>
        </div>

        {downloadMsg && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: '#7FE87F', fontWeight: '700', marginBottom: '16px' }}>
            <CheckCircle2 size={16} color="#7FE87F" /> Receipt saved successfully
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
          <SecondaryButton onClick={handleShare}>
            <Share2 size={16} /> Share
          </SecondaryButton>
          <SecondaryButton onClick={handleDownloadReceipt}>
            <FileText size={16} /> Receipt
          </SecondaryButton>
        </div>

        <PrimaryButton onClick={handleDone}>Done</PrimaryButton>
      </div>
    </div>
  );
};
