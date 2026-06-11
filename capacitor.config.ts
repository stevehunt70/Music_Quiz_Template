import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'uk.co.mathsattacks',
  appName: 'UK Chart Music Quiz',
  webDir: 'dist',

  assets: {
    path: 'public',
    icon: {
      source: 'icon.png'
    },
  }
};

export default config;
