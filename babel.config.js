/* eslint-disable quote-props, quotes, comma-dangle */

module.exports = {
  "presets": [
    ["@babel/env", { "modules": false, "targets": { "node": "current" } }]
  ],
  "env": {
    "test": {
      "presets": [
        ["@babel/preset-env", {
          "targets": { "node": "current" }
        }],
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-proposal-class-properties"
      ]
    }
  }
}
