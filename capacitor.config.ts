import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.qtpay.app',
  appName: 'QTPay',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
