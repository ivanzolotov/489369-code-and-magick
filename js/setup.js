'use strict';

(function () {

  var WIZARDS_QUANTITY = 4;
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setupElement = document.querySelector('.setup');
  var setupSimilarElement = setupElement.querySelector('.setup-similar');
  var similarWizardTemplate = document.getElementById('similar-wizard-template').content;
  var wizards = [];

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    addRandomWizard(wizards);
    fragment.appendChild(makeWizardElement(wizards[i], similarWizardTemplate));
  }
  setupSimilarElement.querySelector('.setup-similar-list').appendChild(fragment);

  setupElement.classList.remove('hidden');
  setupSimilarElement.classList.remove('hidden');

  function addRandomWizard(destination) {
    destination.push({
      name: getRandomElement(WIZARD_FIRST_NAMES) + ' ' + getRandomElement(WIZARD_LAST_NAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS),
    });
  }

  function makeWizardElement(data, template) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.eyesColor;
    return wizardElement;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

})();
