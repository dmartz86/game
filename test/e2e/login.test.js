describe('login, navbar, filter', function() {
  /**
  beforeEach(function() {
    var cleanQuery = 'window.localStorage.clear();';
    browser.executeScript(cleanQuery).then(function(){
    });
  });
  **/

  it('should pass login', function() {
    browser.get('http://deck.wrine.co');
    browser.waitForAngular();
    element(by.model('user.email')).sendKeys('tester@monoapps.co');
    element(by.model('user.password')).sendKeys('');
    element(by.id('loginLink')).click();
    var query = 'return window.localStorage.getItem("token");';
    browser.executeScript(query).then(function(token,b){
      expect(token.length).toBe(24);
    });

    var resourcesRepeater = element.all(by.repeater('r in resources'));
    expect(resourcesRepeater.count()).toEqual(4);

    var resourceList = element.all(by.binding('r'));
    expect(resourceList.count()).toEqual(4);
    expect(resourceList.get(0).getInnerHtml()).toEqual('groups');
    expect(resourceList.get(1).getInnerHtml()).toEqual('roles');
    expect(resourceList.get(2).getInnerHtml()).toEqual('tasks');
    expect(resourceList.get(3).getInnerHtml()).toEqual('products');

    var themeList = element.all(by.repeater('t in themes'));
    expect(themeList.count()).toEqual(16);

    element(by.id('resourcesLink')).click();
    resourceList.get(0).click();

    element(by.id('addLink')).click();
    browser.sleep(1000);

    var groupName = 'Group' + new Date().getTime();
    var nameInput = element(by.model('$parent.edit.name'));
    browser.sleep(1000);
    nameInput.sendKeys(groupName);

    element(by.id('createLink')).click();
    browser.sleep(1000);

    var searchInput = element(by.model('$parent.search'));
    browser.sleep(1000);
    searchInput.sendKeys(groupName);
    browser.sleep(1000);
    expect(searchInput.getAttribute('value')).toBe(groupName);

    var groupList = element.all(by.repeater('f in $parent.feed'));
    expect(groupList.count()).toEqual(1);

    element(by.id('deleteLink')).click();
    searchInput.sendKeys(groupName);
    expect(searchInput.getAttribute('value')).toBe(groupName);

    groupList = element.all(by.repeater('f in $parent.feed'));
    expect(groupList.count()).toEqual(0);
  });
});
