// Properties expose the API for each resource
var properties = require('../../assets/properties.json');
var resources = require('../../config.json').resources;
var utils = require('../../helpers/utils');
var models = require('../../helpers/models');

describe('bad login credentials', function() {
  it('should return 401', function() {
    browser.get('http://deck.wrine.co');
    browser.waitForAngular();
    element(by.model('user.email')).sendKeys('unauthorized@monoapps.co');
    element(by.model('user.password')).sendKeys('unauthorized');
    element(by.id('loginLink')).click();

    expect(element(by.binding('error')).getInnerHtml()).toEqual('Unauthorized');
  });
});
