import type { User } from '../types';

export const authService = {
  async getCurrentUser(): Promise<User> {
    return {
      name: 'Anu',
      avatarInitials: 'AN',
      upiId: 'anu@alphpay',
      mobile: '+91 98765 43210',
      email: 'anu@alphpay.com',
    };
  },
  async verifyPin(pin: string): Promise<boolean> {
    // Mock PIN validation: any 4 digit pin is valid for demo
    return pin.length === 4;
  },
};
