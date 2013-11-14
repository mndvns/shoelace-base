/**
 * Initilize NAME module.
 */

var angular = window.angular || require('angular');
var NAME = angular.module('PROJECT', []);

/**
 * Expose NAME.
 */

exports = module.exports = NAME;

exports.directive('ALIAS_CC', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {

      var content = angular.element(element[1]);
      content.remove();
      content.addClass('ALIAS');

      var container = angular.element(document.createElement('div'));
      container.addClass('ALIAS-container');
      container.append(content);

      var bg = angular.element(document.createElement('div'));
      bg.addClass('bg');
      bg.on('click', close);
      container.append(bg);

      var link = angular.element(element[0]);
      link.attr('href', 'javascript:;');
      link.on('click', open);

      document.body.appendChild(container[0]);

      scope.open = open;
      function open() {
        container.addClass('active');
      }

      scope.close = close;
      function close() {
        container.removeClass('active');
      }

      scope.$on('$destroy', function() {
        document.body.removeChild(container[0]);
      });
    }
  };
});

