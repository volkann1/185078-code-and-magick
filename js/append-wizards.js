'use strict';

window.appendWizards = (function () {
  var renderWizardArtifacts = function (wizard) {
    var artifactsList = wizard.artifacts.map(function (it) {
      return it.name;
    }).join('<br>');
    return artifactsList;
  };

  function renderWizard(templateContent, similarWizardObject) {
    var wizardElement = templateContent.cloneNode(true);
    var wizardImageElement = wizardElement.querySelector('.setup-similar-content');
    wizardElement.querySelector('.setup-similar-label').textContent = similarWizardObject.name;
    wizardElement.querySelector('.wizard-coat').style.fill = similarWizardObject.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = similarWizardObject.colorEyes;

    window.popup(wizardImageElement, function () {
      return renderWizardArtifacts(similarWizardObject);
    });

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
