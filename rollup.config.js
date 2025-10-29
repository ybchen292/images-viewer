import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'ImagesViewer',
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        ecma: 2020,
        module: true,
        warnings: false,
        comparisons: true,
        conditionals: true,
        booleans: true,
        loops: true,
        unused: true,
        toplevel: true,
        unsafe_proto: true,
        passes: 3,
      },
      mangle: {
        properties: {
          regex: /^_[^_]/,
        },
      },
      output: {
        comments: false,
      },
    }),
  ],
};
