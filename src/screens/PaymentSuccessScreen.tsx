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
    <div className="fade-in" style={{ backgroundColor: '#1A1A2E', minHeight: '100%', paddingBottom: '30px' }}>
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
        <div style={{ fontSize: '13px', color: '#B3B3C2', marginBottom: '14px' }}>
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
            backgroundColor: '#2A2A3E',
            border: '1px solid #4D4D6B',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#B3B3C2', fontSize: '13px' }}>Provider / Payee</span>
            <span style={{ fontWeight: '700', fontSize: '13px', color: '#FFFFFF' }}>{txn.title}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#B3B3C2', fontSize: '13px' }}>Transaction ID</span>
            <span style={{ fontWeight: '600', fontSize: '12px', color: '#FFFFFF', fontFamily: 'monospace' }}>{txn.id}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#B3B3C2', fontSize: '13px' }}>UTR / Reference No</span>
            <span style={{ fontWeight: '600', fontSize: '12px', color: '#FFFFFF', fontFamily: 'monospace' }}>{txn.utr}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#B3B3C2', fontSize: '13px' }}>Date & Time</span>
            <span style={{ fontWeight: '600', fontSize: '13px', color: '#FFFFFF' }}>{formatDate(txn.timestamp)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #3A3A52', paddingTop: '12px' }}>
            <span style={{ color: '#B3B3C2', fontSize: '13px' }}>Payment Method</span>
            <span style={{ fontWeight: '700', fontSize: '13px', color: '#7FE87F' }}>ICICI Bank Savings **** 3616</span>
          </div>
        </div>

        {downloadMsg && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: '#7FE87F', fontWeight: '700', marginBottom: '16px' }}>
            <CheckCircle2 size={16} color="#7FE87F" /> Receipt details saved successfully!
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
