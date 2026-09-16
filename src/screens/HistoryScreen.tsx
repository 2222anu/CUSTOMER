import React, { useState } from 'react';
import { Search, X, Receipt, ShieldAlert, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { TransactionRow } from '../components/TransactionRow';
import { BottomSheet } from '../components/BottomSheet';
import { SamaLogo } from '../components/SamaLogo';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';
import type { Transaction } from '../types';

type FilterType = 'all' | 'sent' | 'received' | 'pending';

export const HistoryScreen: React.FC = () => {
  const { transactions, t, isRtl, language } = useApp();
  const isAr = language === 'العربية' || language === 'ar';
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [isDisputing, setIsDisputing] = useState(false);
  const [disputeReason, setDisputeReason] = useState('Duplicate Charge');
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);

  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'sent'
        ? t.type === 'sent'
        : filter === 'received'
        ? t.type === 'received'
        : t.type === 'pending';

    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.subTitle && t.subTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.utr.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const groupedByDate: Record<string, typeof transactions> = {};
  filteredTransactions.forEach((t) => {
    const key = t.date || 'TODAY';
    if (!groupedByDate[key]) groupedByDate[key] = [];
    groupedByDate[key].push(t);
  });

  const getFilterLabel = (f: FilterType) => {
    if (isAr) {
      if (f === 'all') return 'الكل';
      if (f === 'sent') return 'المدفوعات';
      if (f === 'received') return 'المستلمة';
      if (f === 'pending') return 'قيد الانتظار';
    }
    return f;
  };

  const handleOpenReceipt = (txn: Transaction) => {
    setSelectedTxn(txn);
    setIsDisputing(false);
    setDisputeSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedTxn(null);
    setIsDisputing(false);
    setDisputeSubmitted(false);
  };

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    setDisputeSubmitted(true);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#080c14', minHeight: '100%', paddingBottom: '96px', color: '#FFFFFF' }}>
      <AppHeader
        title={t('history.title', 'Transactions')}
        showSearch
        onSearchClick={() => setShowSearchInput(!showSearchInput)}
        showSettings
      />

      {showSearchInput && (
        <div style={{ padding: '0 20px', marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#111726',
              border: '1px solid #34d399',
              borderRadius: '14px',
              padding: '11px 14px',
              boxShadow: '0 4px 12px rgba(52, 211, 153, 0.15)',
            }}
          >
            <Search size={16} color="#34d399" />
            <input
              type="text"
              placeholder={isAr ? 'البحث بالاسم أو المرجع البنكي (SARIE UTR)...' : 'Search by name or SARIE UTR...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                width: '100%',
                textAlign: isRtl ? 'right' : 'left',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs / Chips */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '0 20px',
          marginBottom: '18px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {(['all', 'sent', 'received', 'pending'] as FilterType[]).map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="interactive-tap"
              style={{
                backgroundColor: isActive ? '#34d399' : '#111726',
                border: isActive ? '1px solid #34d399' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isActive ? '#080c14' : '#9ca3af',
                borderRadius: '20px',
                padding: '7px 16px',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'capitalize',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 4px 12px rgba(52, 211, 153, 0.25)' : 'none',
              }}
            >
              {getFilterLabel(f)}
            </button>
          );
        })}
      </div>

      {/* Grouped Transaction Lists */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        {Object.keys(groupedByDate).length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#111726',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '40px 20px',
              color: '#9ca3af',
              boxShadow: 'none',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: '#182236',
                color: '#34d399',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <Receipt size={24} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
              {isAr ? 'لا توجد عمليات' : 'No transactions'}
            </div>
            <div style={{ fontSize: '13px', marginTop: '4px', color: '#9ca3af' }}>
              {isAr ? 'جرّب تعديل البحث أو الفلاتر' : 'Try adjusting your search or filters'}
            </div>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([dateLabel, items]) => (
            <div key={dateLabel} style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#9ca3af',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  marginInlineStart: '4px',
                }}
              >
                {t(dateLabel, dateLabel)}
              </div>
              <div
                style={{
                  backgroundColor: '#111726',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  padding: '8px 8px 0 8px',
                  boxShadow: 'none',
                }}
              >
                {items.map((txn) => (
                  <TransactionRow
                    key={txn.id}
                    transaction={txn}
                    onClick={() => handleOpenReceipt(txn)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transaction Details & Dispute Modal */}
      {selectedTxn && (
        <BottomSheet
          isOpen={Boolean(selectedTxn)}
          onClose={handleCloseModal}
          title={isAr ? 'تفاصيل العملية والإيصال' : 'Transaction Details & SLA'}
        >
          <div style={{ paddingBottom: '12px' }}>
            {!isDisputing ? (
              <div>
                {/* Status Hero */}
                <div style={{ textAlign: 'center', padding: '10px 0 18px 0' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: selectedTxn.type === 'received' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(52, 211, 153, 0.12)',
                      border: '1.5px solid #34d399',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px auto',
                    }}
                  >
                    <CheckCircle2 size={28} color="#34d399" />
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF' }}>
                    {selectedTxn.type === 'received' ? '+' : '-'}{formatCurrency(selectedTxn.amount, language)}
                  </div>
                  <div style={{ fontSize: '13px', color: '#34d399', fontWeight: 800, marginTop: '3px' }}>
                    {isAr ? 'عملية مكتملة عبر سريع' : 'Completed via SARIE Instant Rails'}
                  </div>
                </div>

                {/* Details Breakdown */}
                <div
                  style={{
                    backgroundColor: '#182236',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '16px',
                    marginBottom: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{isAr ? 'الطرف الآخر' : 'Beneficiary / Sender'}</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF' }}>{selectedTxn.title}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{isAr ? 'المرجع البنكي (UTR)' : 'SARIE Reference (UTR)'}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399', fontFamily: 'monospace' }}>
                      {selectedTxn.utr}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{isAr ? 'التاريخ والوقت' : 'Date & Timestamp'}</span>
                    <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>{selectedTxn.date} • 14:22 GMT+3</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{isAr ? 'طريقة التحويل' : 'Payment Method'}</span>
                    <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 700 }}>
                      {isAr ? 'معرّف الدفع الافتراضي (VPA)' : 'Payment Alias (VPA)'}
                    </span>
                  </div>
                </div>

                {/* Actions: Dispute / SLA button */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setIsDisputing(true)}
                    className="interactive-tap"
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255, 71, 87, 0.12)',
                      border: '1px solid rgba(255, 71, 87, 0.3)',
                      borderRadius: '14px',
                      padding: '13px',
                      color: '#FF4757',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <ShieldAlert size={16} />
                    <span>{isAr ? 'تقديم اعتراض / استرداد' : 'Raise Dispute / Refund'}</span>
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="action-btn interactive-tap"
                    style={{
                      flex: 1,
                      backgroundColor: '#34d399',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '13px',
                      color: '#080c14',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    {isAr ? 'تم' : 'Done'}
                  </button>
                </div>
              </div>
            ) : !disputeSubmitted ? (
              <form onSubmit={handleSubmitDispute} className="fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <AlertTriangle size={20} color="#FFB300" />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      {isAr ? 'طلب نزاع مالي أو استرداد' : 'File Transaction Dispute'}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                      {isAr ? 'معالجة مباشرة وفق معايير البنك المركزي السعودي' : 'SAMA SLA-Backed Dispute Protection'}
                    </span>
                  </div>
                </div>

                {/* Dispute Reason Picker */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                    {isAr ? 'سبب الاعتراض' : 'Dispute Reason'}
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { en: 'Duplicate Charge', ar: 'خصم مكرر لنفس العملية' },
                      { en: 'Incorrect Amount Debited', ar: 'خصم مبلغ غير صحيح' },
                      { en: 'Beneficiary Not Credited', ar: 'لم يتم إيداع المبلغ للمستفيد' },
                      { en: 'Unauthorized / Fraud', ar: 'عملية غير مصرح بها' },
                    ].map((reason) => (
                      <div
                        key={reason.en}
                        onClick={() => setDisputeReason(reason.en)}
                        className="interactive-tap"
                        style={{
                          backgroundColor: disputeReason === reason.en ? 'rgba(52, 211, 153, 0.12)' : '#182236',
                          border: disputeReason === reason.en ? '1.5px solid #34d399' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '11px 14px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: disputeReason === reason.en ? '#34d399' : '#FFFFFF',
                          cursor: 'pointer',
                        }}
                      >
                        {isAr ? reason.ar : reason.en}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SLA Guarantee Card */}
                <div
                  style={{
                    backgroundColor: '#182236',
                    border: '1px solid rgba(52, 211, 153, 0.25)',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Clock size={18} color="#34d399" />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#34d399' }}>
                      {isAr ? 'اتفاقية مستوى الخدمة (SLA): ٢٤ - ٤٨ ساعة' : 'Resolution SLA: 24 - 48 Hours'}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#9ca3af', marginTop: '1px' }}>
                      {isAr ? 'تتبع فوري مع إشعار بالنتيجة وإعادة المبلغ' : 'Automated bank investigation & instant refund on validation'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsDisputing(false)}
                    style={{
                      flex: 1,
                      backgroundColor: '#182236',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '13px',
                      color: '#9ca3af',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    className="action-btn interactive-tap"
                    style={{
                      flex: 2,
                      backgroundColor: '#34d399',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '13px',
                      color: '#080c14',
                      fontWeight: 800,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{isAr ? 'تأكيد ورفع النزاع' : 'Submit Dispute'}</span>
                    <ArrowRight size={16} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="fade-in" style={{ textAlign: 'center', padding: '14px 0' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(52, 211, 153, 0.15)',
                    border: '1.5px solid #34d399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px auto',
                  }}
                >
                  <CheckCircle2 size={30} color="#34d399" />
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                  {isAr ? 'تم تسجيل الاعتراض بنجاح' : 'Dispute Claim Registered'}
                </h4>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 16px 0' }}>
                  {isAr
                    ? 'رقم التذكرة #DSP-89421 • جاري التحقق من البنك المصدر وسيتم تحديثك خلال ٢٤ ساعة.'
                    : 'Ticket #DSP-89421 • Bank investigation initiated. You will receive updates within 24 hours.'}
                </p>

                <button
                  onClick={handleCloseModal}
                  className="action-btn interactive-tap"
                  style={{
                    width: '100%',
                    backgroundColor: '#34d399',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '13px',
                    color: '#080c14',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {isAr ? 'حسناً ومتابعة' : 'Done & Return'}
                </button>
              </div>
            )}

            {/* SAMA Protection Footer */}
            <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <SamaLogo height={12} themeMode="green" />
              <span style={{ fontSize: '10.5px', color: '#9ca3af', fontWeight: 600 }}>
                {isAr ? 'محمي ومراقب بنظام حماية العملاء التابع لساما' : 'SAMA Financial Consumer Protection Regulated'}
              </span>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};
