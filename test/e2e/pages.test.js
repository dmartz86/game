var pages = require('../../config.json').pages;

describe('resources', function(){

  it('should CRUDS resources', function() {

    pages.forEach(function(p) {
      browser.get(require('../../config.json').URL.BASE+'/'+p);
      browser.manage().window().maximize();

      expect($('title')).toBe(p);
    });
  });

});
