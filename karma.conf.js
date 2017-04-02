module.exports = function (config) {
  const webpackConfig = require("./webpack.config")({mode: 'test'});

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './dist/pretest.bundle.js', watched: false, served: true },
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['webpack', 'sourcemap']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress'],

    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
