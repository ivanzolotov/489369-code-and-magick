'use strict';

var WIZARDS_QUANTITY = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


(function () {

  var setupElement = document.querySelector('.setup');
  var setupSimilarElement = setupElement.querySelector('.setup-similar');
  var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    var wizard = makeRandomWizard();
    fragment.appendChild(makeWizardElement(wizard, similarWizardTemplate));
  }
  setupSimilarElement.querySelector('.setup-similar-list').appendChild(fragment);

  setupSimilarElement.classList.remove('hidden');

  // Нажатие на элемент .setup-open удаляет класс hidden
  // у блока setup. Нажатие на элемент .setup-close, расположенный
  // внутри блока setup возвращает ему класс hidden.
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  setupOpenElement.addEventListener('click', function () {
    setupElement.classList.remove('hidden');
  });
  setupCloseElement.addEventListener('click', function () {
    setupElement.classList.add('hidden');
  });

  // Реализация выбора случайного цвета при клике
  var setupWizardDomElement = setupElement.querySelector('.setup-wizard');

  var wizardCoatDomElement = setupWizardDomElement.querySelector('.wizard-coat');
  var inputCoatColorDomElement = setupElement.querySelector('input[name=coat-color]');
  wizardCoatDomElement.addEventListener('click', function (evt) {
    var color = getRandomElement(WIZARD_COAT_COLORS);
    evt.currentTarget.style.fill = color;
    inputCoatColorDomElement.value = color;
  });

  var wizardEyesDomElement = setupWizardDomElement.querySelector('.wizard-eyes');
  var inputEyesColorDomElement = setupElement.querySelector('input[name=eyes-color]');
  wizardEyesDomElement.addEventListener('click', function (evt) {
    var color = getRandomElement(WIZARD_EYES_COLORS)
    evt.currentTarget.style.fill = color;
    inputEyesColorDomElement.value = color;
  });

  var setupFireballWrapDomElement = setupElement.querySelector('.setup-fireball-wrap');
  var inputFireballColorDomElement = setupElement.querySelector('input[name=fireball-color]');
  setupFireballWrapDomElement.addEventListener('click', function (evt) {
    var color = getRandomElement(FIREBALL_COLORS)
    evt.currentTarget.style['background-color'] = color;
    inputFireballColorDomElement.value = color;
  });

})();

function makeRandomWizard() {
  return {
    name: getRandomElement(WIZARD_FIRST_NAMES) + ' ' + getRandomElement(WIZARD_LAST_NAMES),
    coatColor: getRandomElement(WIZARD_COAT_COLORS),
    eyesColor: getRandomElement(WIZARD_EYES_COLORS),
  };
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
