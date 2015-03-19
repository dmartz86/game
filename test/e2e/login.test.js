var properties = require('../../assets/properties.json');

describe('login, navbar, filter', function() {

  beforeEach(function() {
    //TODO: Create the test user.
  });

  afterEach(function() {
    //TODO: Delete the test user.
  });

  it('should select theme and CRUD a group', function() {
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

    properties.resources.forEach(function(r,i){
      expect(resourceList.get(i).getInnerHtml()).toEqual(r);
    });

    var themeList = element.all(by.repeater('t in themes'));
    expect(themeList.count()).toEqual(16);

    themeList.each(function(e,i){
      element(by.id('themesLink')).click();
      element(by.id('theme'+i)).click();
    });

    element(by.id('resourcesLink')).click();
    resourceList.get(0).click();
    element(by.id('addLink')).click();

    var groupName = 'Group' + new Date().getTime();
    var nameInput = element(by.model('$parent.edit.name'));
    nameInput.sendKeys(groupName);

    element(by.id('createLink')).click();

    var searchInput = element(by.model('$parent.search'));
    searchInput.sendKeys(groupName);
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
