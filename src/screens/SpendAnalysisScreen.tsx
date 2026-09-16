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
  BookOpen,
  Store,
  Lightbulb,
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
  icon: React.ReactNode;
  iconBg: string;
}

export const SpendAnalysisScreen: React.FC = () => {
  const { navigateTo, language, isRtl } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('MONTH');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [chartView, setChartView] = useState<'bar' | 'pie'>('bar');
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
      periodNameEn: 'This Week',
      periodNameAr: 'هذا الأسبوع',
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
        { label: language === 'العربية' ? 'أسبوع ١' : 'W1', amount: 3450 },
        { label: language === 'العربية' ? 'أسبوع ٢' : 'W2', amount: 4820 },
        { label: language === 'العربية' ? 'أسبوع ٣' : 'W3', amount: 2980 },
        { label: language === 'العربية' ? 'أسبوع ٤' : 'W4', amount: 3600 },
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
        { label: language === 'العربية' ? 'أسبوع ١' : 'W1', amount: 4100 },
        { label: language === 'العربية' ? 'أسبوع ٢' : 'W2', amount: 4650 },
        { label: language === 'العربية' ? 'أسبوع ٣' : 'W3', amount: 3900 },
        { label: language === 'العربية' ? 'أسبوع ٤' : 'W4', amount: 4300 },
      ],
    },
    YEAR: {
      totalSpent: 138400,
      previousPeriodSpent: 152000,
      deltaPercent: -8.9,
      dailyAverage: 532,
      budgetLimit: 180000,
      periodNameEn: 'Year 2026',
      periodNameAr: 'عام ٢٠٢٦',
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

  // Brand harmonized color palette
  const categories: CategoryData[] = [
    {
      id: 'shopping',
      nameEn: 'Shopping & Retail',
      nameAr: 'التسوق والتجزئة',
      amount: selectedPeriod === 'WEEK' ? 950 : selectedPeriod === 'YEAR' ? 38600 : 4200,
      percentage: 28,
      txnCount: selectedPeriod === 'WEEK' ? 3 : 14,
      color: '#7FE87F',
      bgColor: 'rgba(127, 232, 127, 0.15)',
      icon: <ShoppingBag size={18} color="#7FE87F" />,
      merchants: ['Jarir Bookstore', 'Amazon SA', 'Noon'],
    },
    {
      id: 'food',
      nameEn: 'Food & Dining',
      nameAr: 'المطاعم والمقاهي',
      amount: selectedPeriod === 'WEEK' ? 880 : selectedPeriod === 'YEAR' ? 35200 : 3850,
      percentage: 26,
      txnCount: selectedPeriod === 'WEEK' ? 6 : 28,
      color: '#60A5FA',
      bgColor: 'rgba(96, 165, 250, 0.15)',
      icon: <Utensils size={18} color="#60A5FA" />,
      merchants: ['HungerStation', 'Jahez', 'Al Baik'],
    },
    {
      id: 'bills',
      nameEn: 'Bills & Utilities',
      nameAr: 'الفواتير والخدمات',
      amount: selectedPeriod === 'WEEK' ? 520 : selectedPeriod === 'YEAR' ? 24500 : 2450,
      percentage: 16,
      txnCount: selectedPeriod === 'WEEK' ? 1 : 5,
      color: '#FBBF24',
      bgColor: 'rgba(251, 191, 36, 0.15)',
      icon: <Zap size={18} color="#FBBF24" />,
      merchants: ['Saudi Electricity Co.', 'STC Pay'],
    },
    {
      id: 'transport',
      nameEn: 'Travel & Transport',
      nameAr: 'السفر والمواصلات',
      amount: selectedPeriod === 'WEEK' ? 440 : selectedPeriod === 'YEAR' ? 18400 : 1920,
      percentage: 13,
      txnCount: selectedPeriod === 'WEEK' ? 4 : 12,
      color: '#C084FC',
      bgColor: 'rgba(192, 132, 252, 0.15)',
      icon: <Car size={18} color="#C084FC" />,
      merchants: ['Uber Riyadh', 'Aramco Fuel'],
    },
    {
      id: 'transfers',
      nameEn: 'Transfers & Others',
      nameAr: 'التحويلات ومدفوعات أخرى',
      amount: selectedPeriod === 'WEEK' ? 380 : selectedPeriod === 'YEAR' ? 11700 : 1250,
      percentage: 9,
      txnCount: selectedPeriod === 'WEEK' ? 2 : 8,
      color: '#2DD4BF',
      bgColor: 'rgba(45, 212, 191, 0.15)',
      icon: <Send size={18} color="#2DD4BF" />,
      merchants: ['Sarie Transfer', 'Apple Services'],
    },
    {
      id: 'health',
      nameEn: 'Health & Medical',
      nameAr: 'الصحة والرعاية',
      amount: selectedPeriod === 'WEEK' ? 250 : selectedPeriod === 'YEAR' ? 10000 : 1180,
      percentage: 8,
      txnCount: selectedPeriod === 'WEEK' ? 1 : 4,
      color: '#F87171',
      bgColor: 'rgba(248, 113, 113, 0.15)',
      icon: <HeartPulse size={18} color="#F87171" />,
      merchants: ['Nahdi Pharmacy', 'Dr. Sulaiman Al-Habib'],
    },
  ];

  const topMerchants: MerchantData[] = [
    {
      name: language === 'العربية' ? 'الشركة السعودية للكهرباء (SEC)' : 'Saudi Electricity Co.',
      category: 'Bills & Utilities',
      categoryAr: 'الفواتير والخدمات',
      amount: 1450,
      txnCount: 2,
      icon: <Zap size={18} color="#FBBF24" />,
      iconBg: 'rgba(251, 191, 36, 0.15)',
    },
    {
      name: language === 'العربية' ? 'مكتبة جرير' : 'Jarir Bookstore',
      category: 'Shopping & Electronics',
      categoryAr: 'التسوق والإلكترونيات',
      amount: 1280,
      txnCount: 3,
      icon: <BookOpen size={18} color="#7FE87F" />,
      iconBg: 'rgba(127, 232, 127, 0.15)',
    },
    {
      name: language === 'العربية' ? 'لولو هايبرماركت' : 'Lulu Hypermarket',
      category: 'Groceries & Retail',
      categoryAr: 'التموينات والتجزئة',
      amount: 980,
      txnCount: 4,
      icon: <Store size={18} color="#60A5FA" />,
      iconBg: 'rgba(96, 165, 250, 0.15)',
    },
    {
      name: language === 'العربية' ? 'هنقرستيشن' : 'HungerStation',
      category: 'Food Delivery',
      categoryAr: 'توصيل الطعام',
      amount: 740,
      txnCount: 8,
      icon: <Utensils size={18} color="#C084FC" />,
      iconBg: 'rgba(192, 132, 252, 0.15)',
    },
    {
      name: language === 'العربية' ? 'صيدليات النهدي' : 'Nahdi Pharmacy',
      category: 'Health & Wellness',
      categoryAr: 'الصحة والعناية',
      amount: 620,
      txnCount: 3,
      icon: <HeartPulse size={18} color="#F87171" />,
      iconBg: 'rgba(248, 113, 113, 0.15)',
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
          : 'Spend statement exported successfully (PDF/CSV)'
      );
      setTimeout(() => setExportToast(null), 3500);
    }, 900);
  };

  // Bar scale calculation
  const maxChartAmount = Math.max(...currentData.chartData.map((d) => d.amount));

  // Pie Chart SVG calculations (Circumference of radius 68 = 427.25)
  const radius = 68;
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
            maxWidth: '520px',
            margin: '0 auto',
            zIndex: 100,
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--brand-green, #7FE87F)',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
          }}
        >
          <CheckCircle2 size={18} color="var(--brand-green, #7FE87F)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{exportToast}</span>
        </div>
      )}

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Period Selector Pills */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-surface, #111726)',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            borderRadius: '14px',
            padding: '3px',
            gap: '3px',
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
                  padding: '8px 4px',
                  borderRadius: '11px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--brand-green, #7FE87F)' : 'transparent',
                  color: isActive ? 'var(--brand-green-ink, #080C14)' : '#8E8EA8',
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

        {/* HERO TOTAL SPEND & BUDGET SUMMARY */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '20px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
              <div style={{ fontSize: '12px', color: '#8E8EA8', fontWeight: 600, marginTop: '2px' }}>
                {language === 'العربية' ? currentData.periodNameAr : currentData.periodNameEn}
              </div>
            </div>

            {/* Export Statement Button */}
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="interactive-tap"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--color-surface-elevated, #182236)',
                border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                color: 'var(--brand-green, #7FE87F)',
                borderRadius: '10px',
                padding: '7px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Download size={13} />
              <span>{isExporting ? (language === 'العربية' ? 'جاري...' : 'Exporting...') : (language === 'العربية' ? 'تصدير' : 'Export')}</span>
            </button>
          </div>

          {/* Amount Display */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span className="tabular-nums" style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              {formatCurrency(currentData.totalSpent, language)}
            </span>
          </div>

          {/* Delta Trend Pill & Daily Average */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '16px',
                backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                border: '1px solid var(--brand-green-border, rgba(127, 232, 127, 0.35))',
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--brand-green, #7FE87F)',
              }}
            >
              <TrendingDown size={13} />
              <span>
                {Math.abs(currentData.deltaPercent)}% {language === 'العربية' ? 'أقل من السابق' : 'vs last period'}
              </span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '16px',
                backgroundColor: 'var(--color-surface-elevated, #182236)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#8E8EA8',
              }}
            >
              <span>{language === 'العربية' ? 'المعدل اليومي:' : 'Daily Avg:'}</span>
              <span className="tabular-nums" style={{ color: '#FFFFFF', fontWeight: 800 }}>
                {formatCurrency(currentData.dailyAverage, language)}
              </span>
            </div>
          </div>

          {/* Clean Integrated Budget Progress */}
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', marginBottom: '6px' }}>
              <span style={{ color: '#8E8EA8', fontWeight: 600 }}>
                {language === 'العربية' ? `متبقي من الميزانية ${formatCurrency(remainingBudget, language)}` : `${formatCurrency(remainingBudget, language)} remaining of budget`}
              </span>
              <span style={{ fontWeight: 800, color: 'var(--brand-green, #7FE87F)' }}>
                {budgetProgress}%
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'var(--color-surface-elevated, #182236)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${budgetProgress}%`,
                  height: '100%',
                  backgroundColor: 'var(--brand-green, #7FE87F)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* VISUAL CHARTS CARD (Interactive Bar / Pie with Brand Green) */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '20px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            padding: '20px',
          }}
        >
          {/* Header & View Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {chartView === 'bar' ? (
                <BarChart3 size={16} color="var(--brand-green, #7FE87F)" />
              ) : (
                <PieChartIcon size={16} color="var(--brand-green, #7FE87F)" />
              )}
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                {chartView === 'bar'
                  ? (language === 'العربية' ? 'المخطط الزمني' : 'Timeline Spending')
                  : (language === 'العربية' ? 'توزيع الفئات' : 'Category Distribution')}
              </span>
            </div>

            {/* Segmented View Switcher */}
            <div
              style={{
                display: 'flex',
                backgroundColor: 'var(--color-surface-elevated, #182236)',
                border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
                borderRadius: '10px',
                padding: '2px',
                gap: '2px',
              }}
            >
              <button
                onClick={() => setChartView('bar')}
                className="interactive-tap"
                style={{
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: chartView === 'bar' ? 'var(--brand-green, #7FE87F)' : 'transparent',
                  color: chartView === 'bar' ? 'var(--brand-green-ink, #080C14)' : '#8E8EA8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <BarChart3 size={12} />
                <span>{language === 'العربية' ? 'أعمدة' : 'Bar'}</span>
              </button>
              <button
                onClick={() => setChartView('pie')}
                className="interactive-tap"
                style={{
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: chartView === 'pie' ? 'var(--brand-green, #7FE87F)' : 'transparent',
                  color: chartView === 'pie' ? 'var(--brand-green-ink, #080C14)' : '#8E8EA8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <PieChartIcon size={12} />
                <span>{language === 'العربية' ? 'دائري' : 'Pie'}</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: TIMELINE BAR GRAPH */}
          {chartView === 'bar' && (
            <div className="fade-in">
              {/* Tooltip */}
              {hoveredBarIndex !== null && (
                <div
                  className="fade-in"
                  style={{
                    backgroundColor: 'var(--color-surface-elevated, #182236)',
                    border: '1px solid var(--brand-green, #7FE87F)',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#8E8EA8', fontWeight: 600 }}>
                    {currentData.chartData[hoveredBarIndex]?.label}
                  </span>
                  <span className="tabular-nums" style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--brand-green, #7FE87F)' }}>
                    {formatCurrency(currentData.chartData[hoveredBarIndex]?.amount, language)}
                  </span>
                </div>
              )}

              {/* Bars Graphic */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: '130px',
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
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        className="tabular-nums"
                        style={{
                          fontSize: '9.5px',
                          fontWeight: 800,
                          color: isHovered || isMax ? 'var(--brand-green, #7FE87F)' : '#6E6E85',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {Math.round(bar.amount)}
                      </span>
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '36px',
                          height: `${heightPercent}%`,
                          backgroundColor: isHovered || isMax ? 'var(--brand-green, #7FE87F)' : 'var(--color-surface-elevated, #182236)',
                          borderRadius: '6px 6px 3px 3px',
                          transition: 'all 0.25s ease',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: isHovered || isMax ? 800 : 600,
                          color: isHovered || isMax ? '#FFFFFF' : '#8E8EA8',
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

          {/* VIEW 2: PIE / DONUT CHART */}
          {chartView === 'pie' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                <svg viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                  {/* Track */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#182236"
                    strokeWidth="22"
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
                        strokeWidth={isSelected ? 28 : 22}
                        strokeDasharray={`${strokeLength} ${circumference}`}
                        strokeDashoffset={-strokeOffset}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          opacity: selectedCategory === null || isSelected ? 1 : 0.3,
                          filter: isSelected ? `drop-shadow(0 0 6px ${cat.color})` : 'none',
                        }}
                        onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                      />
                    );
                  })}
                </svg>

                {/* Center Content */}
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
                    padding: '8px',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 800, color: selectedCategoryObj ? selectedCategoryObj.color : '#8E8EA8', textTransform: 'uppercase' }}>
                    {selectedCategoryObj
                      ? (language === 'العربية' ? selectedCategoryObj.nameAr : selectedCategoryObj.nameEn)
                      : (language === 'العربية' ? 'الإجمالي' : 'Total')}
                  </span>
                  <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 900, color: '#FFFFFF', marginTop: '2px' }}>
                    {formatCurrency(selectedCategoryObj ? selectedCategoryObj.amount : currentData.totalSpent, language)}
                  </span>
                  <span style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--brand-green, #7FE87F)', marginTop: '2px' }}>
                    {selectedCategoryObj ? `${selectedCategoryObj.percentage}%` : '100%'}
                  </span>
                </div>
              </div>

              {/* Pie Legends */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '6px 12px',
                  width: '100%',
                  marginTop: '14px',
                  paddingTop: '14px',
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
                        padding: '5px 8px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? 'var(--color-surface-elevated, #182236)' : 'transparent',
                        border: isSelected ? `1px solid ${cat.color}` : '1px solid transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flex: 1 }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color, flexShrink: 0 }} />
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {language === 'العربية' ? cat.nameAr : cat.nameEn}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: cat.color, marginInlineStart: '6px' }}>
                        {cat.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ITEMIZED CATEGORY BREAKDOWN */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
              {language === 'العربية' ? 'تفاصيل الفئات' : 'Category Details'}
            </span>

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--brand-green, #7FE87F)',
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
              padding: '6px',
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
                    padding: '12px',
                    borderRadius: '14px',
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
                        width: '38px',
                        height: '38px',
                        borderRadius: '11px',
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
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                          {language === 'العربية' ? cat.nameAr : cat.nameEn}
                        </span>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '1px 6px',
                            borderRadius: '5px',
                            backgroundColor: cat.bgColor,
                            color: cat.color,
                          }}
                        >
                          {cat.percentage}%
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#8E8EA8', marginTop: '2px' }}>
                        {cat.txnCount} {language === 'العربية' ? 'عمليات' : 'txns'} • {cat.merchants.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: isRtl ? 'left' : 'right', marginInlineStart: '12px' }}>
                    <div className="tabular-nums" style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                      {formatCurrency(cat.amount, language)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP MERCHANTS (With Clean Lucide Icons) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Building2 size={15} color="var(--brand-green, #7FE87F)" />
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
              {language === 'العربية' ? 'أعلى المتاجر إنفاقاً' : 'Top Merchants'}
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface, #111726)',
              borderRadius: '20px',
              border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
              overflow: 'hidden',
              padding: '6px',
            }}
          >
            {topMerchants.map((merchant, index) => (
              <div
                key={merchant.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 12px',
                  borderBottom: index < topMerchants.length - 1 ? '1px solid var(--color-border, rgba(255, 255, 255, 0.06))' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '11px', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '11px',
                      backgroundColor: merchant.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {merchant.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {merchant.name}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#8E8EA8', marginTop: '1px' }}>
                      {language === 'العربية' ? merchant.categoryAr : merchant.category} • {merchant.txnCount} {language === 'العربية' ? 'مدفوعات' : 'txns'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: isRtl ? 'left' : 'right', marginInlineStart: '10px' }}>
                  <div className="tabular-nums" style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                    {formatCurrency(merchant.amount, language)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SMART INSIGHT (Decluttered single banner) */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '18px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Lightbulb size={18} color="var(--brand-green, #7FE87F)" />
          </div>
          <div style={{ fontSize: '12px', color: '#B0B0C4', lineHeight: '1.45' }}>
            {language === 'العربية'
              ? 'وفرت ١٢.٤٪ في مصاريف هذا الشهر مقارنة بالشهر السابق. أحسنت!'
              : 'You spent 12.4% less this month compared to last month. Keep up the great pace!'}
          </div>
        </div>

        {/* Manage Bank Accounts Navigation */}
        <div
          onClick={() => navigateTo('BANK_ACCOUNTS')}
          className="interactive-tap"
          style={{
            backgroundColor: 'var(--color-surface, #111726)',
            borderRadius: '18px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.06))',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'var(--brand-green-tint, rgba(127, 232, 127, 0.14))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={18} color="var(--brand-green, #7FE87F)" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                {language === 'العربية' ? 'الحسابات البنكية المرتبطة' : 'Linked Bank Accounts'}
              </div>
              <div style={{ fontSize: '11px', color: '#8E8EA8' }}>
                {language === 'العربية' ? 'عرض أرصدة وبطاقات البنوك السعودية' : 'View Saudi bank cards & balances'}
              </div>
            </div>
          </div>

          <ChevronRight size={18} color="#8E8EA8" style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} />
        </div>
      </div>
    </div>
  );
};
