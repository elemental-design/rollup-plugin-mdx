# rollup-plugin-mdx
Import `mdx`/`md` markdown files into your app. Runs `("@babel/core").transformSync(code)` on the output.

## Installation

```sh
npm install --save-dev rollup-plugin-mdx
```

## Usage

```js
// rollup.config.js
import mdx from 'rollup-plugin-mdx';

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/bundle.cjs.js',
    format: 'cjs'
  }],
  plugins: [
    mdx({
      // .md and .mdx files are parsed by default,
      include: 'node_modules/**',
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

      // ...mdxOptions
      babelOptions: {/* custom options */}
    })
  ]
};
```
