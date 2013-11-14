/**
 * Module dependencies.
 */

var server = require('./server')();
var protractor = require('protractor');
var tractor = protractor.getInstance();
var protractorConfig = require('../protractorConfig');
var webdriver = require('selenium-webdriver');

/**
 * Define module elements.
 */

var section = tractor.findElement(protractor.By.css('[data-ALIAS-start]'))
var container = tractor.findElement(protractor.By.css('.ALIAS-container'));

/**
 * Run tests.
 */


describe('title', function() {
  it('should be set to module name', function(done) {
    expect(browser.driver.getTitle()).toContain('PROJECT');
  });
});

describe('PROJECT', function() {
  it('should not be displayed on load', function() {
    expect(container.getCssValue('display')).toEqual('none');
  });

  it('should not be displayed on click', function() {
    section.click(function(err) {
      expect(container.getCssValue('display')).toEqual('block');
    });
  });
});

