// Properties expose the API for each resource
var properties = require('../../assets/properties.json');
var resources = require('../../config.json').resources;
var utils = require('../../helpers/utils');
var models = require('../../helpers/models');
var testUser = {
  email: 'tester@monoapps.co',
  status: 1,
  date: new Date().getTime()
};
var key, thetext;

describe('login, navbar, filter, logout', function() {

  beforeEach(function(done) {
    models.users.Insert(testUser, function(err, users){
      users = (users.ops ? users.ops : users);
      expect(err).toBe(null);
      expect(users.length).toBe(1);

      var user = users[0];
      key = user._id.toString();
      var options = {
        key: key,
        text: utils.createUUID()
      };
      utils.createPwd(options, function(pwd, text){

        expect(text).toEqual(jasmine.any(String));
        expect(pwd.type).toEqual(jasmine.any(String));
        expect(pwd.value).toEqual(jasmine.any(String));

        thetext = text;
        var query = {'_id': key};
        user.password = pwd;
        models.users.UpdateByObjectId(query, user, '_id', function(err, ack){
          expect(err).toBe(null);
          expect(ack.result.nModified).toBe(1);
          done();
        });
      });
    });
  });

  afterEach(function() {
    models.users.Remove(testUser, function(err, ack){
      expect(err).toEqual(jasmine.any(String));
      expect(ack).toBe(1);
    });
  });

  it('should select a theme and CRUD a group', function() {
    browser.get('http://deck.wrine.co');
    browser.waitForAngular();
    element(by.model('user.email')).sendKeys(testUser.email);
    element(by.model('user.password')).sendKeys(thetext);
    element(by.id('loginLink')).click();

    var queryToken = 'return window.localStorage.getItem("token");';
    browser.executeScript(queryToken).then(function(token,b){
      expect(token).toBe(24);
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

    element( by.css('[ng-click="logout()"]') ).click();
  });
});
