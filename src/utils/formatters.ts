export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const generateUTR = (): string => {
  return 'UTR' + Math.floor(100000000000 + Math.random() * 900000000000).toString();
};

export const generateTxnId = (): string => {
  return 'QT' + Math.floor(10000000000 + Math.random() * 90000000000).toString();
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
