'use strict';
window.appendWizards = (function () {
  function renderWizard(templateContent, similarWizardObject) {
    var wizardElement = templateContent.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = similarWizardObject.name;
    wizardElement.querySelector('.wizard-coat').style.fill = similarWizardObject.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = similarWizardObject.colorEyes;
    return wizardElement;
  }

  return function (templateContent, wizards, numberOfWizards) {
    var fragment = document.createDocumentFragment();
    var takeNumber = wizards.length > numberOfWizards ? numberOfWizards : wizards.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(templateContent, wizards[i]));
    }
    return fragment;
  };
})();
