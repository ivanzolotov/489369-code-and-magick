'use strict';

(function () {

  var setupDomElement = document.querySelector('.setup');
  var setupOpenDomElement = document.querySelector('.setup-open');
  var setupCloseDomElement = setupDomElement.querySelector('.setup-close');
  var setupUserNameDomElement = setupDomElement.querySelector('.setup-user-name');
  var setupSubmitDomElement = setupDomElement.querySelector('.setup-submit');

  setupOpenDomElement.addEventListener('click', openPopup);
  setupOpenDomElement.addEventListener('keydown', setupOpenDomElementKeydownHandler);

  function openPopup() {
    setupDomElement.classList.remove('hidden');
    setupOpenDomElement.removeEventListener('click', openPopup);
    setupOpenDomElement.removeEventListener('keydown', setupOpenDomElementKeydownHandler);
    setupCloseDomElement.addEventListener('click', closePopup);
    setupCloseDomElement.addEventListener('keydown', setupCloseDomElementKeydownHandler);
    setupSubmitDomElement.addEventListener('click', setupSubmitDomElementClickHandler);
    setupSubmitDomElement.addEventListener('keydown', setupSubmitDomElementKeydownHandler);
    document.body.addEventListener('keydown', bodyKeydownHandler);
  }

  function closePopup() {
    setupDomElement.classList.add('hidden');
    setupOpenDomElement.addEventListener('click', openPopup);
    setupOpenDomElement.addEventListener('keydown', setupOpenDomElementKeydownHandler);
    setupCloseDomElement.removeEventListener('click', closePopup);
    setupCloseDomElement.removeEventListener('keydown', setupCloseDomElementKeydownHandler);
    setupSubmitDomElement.removeEventListener('click', setupSubmitDomElementClickHandler);
    setupSubmitDomElement.removeEventListener('keydown', setupSubmitDomElementKeydownHandler);
    document.body.removeEventListener('keydown', bodyKeydownHandler);
  }

  function setupOpenDomElementKeydownHandler(evt) {
    if (window.utils.isEnterPressed(evt)) {
      openPopup();
    }
  }

  function setupCloseDomElementKeydownHandler(evt) {
    if (window.utils.isEnterPressed(evt)) {
      closePopup();
    }
  }

  function setupSubmitDomElementClickHandler(evt) {
    evt.preventDefault();
    closePopup();
  }

  function setupSubmitDomElementKeydownHandler(evt) {
    if (window.utils.isEnterPressed(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  function bodyKeydownHandler(evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      if (evt.target !== setupUserNameDomElement) {
        closePopup();
      }
    }
  }

  window.setupDialogManagement = {
    openPopup: openPopup,
    closePopup: closePopup,
    setupOpenDomElementKeydownHandler: setupOpenDomElementKeydownHandler,
    setupCloseDomElementKeydownHandler: setupCloseDomElementKeydownHandler,
    setupSubmitDomElementClickHandler: setupSubmitDomElementClickHandler,
    setupSubmitDomElementKeydownHandler: setupSubmitDomElementKeydownHandler,
    bodyKeydownHandler: bodyKeydownHandler,
  };
})();
