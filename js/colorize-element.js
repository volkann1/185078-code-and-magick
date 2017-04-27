'use strict';

window.colorizeElement = function (element, colorsList, callback) {
  if (typeof callback === 'function') {
    element.addEventListener('click', function () {
      callback(element, window.utils.getRandomProperty(colorsList));
    });
  }
};
