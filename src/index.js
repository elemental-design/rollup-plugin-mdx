import { createFilter } from 'rollup-pluginutils';
import mdx from '@mdx-js/mdx';
import * as babel from '@babel/core';

const ext = /\.md$|\.mdx$/;

const DEFAULT_RENDERER = `
import React from 'react'
import { mdx } from '@mdx-js/react'
`;


export default function md(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const { renderer = DEFAULT_RENDERER } = options;

  return {
    name: 'mdx',

    transform(content, filename) {
      if (!ext.test(filename) || !filter(filename)) {
        return null;
      }

      return mdx(content, options).then((result) => {
        const code = `${renderer}\n${result}`;

        const { babelOptions = {} } = options;

        const config = babel.loadPartialConfig({ ...babelOptions, filename });

        const transformOptions = config.options;

        const { code: transpiled } = babel.transformSync(code, transformOptions);

        return {
          code: transpiled,
          map: { mappings: '' }
        };
      });
    }
  };
}
