import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  plugins: [babel({
    // runtimeHelpers: true,
    exclude: 'node_modules/**',
  })],
  external: [...external, '@babel/core']
};
