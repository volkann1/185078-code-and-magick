'use strict';
window.recolor = (function () {
  return {
    changeElementColor: function (element, colorsList, callback) {
      callback(element, window.utils.getRandomProperty(colorsList));
    },

    changeElementFill: function (element, color) {
      element.style.fill = color;
    },

    changeElementBackground: function (element, color) {
      element.style.background = color;
    },

    coatColor: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'],

    eyesColor: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'],

    fireballColor: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848']
  };
})();
