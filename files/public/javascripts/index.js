/**
 * Initilize NAME module.
 */

var angular = window.angular || require('angular');
var NAME = angular.module('PROJECT', []);

/**
 * Append a unique element to `body`
 * as `NAMEGroup`. This lets IE7+
 * handle its contents properly.
 */

var body = angular.element(document.body);
var NAMEGroup = document.createElement('div');
NAMEGroup.id = 'ALIAS';
document.body.appendChild(NAMEGroup);

/**
 * Expose NAME.
 */

exports = module.exports = NAME;

/**
 * Define ALIAS directive.
 */

exports.directive('ALIAS_CC', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var active = 'ALIAS-container'

      var content = element.next();
      content.remove();
      content = content[0];
      content.className = 'ALIAS';

      var container = document.createElement('div');
      container.className = active;
      container.appendChild(content);

      var bg = document.createElement('div');
      bg.className = 'bg';
      bg.onclick = close;
      container.appendChild(bg);

      var link = element;
      link.attr('href', 'javascript:;');
      link.on('click', open);

      NAMEGroup.appendChild(container);

      scope.open = open;
      function open() {
        container.className = active + ' active';
      }

      scope.close = close;
      function close() {
        container.className = active;
      }

      scope.$on('$destroy', function() {
        document.body.removeChild(container);
      });

    }
  };
});
