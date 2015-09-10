'use strict';
var _ = require('lodash');

module.exports = function (reflection) {
  return {
    callsiteArguments: function test(event) {
      if (_.isUndefined(event.event)) {}
    }
  };
};
