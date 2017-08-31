'use strict';

(function () {

  window.WIZARD = {
    QUANTITY: 4,
    FIRST_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  };

  var setupDomElement = document.querySelector('.setup');
  var setupSimilarElement = setupDomElement.querySelector('.setup-similar');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.WIZARD.QUANTITY; i++) {
    var wizard = generateWizardProperties();
    fragment.appendChild(makeWizardElement(wizard));
  }

  setupSimilarElement.querySelector('.setup-similar-list').appendChild(fragment);
  setupSimilarElement.classList.remove('hidden');

  function generateWizardProperties() {
    return {
      name: window.utils.getRandomElement(window.WIZARD.FIRST_NAMES) + ' ' + window.utils.getRandomElement(window.WIZARD.LAST_NAMES),
      coatColor: window.utils.getRandomElement(window.WIZARD.COAT_COLORS),
      eyesColor: window.utils.getRandomElement(window.WIZARD.EYES_COLORS),
    };
  }

  function makeWizardElement(data) {
    var similarWizardTemplate = document.getElementById('similar-wizard-template').content;
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.eyesColor;
    return wizardElement;
  }

  window.similarWizards = {
    generateWizardProperties: generateWizardProperties,
    makeWizardElement: makeWizardElement,
  };

})();
