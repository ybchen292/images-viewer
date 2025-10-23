import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'default',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'ImageViewer',
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'ImageViewer',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
  ],
};
