export const formatCurrency = (amount: number): string => {
  return 'SAR ' + new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const generateUTR = (): string => {
  return 'SARIE' + Math.floor(100000000000 + Math.random() * 900000000000).toString();
};

export const generateTxnId = (): string => {
  return 'SAR' + Math.floor(10000000000 + Math.random() * 90000000000).toString();
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};
