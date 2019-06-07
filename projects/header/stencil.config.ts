import { Config } from '@stencil/core';
// import include from 'rollup-plugin-includepaths';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export const config: Config = {
  namespace: 'header',
  outputTargets:[
    // { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  devServer: {
    openBrowser: false,
    port: 8801
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
