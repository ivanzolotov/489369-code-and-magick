'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function isEnterPressed(evt) {
    return evt.keyCode === ENTER_KEYCODE;
  }

  function isEscPressed(evt) {
    return evt.keyCode === ESC_KEYCODE;
  }

  function findMaximum(numbers) {
    var maximum = -Infinity;
    for (var i = 0; i < numbers.length; i++) {
      if (maximum < numbers[i]) {
        maximum = numbers[i];
      }
    }
    return maximum;
  }

  function drawRectangle(context, rectangle) {
    context.save();
    context.shadowColor = rectangle.shadowColor;
    context.shadowOffsetX = rectangle.shadowOffset;
    context.shadowOffsetY = rectangle.shadowOffset;
    context.fillStyle = rectangle.fillColor;
    context.fillRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
    context.restore();
    if (rectangle.isStroked) {
      context.strokeRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
    }
  }

  function drawText(context, message) {
    context.save();
    var color = message.color || 'rgba(0, 0, 0, 1)';
    var fontSize = message.fontSize || '16px';
    var fontName = message.fontName || 'PT Mono';
    var lineHeight = message.lineHeight || parseInt(fontSize, 10) * 1.25;
    context.textBaseline = 'hanging';
    context.fillStyle = color;
    context.font = fontSize + ' ' + fontName;
    var lines = message.text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      context.fillText(lines[i], message.left, message.top + i * lineHeight);
    }
    context.restore();
  }

  window.utils = {
    getRandomElement: getRandomElement,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    findMaximum: findMaximum,
    drawRectangle: drawRectangle,
    drawText: drawText,
  };

})();
