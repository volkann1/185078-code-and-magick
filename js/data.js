'use strict';

window.similarWizardsList = (function () {
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'];

  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'];

  var COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'];

  var EYES_COLOR = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'];

  var similarWizardObjectProperties = [
    NAMES,
    SURNAMES,
    COAT_COLOR,
    EYES_COLOR];

  var similarWizardObjectKeys = [
    'name',
    'coatColor',
    'eyesColor'];

  function makeSimilarWizard(keysArray, propertiesArray) {
    var newObject = {};
    newObject[keysArray[0]] = Math.random() > 0.5 ? window.utils.getRandomProperty(propertiesArray[0]) + ' ' + window.utils.getRandomProperty(propertiesArray[1]) : window.utils.getRandomProperty(propertiesArray[1]) + ' ' + window.utils.getRandomProperty(propertiesArray[0]);
    for (var i = 1; i < keysArray.length; i++) {
      newObject[keysArray[i]] = window.utils.getRandomProperty(propertiesArray[i + 1]);
    }
    return newObject;
  }

  function makeSimilarWizardsList(keysArray, propertiesArray, arrayLength) {
    var arr = [];
    for (var i = 0; i < arrayLength; i++) {
      arr[i] = makeSimilarWizard(keysArray, propertiesArray);
    }
    return arr;
  }

  return makeSimilarWizardsList(similarWizardObjectKeys, similarWizardObjectProperties, 4);
})();
