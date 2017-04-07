'use strict';

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

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

var FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var similarWizardObjectProperties = [
  NAMES,
  SURNAMES,
  COAT_COLOR,
  EYES_COLOR];

var similarWizardObjectKeys = [
  'name',
  'coatColor',
  'eyesColor'];

var similarWizardsList = makeSimilarWizardsList(similarWizardObjectKeys, similarWizardObjectProperties, 4);

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarListElement = userDialog.querySelector('.setup-similar-list');
// var similarParentNode = userDialog.querySelector('.setup-similar');

var fragment = document.createDocumentFragment();

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupSubmit = setup.querySelector('.setup-submit');
var setupUserName = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');
var setupForm = setup.querySelector('.setup-wizard-form');

var onEnterKeydownShowSetup = function (evt) {
  if (isCertainKeyDown(evt, ENTER_KEY_CODE)) {
    showElement(setup);
    addHandlersOnSetup();
  }
};

var onEscKeydownHideSetup = function (evt) {
  if (isCertainKeyDown(evt, ESC_KEY_CODE) && evt.target !== setupUserName) {
    hideElement(setup);
    removeHandlersOnSetup();
  }
};

var onEnterKeydownHideSetup = function (evt) {
  if (isCertainKeyDown(evt, ENTER_KEY_CODE)) {
    hideElement(setup);
    removeHandlersOnSetup();
  }
};

var onEnterKeydownCheckAndHideSetup = function (evt) {
  if (isCertainKeyDown(evt, ENTER_KEY_CODE) && setupForm.validity.valid) {
    hideElement(setup);
    removeHandlersOnSetup();
  }
};

var onButtonClickHideSetup = function () {
  hideElement(setup);
  removeHandlersOnSetup();
};

var onButtonClickCheckAndHideSetup = function () {
  if (setupForm.validity.valid) {
    hideElement(setup);
    removeHandlersOnSetup();
  }
};

var onButtonClickShowSetup = function () {
  showElement(setup);
  addHandlersOnSetup();
};

var onCoatClick = function () {
  changeElementFill(wizardCoat, COAT_COLOR);
};

var onEyesClick = function () {
  changeElementFill(wizardEyes, EYES_COLOR);
};

var onFireballClick = function () {
  changeElementBackground(fireball, FIREBALL_COLOR);
};

function showElement(element) {
  element.classList.remove('hidden');
}

function hideElement(element) {
  element.classList.add('hidden');
}

function isCertainKeyDown(evt, certainKeyCode) {
  return evt.keyCode === certainKeyCode;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomProperty(array) {
  var item = array[getRandomNumber(0, array.length - 1)];
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

function changeElementFill(element, colorsList) {
  element.style.fill = getRandomProperty(colorsList);
}

function changeElementBackground(element, colorsList) {
  element.style.background = getRandomProperty(colorsList);
}

function addHandlersOnSetup() {
  setupSubmit.addEventListener('click', onButtonClickCheckAndHideSetup);
  document.addEventListener('keydown', onEscKeydownHideSetup);
  setupSubmit.addEventListener('keydown', onEnterKeydownCheckAndHideSetup);
  setupClose.addEventListener('keydown', onEnterKeydownHideSetup);
  setupClose.addEventListener('click', onButtonClickHideSetup);
  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  fireball.addEventListener('click', onFireballClick);
}

function removeHandlersOnSetup() {
  setupSubmit.removeEventListener('click', onButtonClickCheckAndHideSetup);
  document.removeEventListener('keydown', onEscKeydownHideSetup);
  setupSubmit.removeEventListener('keydown', onEnterKeydownCheckAndHideSetup);
  setupClose.removeEventListener('keydown', onEnterKeydownHideSetup);
  setupClose.removeEventListener('click', onButtonClickHideSetup);
  wizardCoat.removeEventListener('click', onCoatClick);
  wizardEyes.removeEventListener('click', onEyesClick);
  fireball.removeEventListener('click', onFireballClick);
}

similarListElement.appendChild(renderWizards(similarWizardTemplate, similarWizardsList, fragment));
setupOpen.addEventListener('click', onButtonClickShowSetup);
setupOpenIcon.addEventListener('keydown', onEnterKeydownShowSetup);
