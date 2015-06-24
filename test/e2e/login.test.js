// Properties expose the API for each resource
var properties = require('../../assets/properties.json');
var resources = require('../../config.json').resources;
var utils = require('../../helpers/utils');
var models = require('../../helpers/models');
var initialize = require('../helpers/initialize');
var testUser = {
  email: 'tester@monoapps.co',
  status: 1,
  date: new Date().getTime()
};
var key, thetext;

describe('login, navbar, filter, logout', function() {

  beforeEach(function(done) {
    models.users.Insert(testUser, function(err, users) {
      if(err) { process.exit(); }

      users = (users.ops ? users.ops : users);
      expect(err).toBe(null);
      expect(users.length).toBe(1);

      var user = users[0];
      key = user._id.toString();
      var options = {
        key: key,
        text: utils.createUUID()
      };
      utils.createPwd(options, function(pwd, text) {
        expect(text).toEqual(jasmine.any(String));
        expect(pwd.type).toEqual(jasmine.any(String));
        expect(pwd.value).toEqual(jasmine.any(String));

        thetext = text;
        var query = {'_id': key};
        user.password = pwd;
        models.users.UpdateByObjectId(query, user, '_id', function(err, ack) {
          expect(err).toBe(null);
          expect(ack.result.nModified).toBe(1);
          done();
        });
      });
    });
  });

  afterEach(function() {
    models.users.Remove(testUser, function(err, ack) {
      expect(err).toEqual(null);
      expect(ack.result.ok).toBe(1);
    });
  });

  it('should change theme', function() {
    initialize(browser);

    element(by.model('user.email')).sendKeys(testUser.email);
    element(by.model('user.password')).sendKeys(thetext);
    element(by.css('[ng-click="login()"]')).click();

    var resourceList = element.all(by.binding('r'));
    expect(resourceList.count()).toEqual(4);

    properties.resources.forEach(function(r,i) {
      resourceList.get(i).getInnerHtml().then(function(a,b) {
        expect(a.toLowerCase()).toEqual(r);
      });
    });

    var themeList = element.all(by.repeater('t in themes'));
    expect(themeList.count()).toEqual(16);

    themeList.each(function(e,i) {
      element(by.id('themesLink')).click();
      element(by.id('theme'+i)).click();
    });
  });

  it('should CRUD and search each resource', function() {
    initialize(browser);

    var resourceList = element.all(by.binding('r'));
    expect(resourceList.count()).toEqual(4);

    properties.resources.forEach(function(r,i) {
      resourceList.get(i).click();
      itemList = element.all(by.repeater('f in $parent.feed'));
      itemList.count().then(function(size){
        var resName = r + new Date().getTime();
        var inputName = element(by.model('$parent.edit.name'));
        inputName.sendKeys(resName);

        element(by.id('createLink')).click();

        var searchInput = element(by.model('$parent.search'));
        searchInput.sendKeys(resName);
        expect(searchInput.getAttribute('value')).toBe(resName);

        var itemTwiceList = element.all(by.repeater('f in $parent.feed'));
        expect(itemTwiceList.count()).toEqual(1);

        var itemBind = element.all(by.binding('f'));
        itemBind.get(0).click();

        element(by.css('[ng-click="$parent.delete()"]')).click();

        var itemAgainList = element.all(by.repeater('f in $parent.feed'));
        expect(itemAgainList.count()).toEqual(size);
      });
    });
  });

  it('should destroy session', function() {
    initialize(browser);

    element( by.css('[ng-click="logout()"]') ).click();
  });
});
