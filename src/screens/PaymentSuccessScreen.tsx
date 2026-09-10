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
        title: 'QTPay Receipt',
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
    <div className="fade-in" style={{ backgroundColor: '#F4F1EC', minHeight: '100%' }}>
      <AppHeader title="Receipt" showSettings={false} />

      <div style={{ padding: '24px 20px', textAlign: 'center' }}>
        {/* Animated Diamond Checkmark */}
        <div style={{ margin: '16px 0 24px 0' }}>
          <div className="diamond-check-container">
            <div className="diamond-shape" />
            <Check size={42} className="diamond-icon" strokeWidth={3.5} />
          </div>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px', color: '#111144' }}>
          Payment Successful
        </h2>
        <div style={{ fontSize: '13px', color: '#5C564D', marginBottom: '16px' }}>
          Paid to <strong style={{ color: '#111144' }}>{txn.title}</strong>
        </div>

        {/* Large Amount Display */}
        <div
          style={{
            fontSize: '34px',
            fontWeight: '900',
            color: '#111144',
            marginBottom: '24px',
          }}
        >
          {formatCurrency(txn.amount)}
        </div>

        {/* Transaction Details Breakdown Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #DAD1C8',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'left',
            boxShadow: '0 4px 20px rgba(17, 17, 68, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ color: '#5C564D', fontSize: '13px' }}>Provider / Payee</span>
            <span style={{ fontWeight: '700', fontSize: '13px', color: '#111144' }}>{txn.title}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ color: '#5C564D', fontSize: '13px' }}>Transaction ID</span>
            <span style={{ fontWeight: '600', fontSize: '12px', color: '#111144', fontFamily: 'monospace' }}>{txn.id}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ color: '#5C564D', fontSize: '13px' }}>UTR / Reference No</span>
            <span style={{ fontWeight: '600', fontSize: '12px', color: '#111144', fontFamily: 'monospace' }}>{txn.utr}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ color: '#5C564D', fontSize: '13px' }}>Date & Time</span>
            <span style={{ fontWeight: '600', fontSize: '13px', color: '#111144' }}>{formatDate(txn.timestamp)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #DAD1C8', paddingTop: '14px' }}>
            <span style={{ color: '#5C564D', fontSize: '13px' }}>Payment Method</span>
            <span style={{ fontWeight: '700', fontSize: '13px', color: '#111144' }}>ICICI Bank Savings **** 3616</span>
          </div>
        </div>

        {downloadMsg && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: '#F98513', fontWeight: '700', marginBottom: '16px' }}>
            <CheckCircle2 size={16} /> Receipt details saved successfully!
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
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
