import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'user',
  outputTargets:[
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  devServer: {
    port: 8805,
    openBrowser: false
  }
};
