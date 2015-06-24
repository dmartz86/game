module.exports = function(browser){
  browser.get('http://deck.wrine.co');
  browser.manage().window().maximize();
  browser.waitForAngular();
};
