import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'promoted',
  outputTargets:[
    // { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  devServer: {
    openBrowser: false,
    port: 8803
  }
};
