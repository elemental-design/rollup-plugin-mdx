'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var rollupPluginutils = require('rollup-pluginutils');
var mdx = _interopDefault(require('@mdx-js/mdx'));
var babel = require('@babel/core');

const ext = /\.md$|\.mdx$/;
const DEFAULT_RENDERER = `
import React from 'react'
import { mdx } from '@mdx-js/react'
`;
function md(options = {}) {
  const filter = rollupPluginutils.createFilter(options.include, options.exclude);
  const {
    renderer = DEFAULT_RENDERER
  } = options;
  return {
    name: 'mdx',

    transform(content, filename) {
      if (!ext.test(filename) || !filter(filename)) {
        return null;
      }

      const opts = Object.assign({}, {
        filepath: path.resolve(filename)
      }, options);
      return mdx(content, opts).then(result => {
        const code = `${renderer}\n${result}`;
        const {
          babelOptions = {}
        } = options;
        const config = babel.loadPartialConfig({ ...babelOptions,
          filename
        });
        const transformOptions = config.options;
        const {
          code: transpiled
        } = babel.transformSync(code, transformOptions);
        return {
          code: transpiled,
          map: {
            mappings: ''
          }
        };
      });
    }

  };
}

module.exports = md;
//# sourceMappingURL=rollup-plugin-mdx.cjs.js.map
