import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'search',
  outputTargets:[
    // { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  devServer: {
    openBrowser: false,
    port: 8802
  }
};
