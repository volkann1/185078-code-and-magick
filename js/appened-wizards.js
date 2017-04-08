'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  // var similarParentNode = userDialog.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  // similarParentNode.classList.remove('hidden');

  function renderWizard(templateContent, similarWizardObject) {
    var wizardElement = templateContent.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = similarWizardObject.name;
    wizardElement.querySelector('.wizard-coat').style.fill = similarWizardObject.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = similarWizardObject.eyesColor;
    return wizardElement;
  }

  function renderWizards(templateContent, wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(templateContent, wizards[i]));
    }
    return fragment;
  }

  similarListElement.appendChild(renderWizards(similarWizardTemplate, window.similarWizardsList));
})();
