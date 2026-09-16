import React, { useState } from 'react';
import {
  TrendingDown,
  Download,
  Utensils,
  ShoppingBag,
  Zap,
  Car,
  HeartPulse,
  Send,
  PieChart as PieChartIcon,
  BarChart3,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';

type PeriodType = 'WEEK' | 'MONTH' | 'LAST_MONTH' | 'YEAR';

interface CategoryData {
  id: string;
  nameEn: string;
  nameAr: string;
  amount: number;
  percentage: number;
  txnCount: number;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  merchants: string[];
}

interface MerchantData {
  name: string;
  category: string;
  categoryAr: string;
  amount: number;
  txnCount: number;
  logo: string;
}

export const SpendAnalysisScreen: React.FC = () => {
  const { navigateTo, language, isRtl } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('MONTH');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<'both' | 'pie' | 'bar'>('both');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportToast, setExportToast] = useState<string | null>(null);

  // Period-specific dynamic data
  const periodData = {
    WEEK: {
      totalSpent: 3420,
      previousPeriodSpent: 3950,
      deltaPercent: -13.4,
      dailyAverage: 488.5,
      budgetLimit: 4500,
      periodNameEn: 'This Week (Sep 8 - Sep 15)',
      periodNameAr: 'هذا الأسبوع (٨ - ١٥ سبتمبر)',
      chartData: [
        { label: language === 'العربية' ? 'الأحد' : 'Sun', amount: 420 },
        { label: language === 'العربية' ? 'الإثنين' : 'Mon', amount: 380 },
        { label: language === 'العربية' ? 'الثلاثاء' : 'Tue', amount: 650 },
        { label: language === 'العربية' ? 'الأربعاء' : 'Wed', amount: 290 },
        { label: language === 'العربية' ? 'الخميس' : 'Thu', amount: 840 },
        { label: language === 'العربية' ? 'الجمعة' : 'Fri', amount: 510 },
        { label: language === 'العربية' ? 'السبت' : 'Sat', amount: 330 },
      ],
    },
    MONTH: {
      totalSpent: 14850,
      previousPeriodSpent: 16950,
      deltaPercent: -12.4,
      dailyAverage: 495,
      budgetLimit: 18000,
      periodNameEn: 'September 2026',
      periodNameAr: 'سبتمبر ٢٠٢٦',
      chartData: [
        { label: language === 'العربية' ? 'أسبوع ١' : 'Week 1', amount: 3450 },
        { label: language === 'العربية' ? 'أسبوع ٢' : 'Week 2', amount: 4820 },
        { label: language === 'العربية' ? 'أسبوع ٣' : 'Week 3', amount: 2980 },
        { label: language === 'العربية' ? 'أسبوع ٤' : 'Week 4', amount: 3600 },
      ],
    },
    LAST_MONTH: {
      totalSpent: 16950,
      previousPeriodSpent: 18200,
      deltaPercent: -6.8,
      dailyAverage: 546.7,
      budgetLimit: 18000,
      periodNameEn: 'August 2026',
      periodNameAr: 'أغسطس ٢٠٢٦',
      chartData: [
        { label: language === 'العربية' ? 'أسبوع ١' : 'Week 1', amount: 4100 },
        { label: language === 'العربية' ? 'أسبوع ٢' : 'Week 2', amount: 4650 },
        { label: language === 'العربية' ? 'أسبوع ٣' : 'Week 3', amount: 3900 },
        { label: language === 'العربية' ? 'أسبوع ٤' : 'Week 4', amount: 4300 },
      ],
    },
    YEAR: {
      totalSpent: 138400,
      previousPeriodSpent: 152000,
      deltaPercent: -8.9,
      dailyAverage: 532,
      budgetLimit: 180000,
      periodNameEn: 'Year 2026 (YTD)',
      periodNameAr: 'عام ٢٠٢٦ (حتى الآن)',
      chartData: [
        { label: language === 'العربية' ? 'يناير' : 'Jan', amount: 14500 },
        { label: language === 'العربية' ? 'فبراير' : 'Feb', amount: 15200 },
        { label: language === 'العربية' ? 'مارس' : 'Mar', amount: 16800 },
        { label: language === 'العربية' ? 'أبريل' : 'Apr', amount: 17400 },
        { label: language === 'العربية' ? 'مايو' : 'May', amount: 14200 },
        { label: language === 'العربية' ? 'يونيو' : 'Jun', amount: 15100 },
        { label: language === 'العربية' ? 'يوليو' : 'Jul', amount: 14800 },
        { label: language === 'العربية' ? 'أغسطس' : 'Aug', amount: 16950 },
        { label: language === 'العربية' ? 'سبتمبر' : 'Sep', amount: 14850 },
      ],
    },
  };

  const currentData = periodData[selectedPeriod];
  const budgetProgress = Math.min(100, Math.round((currentData.totalSpent / currentData.budgetLimit) * 100));
  const remainingBudget = Math.max(0, currentData.budgetLimit - currentData.totalSpent);

  const categories: CategoryData[] = [
    {
      id: 'shopping',
      nameEn: 'Shopping & Retail',
      nameAr: 'التسوق والتجزئة',
      amount: selectedPeriod === 'WEEK' ? 950 : selectedPeriod === 'YEAR' ? 38600 : 4200,
      percentage: 28,
      txnCount: selectedPeriod === 'WEEK' ? 3 : 14,
      color: '#A855F7',
      bgColor: 'rgba(168, 85, 247, 0.15)',
      icon: <ShoppingBag size={18} color="#A855F7" />,
      merchants: ['Jarir Bookstore', 'Amazon SA', 'Noon', 'Zara Riyadh Park'],
    },
    {
      id: 'food',
      nameEn: 'Food & Dining',
      nameAr: 'المطاعم والمقاهي',
      amount: selectedPeriod === 'WEEK' ? 880 : selectedPeriod === 'YEAR' ? 35200 : 3850,
      percentage: 26,
      txnCount: selectedPeriod === 'WEEK' ? 6 : 28,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.15)',
      icon: <Utensils size={18} color="#F59E0B" />,
      merchants: ['HungerStation', 'Jahez', 'Starbucks', 'Al Baik'],
    },
    {
      id: 'bills',
      nameEn: 'Bills & Utilities',
      nameAr: 'الفواتير والخدمات',
      amount: selectedPeriod === 'WEEK' ? 520 : selectedPeriod === 'YEAR' ? 24500 : 2450,
      percentage: 16,
      txnCount: selectedPeriod === 'WEEK' ? 1 : 5,
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.15)',
      icon: <Zap size={18} color="#3B82F6" />,
      merchants: ['Saudi Electricity Co.', 'STC Pay', 'National Water Co.'],
    },
    {
      id: 'transport',
      nameEn: 'Travel & Transport',
      nameAr: 'السفر والمواصلات',
      amount: selectedPeriod === 'WEEK' ? 440 : selectedPeriod === 'YEAR' ? 18400 : 1920,
      percentage: 13,
      txnCount: selectedPeriod === 'WEEK' ? 4 : 12,
      color: '#06B6D4',
      bgColor: 'rgba(6, 182, 212, 0.15)',
      icon: <Car size={18} color="#06B6D4" />,
      merchants: ['Uber Riyadh', 'Aramco Fuel Station', 'Careem'],
    },
    {
      id: 'transfers',
      nameEn: 'Transfers & Others',
      nameAr: 'التحويلات ومدفوعات أخرى',
      amount: selectedPeriod === 'WEEK' ? 380 : selectedPeriod === 'YEAR' ? 11700 : 1250,
      percentage: 9,
      txnCount: selectedPeriod === 'WEEK' ? 2 : 8,
      color: 'var(--brand-green, #00D09C)',
      bgColor: 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))',
      icon: <Send size={18} color="var(--brand-green, #00D09C)" />,
      merchants: ['Sarie Instant Transfer', 'Apple Services', 'Netflix SA'],
    },
    {
      id: 'health',
      nameEn: 'Health & Medical',
      nameAr: 'الصحة والرعاية',
      amount: selectedPeriod === 'WEEK' ? 250 : selectedPeriod === 'YEAR' ? 10000 : 1180,
      percentage: 8,
      txnCount: selectedPeriod === 'WEEK' ? 1 : 4,
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.15)',
      icon: <HeartPulse size={18} color="#EF4444" />,
      merchants: ['Nahdi Pharmacy', 'Dr. Sulaiman Al-Habib Hospital'],
    },
  ];

  const topMerchants: MerchantData[] = [
    {
      name: language === 'العربية' ? 'الشركة السعودية للكهرباء (SEC)' : 'Saudi Electricity Co. (SEC)',
      category: 'Bills & Utilities',
      categoryAr: 'الفواتير والخدمات',
      amount: 1450,
      txnCount: 2,
      logo: '⚡',
    },
    {
      name: language === 'العربية' ? 'مكتبة جرير' : 'Jarir Bookstore',
      category: 'Shopping & Electronics',
      categoryAr: 'التسوق والإلكترونيات',
      amount: 1280,
      txnCount: 3,
      logo: '📚',
    },
    {
      name: language === 'العربية' ? 'لولو هايبرماركت' : 'Lulu Hypermarket',
      category: 'Groceries & Retail',
      categoryAr: 'التموينات والتجزئة',
      amount: 980,
      txnCount: 4,
      logo: '🛒',
    },
    {
      name: language === 'العربية' ? 'هنقرستيشن' : 'HungerStation',
      category: 'Food Delivery',
      categoryAr: 'توصيل الطعام',
      amount: 740,
      txnCount: 8,
      logo: '🍔',
    },
    {
      name: language === 'العربية' ? 'صيدليات النهدي' : 'Nahdi Pharmacy',
      category: 'Health & Wellness',
      categoryAr: 'الصحة والعناية',
      amount: 620,
      txnCount: 3,
      logo: '💊',
    },
  ];

  const selectedCategoryObj = categories.find((c) => c.id === selectedCategory);
  const filteredCategories = selectedCategory
    ? categories.filter((c) => c.id === selectedCategory)
    : categories;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportToast(
        language === 'العربية'
          ? 'تم تصدير تقرير المصروفات (PDF/CSV) بنجاح'
          : 'Spend Analysis Statement exported successfully (PDF/CSV)'
      );
      setTimeout(() => setExportToast(null), 3500);
    }, 1000);
  };

  // Bar scale calculation
  const maxChartAmount = Math.max(...currentData.chartData.map((d) => d.amount));

  // Pie Chart SVG calculations (Circumference of radius 70 = 439.82)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <div
      className="fade-in"
      style={{
        backgroundColor: '#080c14',
        minHeight: '100vh',
        paddingBottom: '100px',
        color: '#FFFFFF',
      }}
    >
      {/* App Header */}
      <AppHeader
        title={language === 'العربية' ? 'تحليل المصاريف' : 'Spend Analysis'}
        showBack={true}
        showSettings={true}
      />

      {/* Export Toast Notification */}
      {exportToast && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            top: '72px',
            left: '20px',
            right: '20px',
            maxWidth: '560px',
            margin: '0 auto',
            zIndex: 100,
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--brand-green, #00D09C)',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
          }}
        >
          <CheckCircle2 size={18} color="var(--brand-green, #00D09C)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{exportToast}</span>
        </div>
      )}

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Period Selector Pills */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            borderRadius: '16px',
            padding: '4px',
            gap: '4px',
          }}
        >
          {(
            [
              { id: 'WEEK', labelEn: 'Week', labelAr: 'أسبوع' },
              { id: 'MONTH', labelEn: 'Month', labelAr: 'شهر' },
              { id: 'LAST_MONTH', labelEn: 'Last Mo.', labelAr: 'الشهر الماضي' },
              { id: 'YEAR', labelEn: 'Year', labelAr: 'سنة' },
            ] as const
          ).map((item) => {
            const isActive = selectedPeriod === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedPeriod(item.id);
                  setSelectedCategory(null);
                }}
                className="interactive-tap"
                style={{
                  flex: 1,
                  padding: '9px 4px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--brand-green, #00D09C)' : 'transparent',
                  color: isActive ? 'var(--brand-green-ink, #080C14)' : '#A2A2BA',
                  fontSize: '12px',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                {language === 'العربية' ? item.labelAr : item.labelEn}
              </button>
            );
          })}
        </div>

        {/* HERO TOTAL SPEND & METRICS */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '20px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            padding: '22px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#6E6E85',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {language === 'العربية' ? 'إجمالي المصروفات' : 'Total Spending'}
              </span>
              <div style={{ fontSize: '12px', color: '#A2A2BA', fontWeight: 600, marginTop: '2px' }}>
                {language === 'العربية' ? currentData.periodNameAr : currentData.periodNameEn}
              </div>
            </div>

            {/* Export Statement Button */}
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="interactive-tap"
              title={language === 'العربية' ? 'تصدير التقرير' : 'Export Statement'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--color-surface-elevated, #182236)',
                border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                color: 'var(--brand-green, #00D09C)',
                borderRadius: '12px',
                padding: '8px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Download size={14} />
              <span>{isExporting ? (language === 'العربية' ? 'جاري التصدير...' : 'Exporting...') : (language === 'العربية' ? 'تصدير' : 'Export')}</span>
            </button>
          </div>

          {/* Amount Display */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span className="tabular-nums" style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              {formatCurrency(currentData.totalSpent, language)}
            </span>
          </div>

          {/* Delta Trend Comparison Pill & Daily Average */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px', alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                borderRadius: '20px',
                backgroundColor: 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))',
                border: '1px solid var(--brand-green-border, rgba(0, 208, 156, 0.35))',
                fontSize: '11.5px',
                fontWeight: 800,
                color: 'var(--brand-green, #00D09C)',
              }}
            >
              <TrendingDown size={14} />
              <span>
                {Math.abs(currentData.deltaPercent)}% {language === 'العربية' ? 'أقل من الفترة السابقة' : 'vs previous period'}
              </span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '20px',
                backgroundColor: 'var(--color-surface-elevated, #182236)',
                border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#A2A2BA',
              }}
            >
              <span>{language === 'العربية' ? 'المعدل اليومي:' : 'Daily Avg:'}</span>
              <span className="tabular-nums" style={{ color: '#FFFFFF', fontWeight: 800 }}>
                {formatCurrency(currentData.dailyAverage, language)}
              </span>
            </div>
          </div>
        </div>

        {/* CHART VIEW SWITCHER TABS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} color="var(--brand-green, #00D09C)" />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              {language === 'العربية' ? 'الرسوم البيانية والتحليلات' : 'Visual Spend Analytics'}
            </h3>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--color-surface, #111726)',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              borderRadius: '12px',
              padding: '3px',
              gap: '3px',
            }}
          >
            <button
              onClick={() => setActiveChartTab('both')}
              className="interactive-tap"
              style={{
                border: 'none',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                backgroundColor: activeChartTab === 'both' ? 'var(--brand-green, #00D09C)' : 'transparent',
                color: activeChartTab === 'both' ? 'var(--brand-green-ink, #080C14)' : '#A2A2BA',
                cursor: 'pointer',
              }}
            >
              {language === 'العربية' ? 'الكل' : 'Both'}
            </button>
            <button
              onClick={() => setActiveChartTab('bar')}
              className="interactive-tap"
              style={{
                border: 'none',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                backgroundColor: activeChartTab === 'bar' ? 'var(--brand-green, #00D09C)' : 'transparent',
                color: activeChartTab === 'bar' ? 'var(--brand-green-ink, #080C14)' : '#A2A2BA',
                cursor: 'pointer',
              }}
            >
              {language === 'العربية' ? 'الأعمدة' : 'Bar'}
            </button>
            <button
              onClick={() => setActiveChartTab('pie')}
              className="interactive-tap"
              style={{
                border: 'none',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                backgroundColor: activeChartTab === 'pie' ? 'var(--brand-green, #00D09C)' : 'transparent',
                color: activeChartTab === 'pie' ? 'var(--brand-green-ink, #080C14)' : '#A2A2BA',
                cursor: 'pointer',
              }}
            >
              {language === 'العربية' ? 'الدائري' : 'Pie'}
            </button>
          </div>
        </div>

        {/* 1. INTERACTIVE PIE / DONUT CHART */}
        {(activeChartTab === 'both' || activeChartTab === 'pie') && (
          <div
            className="fade-in"
            style={{
              backgroundColor: 'var(--color-surface, #111726)',
              borderRadius: '20px',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              padding: '22px 20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieChartIcon size={16} color="var(--brand-green, #00D09C)" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                  {language === 'العربية' ? 'التوزيع الدائري للمصروفات' : 'Category Distribution (Pie Chart)'}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--brand-green, #00D09C)', fontWeight: 700 }}>
                {selectedCategory
                  ? (language === 'العربية' ? 'انقر لإلغاء التحديد' : 'Tap to reset')
                  : (language === 'العربية' ? 'انقر للتفاصيل' : 'Tap slice for details')}
              </span>
            </div>

            {/* Donut Visualization with Center Callout */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '220px', height: '220px' }}>
                <svg viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                  {/* Background Track Ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#182236"
                    strokeWidth="24"
                  />

                  {/* Slices */}
                  {categories.map((cat) => {
                    const strokeLength = (cat.percentage / 100) * circumference;
                    const strokeOffset = (cumulativePercent / 100) * circumference;
                    cumulativePercent += cat.percentage;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <circle
                        key={cat.id}
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke={cat.color}
                        strokeWidth={isSelected ? 30 : 24}
                        strokeDasharray={`${strokeLength} ${circumference}`}
                        strokeDashoffset={-strokeOffset}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          opacity: selectedCategory === null || isSelected ? 1 : 0.3,
                          filter: isSelected ? `drop-shadow(0 0 8px ${cat.color})` : 'none',
                        }}
                        onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                      />
                    );
                  })}
                </svg>

                {/* Center Content Inside Donut */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    padding: '10px',
                  }}
                >
                  <span style={{ fontSize: '10.5px', fontWeight: 800, color: selectedCategoryObj ? selectedCategoryObj.color : '#A2A2BA', textTransform: 'uppercase' }}>
                    {selectedCategoryObj
                      ? (language === 'العربية' ? selectedCategoryObj.nameAr : selectedCategoryObj.nameEn)
                      : (language === 'العربية' ? 'الإجمالي' : 'Total')}
                  </span>
                  <span className="tabular-nums" style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', marginTop: '2px' }}>
                    {formatCurrency(selectedCategoryObj ? selectedCategoryObj.amount : currentData.totalSpent, language)}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-green, #00D09C)', marginTop: '2px' }}>
                    {selectedCategoryObj ? `${selectedCategoryObj.percentage}%` : '100%'}
                  </span>
                </div>
              </div>

              {/* Pie Legends Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px 14px',
                  width: '100%',
                  marginTop: '18px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                }}
              >
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                      className="interactive-tap"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        borderRadius: '10px',
                        backgroundColor: isSelected ? 'var(--color-surface-elevated, #182236)' : 'transparent',
                        border: isSelected ? `1px solid ${cat.color}` : '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: cat.color, flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {language === 'العربية' ? cat.nameAr : cat.nameEn}
                        </span>
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, color: cat.color, marginInlineStart: '6px' }}>
                        {cat.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. INTERACTIVE TIMELINE BAR GRAPH */}
        {(activeChartTab === 'both' || activeChartTab === 'bar') && (
          <div
            className="fade-in"
            style={{
              backgroundColor: 'var(--color-surface, #111726)',
              borderRadius: '20px',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              padding: '22px 20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={16} color="var(--brand-green, #00D09C)" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                  {language === 'العربية' ? 'المخطط الزمني للأعمدة (Bar Graph)' : 'Timeline Spending (Bar Graph)'}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#A2A2BA', fontWeight: 600 }}>
                {language === 'العربية' ? 'المبالغ بالريال السعودي' : 'SAR amounts'}
              </span>
            </div>

            {/* Hover Tooltip Indicator */}
            {hoveredBarIndex !== null && (
              <div
                className="fade-in"
                style={{
                  backgroundColor: 'var(--color-surface-elevated, #182236)',
                  border: '1px solid var(--brand-green, #00D09C)',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '11.5px', color: '#A2A2BA', fontWeight: 600 }}>
                  {currentData.chartData[hoveredBarIndex]?.label}
                </span>
                <span className="tabular-nums" style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand-green, #00D09C)' }}>
                  {formatCurrency(currentData.chartData[hoveredBarIndex]?.amount, language)}
                </span>
              </div>
            )}

            {/* Bars Visualization */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: '140px',
                gap: '8px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              }}
            >
              {currentData.chartData.map((bar, i) => {
                const heightPercent = Math.max(16, Math.round((bar.amount / maxChartAmount) * 100));
                const isMax = bar.amount === maxChartAmount;
                const isHovered = hoveredBarIndex === i;

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredBarIndex(i)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    onClick={() => setHoveredBarIndex(hoveredBarIndex === i ? null : i)}
                    className="interactive-tap"
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      className="tabular-nums"
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 800,
                        color: isHovered || isMax ? 'var(--brand-green, #00D09C)' : '#6E6E85',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {Math.round(bar.amount)}
                    </span>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '38px',
                        height: `${heightPercent}%`,
                        backgroundColor: isHovered || isMax ? 'var(--brand-green, #00D09C)' : 'var(--color-surface-elevated, #182236)',
                        borderRadius: '8px 8px 4px 4px',
                        transition: 'all 0.3s ease',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: isHovered || isMax ? 800 : 700,
                        color: isHovered || isMax ? '#FFFFFF' : '#A2A2BA',
                      }}
                    >
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BUDGET TRACKER CARD */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '20px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            padding: '20px 22px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="var(--brand-green, #00D09C)" />
              </div>
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                  {language === 'العربية' ? 'الحد المالي والميزانية' : 'Monthly Budget & Target'}
                </span>
                <div style={{ fontSize: '11px', color: '#A2A2BA' }}>
                  {language === 'العربية' ? `متبقي ${formatCurrency(remainingBudget, language)}` : `${formatCurrency(remainingBudget, language)} remaining`}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                color: budgetProgress <= 90 ? 'var(--brand-green, #00D09C)' : '#FF4757',
                padding: '4px 10px',
                borderRadius: '8px',
                backgroundColor: budgetProgress <= 90 ? 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))' : 'rgba(239, 68, 68, 0.12)',
              }}
            >
              {budgetProgress}% {language === 'العربية' ? 'مستخدم' : 'Used'}
            </span>
          </div>

          {/* Progress Track */}
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--color-surface-elevated, #182236)',
              borderRadius: '6px',
              overflow: 'hidden',
              marginTop: '10px',
            }}
          >
            <div
              style={{
                width: `${budgetProgress}%`,
                height: '100%',
                backgroundColor: budgetProgress <= 90 ? 'var(--brand-green, #00D09C)' : '#FF4757',
                borderRadius: '6px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6E6E85', marginTop: '6px' }}>
            <span>0 SAR</span>
            <span className="tabular-nums">{formatCurrency(currentData.budgetLimit, language)}</span>
          </div>
        </div>

        {/* ITEMIZED CATEGORY BREAKDOWN */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={16} color="var(--brand-green, #00D09C)" />
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                {language === 'العربية' ? 'تفاصيل الفئات والإنفاق' : 'Category Details'}
              </span>
            </div>

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--brand-green, #00D09C)',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {language === 'العربية' ? 'عرض الكل' : 'Show All'}
              </button>
            )}
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface, #111726)',
              borderRadius: '20px',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              overflow: 'hidden',
              padding: '8px',
            }}
          >
            {filteredCategories.map((cat, index) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                  className="interactive-tap"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px',
                    borderRadius: '16px',
                    backgroundColor: isSelected ? 'var(--color-surface-elevated, #182236)' : 'transparent',
                    border: isSelected ? `1px solid ${cat.color}` : '1px solid transparent',
                    borderBottom: !isSelected && index < filteredCategories.length - 1 ? '1px solid var(--color-border, rgba(255, 255, 255, 0.06))' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: cat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {cat.icon}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                          {language === 'العربية' ? cat.nameAr : cat.nameEn}
                        </span>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '2px 7px',
                            borderRadius: '6px',
                            backgroundColor: cat.bgColor,
                            color: cat.color,
                          }}
                        >
                          {cat.percentage}%
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px' }}>
                        {cat.txnCount} {language === 'العربية' ? 'عمليات' : 'txns'} • {cat.merchants.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: isRtl ? 'left' : 'right', marginInlineStart: '12px' }}>
                    <div className="tabular-nums" style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                      {formatCurrency(cat.amount, language)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP MERCHANTS */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Building2 size={16} color="var(--brand-green, #00D09C)" />
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
              {language === 'العربية' ? 'أعلى الجهات والمتاجر إنفاقاً' : 'Top Saudi Merchants'}
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface, #111726)',
              borderRadius: '20px',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              overflow: 'hidden',
              padding: '8px',
            }}
          >
            {topMerchants.map((merchant, index) => (
              <div
                key={merchant.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderBottom: index < topMerchants.length - 1 ? '1px solid var(--color-border, rgba(255, 255, 255, 0.06))' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-surface-elevated, #182236)',
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {merchant.logo}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {merchant.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A2A2BA', marginTop: '2px' }}>
                      {language === 'العربية' ? merchant.categoryAr : merchant.category} • {merchant.txnCount} {language === 'العربية' ? 'مدفوعات' : 'txns'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: isRtl ? 'left' : 'right', marginInlineStart: '12px' }}>
                  <div className="tabular-nums" style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                    {formatCurrency(merchant.amount, language)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SMART FINANCIAL INSIGHTS */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '20px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--brand-green, #00D09C)" />
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
              {language === 'العربية' ? 'رؤى ونصائح مالية ذكية' : 'Smart Spend Insights'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                backgroundColor: 'var(--color-surface-elevated, #182236)',
                borderRadius: '14px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '16px' }}>💡</span>
              <div style={{ fontSize: '12px', color: '#A2A2BA', lineHeight: '1.5' }}>
                {language === 'العربية'
                  ? 'وفرت ١٤٪ في مصاريف المطاعم هذا الشهر مقارنة بالشهر السابق. استمر في هذا الأداء!'
                  : 'You spent 14% less on dining out this month compared to August. Keep up the great saving pace!'}
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-surface-elevated, #182236)',
                borderRadius: '14px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '16px' }}>⚡</span>
              <div style={{ fontSize: '12px', color: '#A2A2BA', lineHeight: '1.5' }}>
                {language === 'العربية'
                  ? 'فاتورة الكهرباء لشهر سبتمبر كانت أقل بـ ١٢٠ ريال بفضل ترشيد الاستهلاك في أوقات الذروة.'
                  : 'Your September electricity bill was SAR 120 lower thanks to off-peak tariff efficiency.'}
              </div>
            </div>
          </div>
        </div>

        {/* Manage Bank Accounts in Settings */}
        <div
          onClick={() => navigateTo('BANK_ACCOUNTS')}
          className="interactive-tap"
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '20px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'var(--brand-green-tint, rgba(0, 208, 156, 0.12))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={20} color="var(--brand-green, #00D09C)" />
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                {language === 'العربية' ? 'إدارة الحسابات البنكية' : 'Manage Bank Accounts'}
              </div>
              <div style={{ fontSize: '11.5px', color: '#A2A2BA' }}>
                {language === 'العربية' ? 'عرض أرصدة وبطاقات البنوك السعودية في الإعدادات' : 'View Saudi bank balances & cards in Settings'}
              </div>
            </div>
          </div>

          <ChevronRight size={18} color="#A2A2BA" style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
        </div>
      </div>
    </div>
  );
};
