'use strict';

var reflection, fixtures;
var t = require('chai').assert;

describe('reflection', function () {
  beforeEach(function () {
    reflection = require('./');
    fixtures = require('./reflection.test.fixtures')(reflection);
  });

  describe('callSiteArguments', function () {
    it('should return the CallExpression arguments', function () {
      t.deepEqual(
        reflection(fixtures.callsiteArguments)
        .getCallExpressionFromMemberExpression('_.isUndefined')
        .arguments()
        .getNames(), ['event.event']);
    });
  });
});
