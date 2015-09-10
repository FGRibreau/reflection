'use strict';
const CALL_EXPRESSION = 'CallExpression';
const MEMBER_EXPRESSION = 'MemberExpression';

const esprima = require('esprima');
const estraverse = require('estraverse');
const _ = require('lodash');

module.exports = function reflection(fn) {
  const ast = esprima.parse(fn.toString());
  return {
    getCallExpressionFromMemberExpression: (memberExpression) => {
      let found;
      estraverse.traverse(ast, {
        enter: function (node) {
          if (!found && node.type === CALL_EXPRESSION && node.callee.type === MEMBER_EXPRESSION && isSame(node.callee, memberExpression)) {
            found = node;
          }
        }
      });

      return {
        arguments: () => {
          return {
            getNames: () => {
              return found.arguments.map((node) => MemberExpression(node).toString());
            }
          };
        }
      }
    }
  }
};


/**
 * @param  {node}  node
 * @param  {String}  memberExpression
 * @return {Boolean}                  true if they are the same
 */
function isSame(node, memberExpressionAsString) {
  return MemberExpression(node).toString() === memberExpressionAsString;
}

function MemberExpression(node) {
  return {
    toString: () => {
      return [node.object.name, node.property.name].join('.');
    }
  }
};
