const path = require('path');
const {CommonsChunkPlugin} = require('webpack').optimize;
const {AotPlugin} = require('@ngtools/webpack');
const nodeModules = path.join(process.cwd(), 'node_modules');
const {CriticalPlugin} = require('@nrwl/webpack-plugin-critical');

module.exports = function () {
  return {
    plugins: [
      new AotPlugin({
        "mainPath": "main.ts",
        "hostReplacementPaths": {
          "environments/environment.ts": "environments/environment.ts"
        },
        "exclude": [],
        "tsConfigPath": "src/tsconfig.app.json"
      }),
      new CommonsChunkPlugin({
        "name": "inline",
        "minChunks": null
      }),
      new CommonsChunkPlugin({
        "name": "vendor",
        "minChunks": (module) => module.resource && module.resource.startsWith(nodeModules),
        "chunks": [
          "main"
        ]
      }),
      new CriticalPlugin({
        src: 'index.html',
        inline: true,
        minify: true,
        dest: 'index.html'
      })
      })
    ],

    entry: {
      "main": [
        "./src/main.ts"
      ],
      "polyfills": [
        "./src/polyfills.ts"
      ]
    },

    output: {
      "path": path.join(process.cwd(), "dist"),
      "filename": "[name].bundle.js",
      "chunkFilename": "[id].chunk.js"
    }
  };
};
