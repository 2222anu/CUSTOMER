export const qrService = {
  getUpiQrString(upiId: string, name: string, amount?: number): string {
    let url = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&cu=INR`;
    if (amount) {
      url += `&am=${amount}`;
    }
    return url;
  },
};
