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
  PieChart,
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
      color: '#7FE87F',
      bgColor: 'rgba(127, 232, 127, 0.15)',
      icon: <Send size={18} color="#7FE87F" />,
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
    }, 1200);
  };

  // Find max chart amount for bar scale calculation
  const maxChartAmount = Math.max(...currentData.chartData.map((d) => d.amount));

  return (
    <div
      className="fade-in"
      style={{
        backgroundColor: '#070D0A',
        backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(52, 211, 153, 0.08) 0%, rgba(7, 13, 10, 0.98) 60%)',
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
            backgroundColor: '#151524',
            border: '1px solid #7FE87F',
            borderRadius: '14px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          }}
        >
          <CheckCircle2 size={18} color="#7FE87F" />
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#FFFFFF' }}>{exportToast}</span>
        </div>
      )}

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Period Selector Pills */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#111726',
            border: '1px solid #2C2C44',
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
                  backgroundColor: isActive ? '#7FE87F' : 'transparent',
                  color: isActive ? '#0B0B14' : '#A2A2BA',
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

        {/* HERO TOTAL SPEND CARD */}
        <div
          style={{
            backgroundColor: '#111726',
            borderRadius: '24px',
            border: '1px solid #2C2C44',
            padding: '24px',
            boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: 'rgba(127, 232, 127, 0.08)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />

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
              <div style={{ fontSize: '11.5px', color: '#A2A2BA', fontWeight: 600, marginTop: '2px' }}>
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
                backgroundColor: '#1E1E32',
                border: '1px solid #2C2C44',
                color: '#7FE87F',
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
            <span style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
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
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: 'rgba(127, 232, 127, 0.12)',
                border: '1px solid rgba(127, 232, 127, 0.3)',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#7FE87F',
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
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: '#1E1E32',
                border: '1px solid #2C2C44',
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#A2A2BA',
              }}
            >
              <span>{language === 'العربية' ? 'المعدل اليومي:' : 'Daily Avg:'}</span>
              <span style={{ color: '#FFFFFF', fontWeight: 800 }}>
                {formatCurrency(currentData.dailyAverage, language)}
              </span>
            </div>
          </div>

          {/* VISUAL SPENDING TREND BAR CHART */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1E1E32' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#6E6E85', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {language === 'العربية' ? 'مخطط التوزيع الزمني' : 'Timeline Distribution'}
              </span>
              <span style={{ fontSize: '10.5px', color: '#7FE87F', fontWeight: 700 }}>
                {language === 'العربية' ? 'انقر على العمود للتفاصيل' : 'Tap bar for breakdown'}
              </span>
            </div>

            {/* Bars */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: '110px',
                gap: '8px',
                paddingBottom: '6px',
              }}
            >
              {currentData.chartData.map((bar, i) => {
                const heightPercent = Math.max(18, Math.round((bar.amount / maxChartAmount) * 100));
                const isMax = bar.amount === maxChartAmount;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 800, color: isMax ? '#7FE87F' : '#6E6E85' }}>
                      {Math.round(bar.amount)}
                    </span>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '36px',
                        height: `${heightPercent}%`,
                        backgroundColor: isMax ? '#7FE87F' : '#1E1E32',
                        border: isMax ? '1px solid #7FE87F' : '1px solid #2C2C44',
                        borderRadius: '8px 8px 4px 4px',
                        transition: 'height 0.4s ease, background-color 0.2s ease',
                        boxShadow: isMax ? '0 0 12px rgba(127, 232, 127, 0.3)' : 'none',
                      }}
                    />
                    <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#A2A2BA' }}>
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BUDGET TRACKER CARD */}
        <div
          style={{
            backgroundColor: '#111726',
            borderRadius: '20px',
            border: '1px solid #2C2C44',
            padding: '18px 20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(127, 232, 127, 0.12)',
                  border: '1px solid rgba(127, 232, 127, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={16} color="#7FE87F" />
              </div>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                  {language === 'العربية' ? 'الحد المالي والميزانية' : 'Budget & Target'}
                </span>
                <div style={{ fontSize: '11px', color: '#A2A2BA' }}>
                  {language === 'العربية' ? `متبقي ${formatCurrency(remainingBudget, language)}` : `${formatCurrency(remainingBudget, language)} left`}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: budgetProgress <= 90 ? '#7FE87F' : '#FF4757',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: budgetProgress <= 90 ? 'rgba(127, 232, 127, 0.12)' : 'rgba(239, 68, 68, 0.12)',
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
              backgroundColor: '#1E1E32',
              borderRadius: '6px',
              overflow: 'hidden',
              marginTop: '8px',
            }}
          >
            <div
              style={{
                width: `${budgetProgress}%`,
                height: '100%',
                backgroundColor: budgetProgress <= 90 ? '#7FE87F' : '#FF4757',
                borderRadius: '6px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6E6E85', marginTop: '6px' }}>
            <span>0 SAR</span>
            <span>{formatCurrency(currentData.budgetLimit, language)}</span>
          </div>
        </div>

        {/* CATEGORY BREAKDOWN SECTION */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PieChart size={16} color="#7FE87F" />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                {language === 'العربية' ? 'المصروفات حسب التصنيف' : 'Spending by Category'}
              </span>
            </div>

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#7FE87F',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {language === 'العربية' ? 'عرض الكل' : 'Clear Filter'}
              </button>
            )}
          </div>

          {/* Multi-segmented Category Distribution Color Bar */}
          <div
            style={{
              width: '100%',
              height: '10px',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              marginBottom: '14px',
              backgroundColor: '#151524',
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                title={`${cat.nameEn}: ${cat.percentage}%`}
                style={{
                  width: `${cat.percentage}%`,
                  height: '100%',
                  backgroundColor: cat.color,
                  opacity: selectedCategory === null || selectedCategory === cat.id ? 1 : 0.25,
                  transition: 'opacity 0.2s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              />
            ))}
          </div>

          {/* Category List */}
          <div
            style={{
              backgroundColor: '#111726',
              borderRadius: '20px',
              border: '1px solid #2C2C44',
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
                    padding: '14px 12px',
                    borderRadius: '14px',
                    backgroundColor: isSelected ? '#1E1E32' : 'transparent',
                    border: isSelected ? '1px solid #2C2C44' : '1px solid transparent',
                    borderBottom: !isSelected && index < filteredCategories.length - 1 ? '1px solid #1E1E32' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
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
                            padding: '2px 6px',
                            borderRadius: '6px',
                            backgroundColor: cat.bgColor,
                            color: cat.color,
                          }}
                        >
                          {cat.percentage}%
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#6E6E85', marginTop: '2px' }}>
                        {cat.txnCount} {language === 'العربية' ? 'عمليات' : 'transactions'} • {cat.merchants[0]}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: isRtl ? 'left' : 'right', marginInlineStart: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                      {formatCurrency(cat.amount, language)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP MERCHANTS LEADERBOARD */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Building2 size={16} color="#7FE87F" />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
              {language === 'العربية' ? 'أعلى الجهات والمتاجر إنفاقاً' : 'Top Merchants & Payees'}
            </span>
          </div>

          <div
            style={{
              backgroundColor: '#111726',
              borderRadius: '20px',
              border: '1px solid #2C2C44',
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
                  padding: '12px 14px',
                  borderBottom: index < topMerchants.length - 1 ? '1px solid #1E1E32' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: '#1E1E32',
                      border: '1px solid #2C2C44',
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
                    <div style={{ fontSize: '11px', color: '#6E6E85', marginTop: '2px' }}>
                      {language === 'العربية' ? merchant.categoryAr : merchant.category} • {merchant.txnCount} {language === 'العربية' ? 'مدفوعات' : 'txns'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: isRtl ? 'left' : 'right', marginInlineStart: '12px' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                    {formatCurrency(merchant.amount, language)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SMART FINANCIAL INSIGHTS & SAVING TIPS */}
        <div
          style={{
            backgroundColor: '#111726',
            borderRadius: '20px',
            border: '1px solid #2C2C44',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#7FE87F" />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
              {language === 'العربية' ? 'رؤى ونصائح مالية ذكية' : 'Smart Spend Insights'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                backgroundColor: '#151524',
                borderRadius: '14px',
                border: '1px solid #2C2C44',
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
                backgroundColor: '#151524',
                borderRadius: '14px',
                border: '1px solid #2C2C44',
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

        {/* Manage Bank Accounts Shortcut Banner */}
        <div
          onClick={() => navigateTo('BANK_ACCOUNTS')}
          className="interactive-tap"
          style={{
            backgroundColor: '#151524',
            borderRadius: '18px',
            border: '1px solid #2C2C44',
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
                backgroundColor: 'rgba(127, 232, 127, 0.12)',
                border: '1px solid rgba(127, 232, 127, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={18} color="#7FE87F" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                {language === 'العربية' ? 'إدارة الحسابات البنكية' : 'Manage Bank Accounts'}
              </div>
              <div style={{ fontSize: '11px', color: '#A2A2BA' }}>
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
