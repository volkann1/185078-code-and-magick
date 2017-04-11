'use strict';

window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    getMaxItemFromArray: function (array, maxProperty) {
      for (var i = 0; i < array.length; i++) {
        var property = array[i];
        if (property > maxProperty) {
          maxProperty = property;
        }
      }
      return maxProperty;
    },

    isCertainKeyDown: function (evt, certainKeyCode) {
      return evt.keyCode === certainKeyCode;
    },

    isEnterKeyDown: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    },

    isEscKeyDown: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    },

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomProperty: function (array) {
      var item = array[window.utils.getRandomNumber(0, array.length - 1)];
      return item;
    },

    showElement: function (element) {
      element.classList.remove('hidden');
    },

    hideElement: function (element) {
      element.classList.add('hidden');
    }
  };
})();
