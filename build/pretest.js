const {SourceMapDevToolPlugin, DllPlugin} = require('webpack');
const {AotPlugin} = require('@ngtools/webpack');

module.exports = function () {
  return {
    plugins: [
      new AotPlugin({
        "mainPath": "main.ts",
        "hostReplacementPaths": {
          "environments/environment.ts": "environments/environment.ts"
        },
        "exclude": [],
        "tsConfigPath": "src/tsconfig.spec.json",
        "skipCodeGeneration": true
      }),
      new DllPlugin({
        name: 'pretest',
        path: 'dist/pretest-manifest.json',
      }),
      new SourceMapDevToolPlugin({
        filename: null, // if no value is provided the sourcemap is inlined
        test: /\.(ts|js)($|\?)/i // process .js and .ts files only
      })
    ],

    entry: {
      pretest: ['./src/pretest.ts'],
    },

    output: {
      filename: 'pretest.bundle.js',
      path: "dist",
      library: 'pretest',
    }
  }
};
