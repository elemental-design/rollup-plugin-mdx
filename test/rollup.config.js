const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const rollup = require('rollup');

const pkg = require('../package.json');
const external = Object.keys(pkg.dependencies);
const mdx = require('../dist/rollup-plugin-mdx.cjs');


require('source-map-support').install();

(async () => {
  const bundle = await rollup.rollup({
    input: 'samples/basic.js',
    // output: [
    //   { file: 'dist/basic.cjs.js', format: 'cjs', sourcemap: true },
    //   // { file: 'dist/basic.es.js', format: 'es', sourcemap: true }
    // ],
    // output: { format:}
    plugins: [
      mdx(),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.mjs', '.js', '.jsx', '.md'],
      }),
      resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json', '.md'],
      }),
      commonjs(),
      // {
      //   name: 'debug',
      //   transform(content, id) {
      //     console.log(JSON.stringify({ content, id }, null, 2));
      //     return null;
      //   }
      // },
    ],
    external
  });
  
  const code = bundle.generate({ format: 'es' });
  
  console.log(JSON.stringify(code, null, 2));
})();
