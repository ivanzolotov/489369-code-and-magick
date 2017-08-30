'use strict';

var WIZARDS_QUANTITY = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


var setupElt = document.querySelector('.setup');
var setupSimilarElement = setupElt.querySelector('.setup-similar');
var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

var fragment = document.createDocumentFragment();
for (var i = 0; i < WIZARDS_QUANTITY; i++) {
  var wizard = makeRandomWizard();
  fragment.appendChild(makeWizardElement(wizard, similarWizardTemplate));
}
setupSimilarElement.querySelector('.setup-similar-list').appendChild(fragment);

setupSimilarElement.classList.remove('hidden');


// Логика открытия и закрытия окна настроек

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpenElt = document.querySelector('.setup-open');
var setupCloseElt = setupElt.querySelector('.setup-close');
var setupUserNameElt = setupElt.querySelector('.setup-user-name');
var setupSubmitElt = setupElt.querySelector('.setup-submit');

setupOpenElt.addEventListener('click', openPopup);
setupOpenElt.addEventListener('keydown', setupOpenEltKeydownHandler);

function isEnterPressed(evt) {
  return evt.keyCode === ENTER_KEYCODE;
}

function isEscPressed(evt) {
  return evt.keyCode === ESC_KEYCODE;
}

function setupOpenEltKeydownHandler(evt) {
  if (isEnterPressed(evt)) {
    openPopup();
  }
}

function bodyKeydownHandler(evt) {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    if (evt.target !== setupUserNameElt) {
      closePopup();
    }
  }
}

function setupCloseEltKeydownHandler(evt) {
  if (isEnterPressed(evt)) {
    closePopup();
  }
}

function setupSubmitEltClickHandler(evt) {
  evt.preventDefault();
  closePopup();
}

function setupSubmitEltKeydownHandler(evt) {
  if (isEnterPressed(evt)) {
    evt.preventDefault();
    closePopup();
  }
}


function openPopup() {
  setupElt.classList.remove('hidden');
  setupOpenElt.removeEventListener('click', openPopup);
  setupOpenElt.removeEventListener('keydown', setupOpenEltKeydownHandler);
  setupCloseElt.addEventListener('click', closePopup);
  setupCloseElt.addEventListener('keydown', setupCloseEltKeydownHandler);
  document.body.addEventListener('keydown', bodyKeydownHandler);
  setupSubmitElt.addEventListener('click', setupSubmitEltClickHandler);
  setupSubmitElt.addEventListener('keydown', setupSubmitEltKeydownHandler);
}

function closePopup() {
  setupElt.classList.add('hidden');
  setupOpenElt.addEventListener('click', openPopup);
  setupOpenElt.addEventListener('keydown', setupOpenEltKeydownHandler);
  setupCloseElt.removeEventListener('click', closePopup);
  setupCloseElt.removeEventListener('keydown', setupCloseEltKeydownHandler);
  document.body.removeEventListener('keydown', bodyKeydownHandler);
  setupSubmitElt.removeEventListener('click', setupSubmitEltClickHandler);
  setupSubmitElt.removeEventListener('keydown', setupSubmitEltKeydownHandler);
}


// Реализация выбора случайного цвета при клике
var setupWizardElt = setupElt.querySelector('.setup-wizard');

randomizeWizardCoat();
randomizeWizardEyes();
randomizeWizardFireball();

function randomizeWizardCoat() {
  var wizardCoatElt = setupWizardElt.querySelector('.wizard-coat');
  var inputCoatColorElt = setupElt.querySelector('input[name=coat-color]');
  randomizeWizardProperty(wizardCoatElt, 'fill', inputCoatColorElt, WIZARD_COAT_COLORS);
}
function randomizeWizardEyes() {
  var wizardEyesElt = setupWizardElt.querySelector('.wizard-eyes');
  var inputEyesColorElt = setupElt.querySelector('input[name=eyes-color]');
  randomizeWizardProperty(wizardEyesElt, 'fill', inputEyesColorElt, WIZARD_EYES_COLORS);
}
function randomizeWizardFireball() {
  var setupFireballWrapElt = setupElt.querySelector('.setup-fireball-wrap');
  var inputFireballColorElt = setupElt.querySelector('input[name=fireball-color]');
  randomizeWizardProperty(setupFireballWrapElt, 'background-color', inputFireballColorElt, FIREBALL_COLORS);
}

function randomizeWizardProperty(clickableElement, propertyToChange, valueStoreElement, values) {
  clickableElement.addEventListener('click', function (evt) {
    var color = getRandomElement(values);
    evt.currentTarget.style[propertyToChange] = color;
    valueStoreElement.value = color;
  });
}


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
