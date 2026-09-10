import type { Transaction } from '../types';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'State Power Corporation',
    subTitle: 'Electricity Bill Payment',
    amount: 2620.14,
    type: 'sent',
    date: 'TODAY',
    timestamp: new Date(),
    utr: 'UTR984729104821',
    avatarInitials: 'SP',
  },
  {
    id: 'tx-2',
    title: 'Omar Khalid',
    subTitle: 'UPI Transfer',
    amount: 456.0,
    type: 'sent',
    date: 'TODAY',
    timestamp: new Date(Date.now() - 3600000),
    utr: 'UTR192847291024',
    avatarInitials: 'OK',
  },
  {
    id: 'tx-3',
    title: 'Star Supermarket',
    subTitle: 'Merchant Payment',
    amount: 54.0,
    type: 'sent',
    date: 'TODAY',
    timestamp: new Date(Date.now() - 7200000),
    utr: 'UTR384910294812',
    avatarInitials: 'SS',
  },
  {
    id: 'tx-4',
    title: 'Rahul Sharma',
    subTitle: 'UPI Payment',
    amount: 52.0,
    type: 'sent',
    date: 'TODAY',
    timestamp: new Date(Date.now() - 10800000),
    utr: 'UTR784910294112',
    avatarInitials: 'RS',
  },
  {
    id: 'tx-5',
    title: 'Star Supermarket',
    subTitle: 'Merchant Payment',
    amount: 25.0,
    type: 'sent',
    date: 'YESTERDAY',
    timestamp: new Date(Date.now() - 86400000),
    utr: 'UTR224910294812',
    avatarInitials: 'SS',
  },
  {
    id: 'tx-6',
    title: 'Ajay Singh',
    subTitle: 'Money Received',
    amount: 2500.0,
    type: 'received',
    date: 'YESTERDAY',
    timestamp: new Date(Date.now() - 90000000),
    utr: 'UTR998491029481',
    avatarInitials: 'AS',
  },
];

export const transactionService = {
  async getInitialTransactions(): Promise<Transaction[]> {
    return [...INITIAL_TRANSACTIONS];
  },
};
