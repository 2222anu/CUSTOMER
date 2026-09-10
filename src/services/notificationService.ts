import type { AppNotification } from '../types';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Payment successful',
    description: '₹2,620.14 paid to State Power Corporation',
    timestamp: 'Just now',
    read: false,
    type: 'success',
  },
  {
    id: 'notif-2',
    title: 'Payment successful',
    description: '₹450.00 paid to Omar Khalid',
    timestamp: '2 hours ago',
    read: true,
    type: 'success',
  },
  {
    id: 'notif-3',
    title: 'Bank linked',
    description: 'ICICI Bank was linked successfully.',
    timestamp: '1 day ago',
    read: true,
    type: 'info',
  },
  {
    id: 'notif-4',
    title: 'Bank linked',
    description: 'Yes Bank was linked successfully.',
    timestamp: '2 days ago',
    read: true,
    type: 'info',
  },
];

export const notificationService = {
  async getInitialNotifications(): Promise<AppNotification[]> {
    return [...INITIAL_NOTIFICATIONS];
  },
};
