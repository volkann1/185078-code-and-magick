'use strict';
(function () {
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
  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var artifactsElement = setup.querySelector('.setup-artifacts');
  var userDialog = document.querySelector('.setup');
  var similarParentNode = userDialog.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var draggedItem = null;

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/code-and-magick/data';

  var coatColor = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'];

  var eyesColor = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'];

  var fireballColor = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'];

  var toCopy = true;

  var node = document.createElement('div');
  node.classList.add('error-message');
  node.classList.add('hidden');
  document.body.insertAdjacentElement('afterbegin', node);

  var onEnterKeydownShowSetup = function (evt) {
    if (window.utils.isEnterKeyDown(evt)) {
      window.utils.showElement(setup);
      addHandlersOnSetup();
      window.load(URL, successHandler, errorHandler);
    }
  };

  var onEscKeydownHideSetup = function (evt) {
    if (window.utils.isEscKeyDown(evt) && evt.target !== setupUserName) {
      window.utils.hideElement(setup);
      removeHandlersOnSetup();
      hideErrorMessage();
    }
  };

  var onEnterKeydownHideSetup = function (evt) {
    if (window.utils.isEnterKeyDown(evt)) {
      window.utils.hideElement(setup);
      removeHandlersOnSetup();
      hideErrorMessage();
    }
  };

  var onEnterKeydownCheckAndHideSetup = function (evt) {
    if (window.utils.isEnterKeyDown(evt) && setupForm.validity.valid) {
      window.utils.hideElement(setup);
      removeHandlersOnSetup();
      hideErrorMessage();
    }
  };

  var onButtonClickHideSetup = function () {
    window.utils.hideElement(setup);
    removeHandlersOnSetup();
    hideErrorMessage();
  };

  var onButtonClickCheckAndHideSetup = function () {
    if (setupForm.validity.valid) {
      window.utils.hideElement(setup);
      removeHandlersOnSetup();
      hideErrorMessage();
    }
  };

  var onButtonClickShowSetup = function () {
    window.utils.showElement(setup);
    addHandlersOnSetup();
    window.load(URL, successHandler, errorHandler);
  };

  var onElementDragStart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.classList.add('setup-artifacts--on-drag-start');
      toCopy = true;
    }
  };

  var onArtifactDragStart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.classList.add('setup-artifacts--on-drag-start');
      toCopy = false;
    }
  };

  var onElementDragOver = function (evt) {
    evt.preventDefault();
  };

  var onElementDragEnter = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'div' && evt.target.children.length === 0) {
      evt.target.classList.add('setup-artifacts-cell--drop-zone');
      evt.preventDefault();
    }
  };

  var onElementDragLeave = function (evt) {
    if (evt.target.classList.contains('setup-artifacts-cell--drop-zone')) {
      evt.target.classList.remove('setup-artifacts-cell--drop-zone');
      evt.preventDefault();
    }
  };

  var onElementDrop = function (evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() === 'div' && evt.target.children.length === 0) {
      evt.target.classList.remove('setup-artifacts-cell--drop-zone');
      if (toCopy) {
        evt.target.appendChild(draggedItem.cloneNode(false));
      } else {
        evt.target.appendChild(draggedItem);
      }
    }
    artifactsElement.classList.remove('setup-artifacts--on-drag-start');
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var successHandler = function (data) {
    similarListElement.appendChild(window.appendWizards(similarWizardTemplate, data, 4));
    similarParentNode.classList.remove('hidden');
  };

  var errorHandler = function (massage) {
    node.textContent = massage;
    node.classList.remove('hidden');
  };

  setupOpen.addEventListener('click', onButtonClickShowSetup);
  setupOpenIcon.addEventListener('keydown', onEnterKeydownShowSetup);

  function hideErrorMessage() {
    if (!node.classList.contains('hidden')) {
      node.classList.add('hidden');
    }
  }

  function addHandlersOnSetup() {
    setupSubmit.addEventListener('click', onButtonClickCheckAndHideSetup);
    document.addEventListener('keydown', onEscKeydownHideSetup);
    setupSubmit.addEventListener('keydown', onEnterKeydownCheckAndHideSetup);
    setupClose.addEventListener('keydown', onEnterKeydownHideSetup);
    setupClose.addEventListener('click', onButtonClickHideSetup);
    window.colorizeElement(wizardCoat, coatColor, fillElement);
    window.colorizeElement(wizardEyes, eyesColor, fillElement);
    window.colorizeElement(fireball, fireballColor, changeElementBackground);
    shopElement.addEventListener('dragstart', onElementDragStart);
    artifactsElement.addEventListener('dragover', onElementDragOver);
    artifactsElement.addEventListener('dragenter', onElementDragEnter);
    artifactsElement.addEventListener('dragleave', onElementDragLeave);
    artifactsElement.addEventListener('drop', onElementDrop);
    artifactsElement.addEventListener('dragstart', onArtifactDragStart);
  }

  function removeHandlersOnSetup() {
    setupSubmit.removeEventListener('click', onButtonClickCheckAndHideSetup);
    document.removeEventListener('keydown', onEscKeydownHideSetup);
    setupSubmit.removeEventListener('keydown', onEnterKeydownCheckAndHideSetup);
    setupClose.removeEventListener('keydown', onEnterKeydownHideSetup);
    setupClose.removeEventListener('click', onButtonClickHideSetup);
    shopElement.removeEventListener('dragstart', onElementDragStart);
    artifactsElement.removeEventListener('dragover', onElementDragOver);
    artifactsElement.removeEventListener('dragenter', onElementDragEnter);
    artifactsElement.removeEventListener('dragleave', onElementDragLeave);
    artifactsElement.removeEventListener('drop', onElementDrop);
    artifactsElement.removeEventListener('dragstart', onArtifactDragStart);
  }
})();
