// setup-randomize-wizard.js

'use strict';

(function () {

  var setupDomElement = document.querySelector('.setup');
  var setupWizardDomElement = setupDomElement.querySelector('.setup-wizard');

  randomizeWizardCoat();
  randomizeWizardEyes();
  randomizeWizardFireball();

  function randomizeWizardCoat() {
    var wizardCoatElt = setupWizardDomElement.querySelector('.wizard-coat');
    var inputCoatColorElt = setupDomElement.querySelector('input[name=coat-color]');
    randomizeWizardProperty(wizardCoatElt, 'fill', inputCoatColorElt, window.WIZARD.COAT_COLORS);
  }
  function randomizeWizardEyes() {
    var wizardEyesElt = setupWizardDomElement.querySelector('.wizard-eyes');
    var inputEyesColorElt = setupDomElement.querySelector('input[name=eyes-color]');
    randomizeWizardProperty(wizardEyesElt, 'fill', inputEyesColorElt, window.WIZARD.EYES_COLORS);
  }
  function randomizeWizardFireball() {
    var setupFireballWrapElt = setupDomElement.querySelector('.setup-fireball-wrap');
    var inputFireballColorElt = setupDomElement.querySelector('input[name=fireball-color]');
    randomizeWizardProperty(setupFireballWrapElt, 'background-color', inputFireballColorElt, window.WIZARD.FIREBALL_COLORS);
  }

  function randomizeWizardProperty(clickableElement, propertyToChange, valueStoreElement, values) {
    clickableElement.addEventListener('click', function (evt) {
      var color = window.utils.getRandomElement(values);
      evt.currentTarget.style[propertyToChange] = color;
      valueStoreElement.value = color;
    });
  }

  window.setupRandomizeWizard = {
    randomizeWizardCoat: randomizeWizardCoat,
    randomizeWizardEyes: randomizeWizardEyes,
    randomizeWizardFireball: randomizeWizardFireball,
    randomizeWizardProperty: randomizeWizardProperty,
  };

})();
