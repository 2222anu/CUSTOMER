import type { ElectricityBill } from '../types';

export const billPaymentService = {
  async fetchElectricityBill(consumerNumber: string): Promise<ElectricityBill> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      consumerNumber: consumerNumber || '134567',
      providerName: 'State Power Corporation',
      amount: 2620.14,
      dueDate: '2026-09-25',
      billDate: '2026-09-01',
      isPaid: false,
    };
  },
};
