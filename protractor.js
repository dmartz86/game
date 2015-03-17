
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./test/e2e/login.test.js'],
  multiCapabilities: [
  //{ browserName: 'firefox' },
    { browserName: 'chrome'}
  ]
};
