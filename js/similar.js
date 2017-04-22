'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var similarParentNode = userDialog.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/code-and-magick/data';
  var setup = document.querySelector('.setup');

  var successHandler = function (data) {
    similarParentNode.classList.remove('hidden');
    window.wizards.list = data;
    window.wizards.updateWizards();
  };

  var errorHandler = function (massage) {
    node.textContent = massage;
    if (!setup.classList.contains('hidden')) {
      node.classList.remove('hidden');
    }
  };

  var node = document.createElement('div');
  node.classList.add('error-message');
  node.classList.add('hidden');
  document.body.insertAdjacentElement('afterbegin', node);

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.wizards.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.wizards.eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.wizards = {
    coatColor: 'rgb(101, 137, 164)',
    eyesColor: 'black',
    list: [],
    updateWizards: function () {
      similarListElement.innerHTML = '';
      similarListElement.appendChild(window.appendWizards(similarWizardTemplate, window.wizards.list.sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }), 4));
    }};

  window.load(URL, successHandler, errorHandler);
})();
