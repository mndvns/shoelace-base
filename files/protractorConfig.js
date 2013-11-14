exports.config = {
  seleniumServerJar: './selenium/selenium-server-standalone-2.37.0.jar',
  selieniumPort: 4444,
  chromeDriver: './selenium/chromedriver',
  seleniumArgs: [],
  baseUrl: '',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['tests/main.spec.js'],
  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  }
};
