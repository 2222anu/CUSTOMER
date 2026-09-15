export type SupportedLanguage = 'English' | 'العربية';

export const toArabicNumerals = (val: string | number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return val
    .toString()
    .replace(/\d/g, (digit) => arabicDigits[parseInt(digit, 10)]);
};

export const TRANSLATIONS: Record<string, { en: string; ar: string }> = {
  // Common & Navigation
  'app.name': { en: 'QTPay', ar: 'كيو تي باي' },
  'app.tagline': { en: 'QUICK. TRUSTED. PAYMENTS.', ar: 'مدفوعات سريعة وموثوقة' },
  'powered.by': { en: 'powered by', ar: 'مشغل بواسطة' },
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.pay': { en: 'Pay', ar: 'دفع' },
  'nav.scan': { en: 'Scan', ar: 'مسح' },
  'nav.history': { en: 'History', ar: 'العمليات' },
  'nav.cards': { en: 'Cards', ar: 'البطاقات' },
  'nav.profile': { en: 'Profile', ar: 'حسابي' },
  'common.sadad': { en: 'SADAD', ar: 'سداد' },
  'common.view_all': { en: 'View All', ar: 'عرض الكل' },
  'btn.back': { en: 'Back', ar: 'رجوع' },
  'btn.continue': { en: 'Continue', ar: 'متابعة' },
  'btn.verify': { en: 'Verify', ar: 'تحقق' },
  'btn.confirm': { en: 'Confirm & Pay', ar: 'تأكيد ودفع' },
  'btn.cancel': { en: 'Cancel', ar: 'إلغاء' },
  'btn.done': { en: 'Done', ar: 'تم' },
  'btn.close': { en: 'Close', ar: 'إغلاق' },
  'btn.share': { en: 'Share Receipt', ar: 'مشاركة الإيصال' },
  'btn.copied': { en: 'Copied', ar: 'تم النسخ' },
  'btn.refund': { en: 'Refund', ar: 'استرداد' },
  'btn.collect': { en: 'Collect', ar: 'تحصيل' },

  // Home & Balance
  'home.total_balance': { en: 'Total Available Balance', ar: 'إجمالي الرصيد المتاح' },
  'home.pin_required': { en: 'PIN Required', ar: 'رمز السري مطلوب' },
  'home.hide': { en: 'Hide', ar: 'إخفاء' },
  'home.tap_to_view_pin': { en: '🔒 Tap to enter PIN and view balance', ar: '🔒 اضغط لإدخال الرمز السري وعرض الرصيد' },
  'home.sarie_rail': { en: 'Sarie 24/7 Rail', ar: 'شبكة سريع الفورية ٢٤/٧' },
  'home.accounts': { en: 'Accounts', ar: 'الحسابات' },
  'home.transfer_pay': { en: 'Transfer & Pay', ar: 'تحويل ومدفوعات' },
  'home.zero_fees': { en: 'Zero Fees', ar: 'بدون رسوم' },
  'home.scan_qr': { en: 'Scan QR', ar: 'مسح الباركود' },
  'home.pay_anyone': { en: 'Pay Anyone', ar: 'تحويل لأي شخص' },
  'home.request_money': { en: 'Request Money', ar: 'طلب أموال' },
  'home.bills_sadad': { en: 'Bills & SADAD', ar: 'فواتير وسداد' },
  'home.sec_electric': { en: 'Electricity', ar: 'الكهرباء' },
  'home.telecom': { en: 'Telecom', ar: 'الاتصالات' },
  'home.water': { en: 'Water', ar: 'المياه' },
  'home.traffic_fines': { en: 'Traffic Fines', ar: 'المخالفات المرورية' },
  'home.recent_activity': { en: 'Recent Activity', ar: 'أحدث العمليات' },
  'home.recent_txns': { en: 'Recent Transactions', ar: 'أحدث العمليات' },
  'home.view_all': { en: 'View All', ar: 'عرض الكل' },
  'home.linked_banks': { en: 'Linked Saudi Banks', ar: 'الحسابات البنكية السعودية' },
  'home.associated_sama': { en: 'Associated with SAMA', ar: 'مرخص وخاضع لإشراف البنك المركزي السعودي' },
  'home.payment_partner': { en: 'Official Payment Partner', ar: 'شريك المدفوعات المعتمد' },
  'home.sama_license': { en: 'Secured by SAMA National Banking Rail', ar: 'مرخص ومحمي بالشبكة الوطنية للمدفوعات' },

  // Authentication & Onboarding
  'auth.welcome': { en: 'Welcome to QTPay', ar: 'مرحباً بك في كيو تي باي' },
  'auth.account_type': { en: 'Select Account Type', ar: 'اختر نوع الحساب' },
  'auth.customer': { en: 'Personal / Customer', ar: 'حساب شخصي / أفراد' },
  'auth.merchant': { en: 'Business / Merchant', ar: 'حساب أعمال / تاجر' },
  'auth.full_name': { en: 'Full Legal Name', ar: 'الاسم الكامل' },
  'auth.mobile_number': { en: 'Saudi Mobile Number', ar: 'رقم الجوال السعودي' },
  'auth.get_otp': { en: 'Get OTP & Verify', ar: 'الحصول على رمز التحقق' },
  'auth.enter_otp': { en: 'Enter 6-Digit OTP', ar: 'أدخل رمز التحقق المكون من ٦ أرقام' },
  'auth.otp_sent_to': { en: 'Sent via SMS to', ar: 'تم الإرسال عبر رسالة نصية إلى' },
  'auth.resend_otp': { en: 'Resend OTP in', ar: 'إعادة الإرسال بعد' },

  // Pay Anyone & Send
  'pay.send_money': { en: 'Send Money', ar: 'إرسال أموال' },
  'pay.select_route': { en: 'Select Payment Route', ar: 'اختر طريقة التحويل' },
  'pay.account_to_account': { en: 'Account to Account', ar: 'تحويل بالآيبان / الحساب' },
  'pay.mobile_transfer': { en: 'Mobile Number', ar: 'رقم الجوال' },
  'pay.sarie_id': { en: 'Sarie Alias / UPI ID', ar: 'معرف سريع الفوري' },
  'pay.enter_amount': { en: 'Enter Amount', ar: 'أدخل المبلغ' },
  'pay.source_account': { en: 'Source Bank Account', ar: 'الحساب البنكي المصدر' },
  'pay.add_note': { en: 'Add note / Purpose', ar: 'إضافة ملاحظة / الغرض' },
  'pay.processing': { en: 'Processing via Sarie...', ar: 'جاري المعالجة عبر نظام سريع...' },
  'pay.success_title': { en: 'Payment Successful', ar: 'تم التحويل بنجاح' },

  // Merchant Ecosystem
  'merchant.today_sales': { en: "Today's Collections", ar: 'تحصيلات اليوم' },
  'merchant.sales_count': { en: 'Sales', ar: 'عمليات بيع' },
  'merchant.incl_vat': { en: 'Incl. 15% ZATCA VAT', ar: 'شامل ١٥٪ ضريبة القيمة المضافة' },
  'merchant.softpos': { en: 'SoftPOS Tap to Pay', ar: 'نقاط البيع بالجوال (Tap)' },
  'merchant.zatca_qr': { en: 'ZATCA Dynamic QR', ar: 'رمز زاتكا المفوتر' },
  'merchant.payment_link': { en: 'Remote Payment Link', ar: 'رابط دفع عن بُعد' },
  'merchant.soundbox': { en: 'SoundBox Notifier', ar: 'صندوق الصوت الذكي' },
  'merchant.charge_amount': { en: 'Charge Amount (SoftPOS)', ar: 'مبلغ العملية (نقاط البيع)' },
  'merchant.tap_card_prompt': { en: 'Hold card or phone near the back of device', ar: 'مرر البطاقة أو الجوال خلف الجهاز' },
  'merchant.reading_nfc': { en: 'Reading Contactless Chip...', ar: 'جاري قراءة الشريحة اللاتلامسية...' },
  'merchant.authorizing_sama': { en: 'Authorizing with SAMA Network...', ar: 'جاري التفويض مع شبكة مدى...' },
  'merchant.payment_approved': { en: 'Payment Approved', ar: 'تمت العملية بنجاح' },
  'merchant.direct_settlement': { en: 'Direct settlement to', ar: 'تسوية مباشرة إلى' },
  'merchant.new_sale': { en: 'New Sale (SoftPOS)', ar: 'عملية بيع جديدة' },
  'merchant.back_dashboard': { en: 'Back to Merchant Dashboard', ar: 'العودة للوحة التحكم' },
  'merchant.switch_customer': { en: 'Customer View', ar: 'عرض العميل' },
  'merchant.switch_merchant': { en: 'Merchant View', ar: 'عرض التاجر' },
  'merchant.web_portal': { en: 'Web Admin Portal', ar: 'بوابة الويب الإدارية' },

  // ZATCA & E-Invoice
  'zatca.title': { en: 'ZATCA Phase 2 E-Invoice', ar: 'فاتورة إلكترونية معتمدة (المرحلة الثانية)' },
  'zatca.qr_generator': { en: 'ZATCA Phase 2 QR Generator', ar: 'مُوَلِّد باركود زاتكا الذكي' },
  'zatca.tlv_qr': { en: 'TLV Cryptographic QR', ar: 'رمز استجابة سريع مشفر' },
  'zatca.vat_id': { en: 'ZATCA VAT ID', ar: 'الرقم الضريبي للمنشأة' },
  'zatca.cr_number': { en: 'Commercial Registration (CR)', ar: 'السجل التجاري' },
  'zatca.gross_total': { en: 'Gross Total', ar: 'المبلغ الإجمالي' },
  'zatca.net_total': { en: 'Net Amount (Excl. VAT)', ar: 'المبلغ غير شامل الضريبة' },
  'zatca.vat_amount': { en: '15% ZATCA VAT', ar: 'ضريبة القيمة المضافة (١٥٪)' },
  'zatca.fatoora': { en: 'ZATCA Fatoora Platform', ar: 'منصة فاتورة المعتمدة' },

  // Security & KYC
  'sec.enter_pin': { en: 'Enter PIN to View Balance', ar: 'أدخل الرمز السري لعرض الرصيد' },
  'sec.enter_pin_sub': { en: 'Enter 4-digit security PIN to view your total balance', ar: 'أدخل رمز الأمان المكون من ٤ أرقام لعرض الرصيد' },
  'sec.national_id': { en: 'National ID / Iqama Number', ar: 'رقم الهوية الوطنية / الإقامة' },
  'sec.absher_kyc': { en: 'SAMA & ZATCA e-KYC (Absher)', ar: 'التحقق الوطني الإلكتروني (أبشر)' },
  'sec.refund_pin': { en: 'Enter Merchant PIN to Authorize Refund', ar: 'أدخل الرمز السري للتاجر لتأكيد الاسترداد' },
};

export const translateText = (key: string, language: SupportedLanguage = 'English', defaultText?: string): string => {
  const isAr = language === 'العربية';
  const entry = TRANSLATIONS[key];
  if (entry) {
    return isAr ? entry.ar : entry.en;
  }
  return defaultText || key;
};

export const formatSaudiCurrency = (amount: number, language: SupportedLanguage = 'English'): string => {
  const isAr = language === 'العربية';
  const formattedNum = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (isAr) {
    return `${toArabicNumerals(formattedNum)} ر.س`;
  }
  return `SAR ${formattedNum}`;
};

export const formatLocalizedNumber = (val: string | number, language: SupportedLanguage = 'English'): string => {
  const isAr = language === 'العربية';
  if (isAr) {
    return toArabicNumerals(val);
  }
  return val.toString();
};

export const formatLocalizedDate = (date: Date, language: SupportedLanguage = 'English'): string => {
  const isAr = language === 'العربية';
  if (isAr) {
    return new Intl.DateTimeFormat('ar-SA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};
