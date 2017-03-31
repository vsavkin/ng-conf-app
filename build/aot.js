const path = require('path');
const {CommonsChunkPlugin} = require('webpack').optimize;
const {AotPlugin} = require('@ngtools/webpack');
const nodeModules = path.join(process.cwd(), 'node_modules');

module.exports = function (env) {
  const locale = env.locale;

  const i18nConfig = (!locale || locale === 'en') ? {} : {
    i18nFile: './translations/messages.' + locale + '.xlf',
    i18nFormat: 'xlf',
    locale: locale
  };

  return {
    plugins: [
      new AotPlugin(Object.assign({
        "mainPath": "main.ts",
        "hostReplacementPaths": {
          "environments/environment.ts": "environments/environment.ts"
        },
        "exclude": [],
        "tsConfigPath": "src/tsconfig.app.json"
      }, i18nConfig)),
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
      })
    ],

    entry: {
      "main": [
        "./src/main.ts"
      ],
      "polyfills": [
        "./src/polyfills.ts"
      ],
      "styles": [
        "./src/styles.css"
      ]
    },

    output: {
      "path": path.join(process.cwd(), "dist"),
      "filename": "[name].bundle.js",
      "chunkFilename": "[id].chunk.js"
    }
  };
};
