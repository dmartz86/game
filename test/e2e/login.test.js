describe('angularjs homepage todo list', function() {
  /**
  beforeEach(function() {
    var cleanQuery = 'window.localStorage.clear();';
    browser.executeScript(cleanQuery).then(function(){
    });
  });
  **/

  it('should add a todo', function() {
    browser.get('http://deck.wrine.co');
    //browser.waitForAngular();
    element(by.model('user.email')).sendKeys('tester@monoapps.co');
    element(by.model('user.password')).sendKeys('');
    element(by.id('doLogin')).click();
    //browser.pause();
    var query = 'return window.localStorage.getItem("token");';
    browser.executeScript(query).then(function(token,b){
      expect(token.length).toBe(24);
    });
  });
});
