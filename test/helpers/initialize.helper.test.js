module.exports = function(browser,path){

  browser.get(require('../../config.json').URL.BASE+(path||''));
  browser.manage().window().maximize();
  browser.waitForAngular();

};
