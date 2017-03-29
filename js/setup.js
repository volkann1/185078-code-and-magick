'use strict';
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
var k = makeSimilarWizard(similarWizardObjectKeys, similarWizardObjectProperties);
var similarWizardsList = makeSimilarWizardsList(similarWizardObjectKeys, similarWizardObjectProperties, 4);
var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarParentNode = userDialog.querySelector('.setup-similar');
var fragment = document.createDocumentFragment();

function getRandomNumer(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomProperty(array) {
  var item = array[getRandomNumer(0, array.length - 1)];
  return item;
}

function makeSimilarWizard(keysArray, propertiesArray) {
  var newObject = {};
  newObject[keysArray[0]] = Math.random() > 0.5 ? getRandomProperty(propertiesArray[0]) + ' ' + getRandomProperty(propertiesArray[1]) : getRandomProperty(propertiesArray[1]) + ' ' + getRandomProperty(propertiesArray[0]);
  for (var i = 1; i < keysArray.length; i++) {
    newObject[keysArray[i]] = getRandomProperty(propertiesArray[i + 1]);
  }
  return newObject;
}

function makeSimilarWizardsList(keysArray, propertiesArray, arrayLength) {
  var array = [];
  for (var i = 0; i < arrayLength; i++) {
    array[i] = makeSimilarWizard(keysArray, propertiesArray);
  }
  return array;
}

function renderWizard(templateContent, similarWizardObject) {
  var wizardElement = templateContent.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = similarWizardObject.name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizardObject.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizardObject.eyesColor;
  return wizardElement;
}

function renderWizards(templateContent, wizards, documentFragment) {
  for (var i = 0; i < wizards.length; i++) {
    documentFragment.appendChild(renderWizard(templateContent, wizards[i]));
  }
  return documentFragment;
}

similarListElement.appendChild(renderWizards(similarWizardTemplate, similarWizardsList, fragment));
userDialog.classList.remove('hidden');
similarParentNode.classList.remove('hidden');
