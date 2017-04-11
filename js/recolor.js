'use strict';
window.recolor = (function () {
  return {
    changeElementColor: function (element, colorsList, callback) {
      callback(element, window.utils.getRandomProperty(colorsList));
    }
  };
})();
