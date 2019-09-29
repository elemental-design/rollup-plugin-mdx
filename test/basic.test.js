import React from 'react';

import renderer from 'react-test-renderer';

import { BasicContainer } from './dist/basic.es';

// require('source-map-support').install();

// process.chdir(__dirname);

test('Link changes the class when hovered', async () => {
  

  const component = renderer.create(
    <div>
      <BasicContainer />
    </div>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/*
const bundle = await rollup
    .rollup({
      input: 'samples/basic.js',
      plugins: [
        mdx(),
        babel({
          exclude: 'node_modules/**',
        }),
      ]
    });

  const { output: [{ code }] } = await bundle.generate({
    format: 'es'
  });
  const exports = {};
  const fn = new Function('exports', code);

  fn(exports);
  const { BasicContainer } = exports;
*/
