'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var similarParentNode = userDialog.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/code-and-magick/data';
  var setup = document.querySelector('.setup');
  var coatColorIntial = 'rgb(101, 137, 164)';
  var eyesColorInitial = 'black';

  var successHandler = function (data) {
    similarParentNode.classList.remove('hidden');
    window.simularWizards.list = data;
    window.simularWizards.updateWizards(coatColorIntial, eyesColorInitial);
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

  var getRank = function (wizard, coatColor, eyesColor) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
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

  window.simularWizards = {
    list: [],
    updateWizards: function (coatColor, eyesColor) {
      similarListElement.innerHTML = '';
      similarListElement.appendChild(window.appendWizards(similarWizardTemplate, window.simularWizards.list.sort(function (left, right) {
        var rankDiff = getRank(right, coatColor, eyesColor) - getRank(left, coatColor, eyesColor);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }), 4));
    }};

  window.load(URL, successHandler, errorHandler);
})();
