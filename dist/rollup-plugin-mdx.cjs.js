'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var mdx = _interopDefault(require('@mdx-js/mdx'));

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

    transform(content, id) {
      if (!ext.test(id) || !filter(id)) {
        return null;
      }

      return mdx(content, options).then(result => {
        const code = `${renderer}\n${result}`; //         const code = `
        // import React from 'react'
        // import { mdx } from '@mdx-js/react'
        // /* @jsx mdx */
        // const makeShortcode = name => function MDXDefaultShortcode(props) {
        //     console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope")
        //   return <div {...props}/>
        // };
        // const layoutProps = {
        // };
        // const MDXLayout = "wrapper"
        // export default function MDXContent({
        //     components,
        //   ...props
        // }) {
        //     return <MDXLayout {...layoutProps} {...props} components={components} mdxType="MDXLayout">
        //     <h1>{\`Test Title\`}</h1>
        //     <p>{\`Test document with \`}<strong parentName=\"p\">{\`bold\`}</strong>{\` and \`}<em parentName="p">{\`italics\`}</em>{\` text.\`}</p>
        //     </MDXLayout>;
        // }
        // ;
        // MDXContent.isMDXComponent = true;
        //         `;
        // console.log(JSON.stringify(code, null, 2));

        return {
          code,
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
