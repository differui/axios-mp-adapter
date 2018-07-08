const typescript = require('rollup-plugin-typescript');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

export default {
  entry: './src/index.ts',
  dest: './dest/bundle.js',
  format: 'cjs',
  external: [
    'axios/lib/helpers/buildURL',
    'axios/lib/utils',
    'axios/lib/core/settle',
    'axios/lib/core/createError',
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      exclude: 'node_modules/**',
    }),
    commonjs({
      namedExports: {},
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}
