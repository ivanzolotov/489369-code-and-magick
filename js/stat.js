'use strict';

window.renderStatistics = function (ctx, names, times) {

  var player = 'Вы';
  var maximumScore = findMaximum(times);

  var cloud = {
    left: 100,
    top: 10,
    width: 420,
    height: 270,
    isStroked: true,
    fillColor: 'rgba(255, 255, 255, 1.0)',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: 10,
    topPadding: 20,
    leftPadding: 50,
  };

  var caption = {
    text: 'Ура вы победили!\nСписок результатов:',
    left: cloud.left + cloud.leftPadding,
    top: cloud.top + cloud.topPadding,
  };

  var histogram = {
    left: cloud.left + cloud.leftPadding,
    top: caption.top + 45,
    width: 40,
    height: 150,
    offset: 50,
    step: function () {
      return this.height / maximumScore;
    }
  };

  drawRectangle(ctx, cloud);
  drawText(ctx, caption);

  for (var i = 0; i < names.length; i++) {
    drawText(ctx, {
      text: Math.floor(times[i]).toString(),
      left: histogram.left + i * (histogram.width + histogram.offset),
      top: histogram.top + (histogram.height - times[i] * histogram.step()),
    });
    var bar = {
      left: histogram.left + i * (histogram.width + histogram.offset),
      top: histogram.top + (histogram.height - times[i] * histogram.step()) + 20,
      width: histogram.width,
      height: times[i] * histogram.step(),
      fillColor: getColumnColor(names[i], player),
    };
    drawRectangle(ctx, bar);
    drawText(ctx, {
      text: names[i],
      left: histogram.left + i * (histogram.width + histogram.offset),
      top: histogram.top + histogram.height + 20,
    });
  }

};

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

function findMaximum(numbers) {
  var maximum = -Infinity;
  for (var i = 0; i < numbers.length; i++) {
    if (maximum < numbers[i]) {
      maximum = numbers[i];
    }
  }
  return maximum;
}

function getColumnColor(currentPlayer, targetPlayer) {
  var targetColor = 'rgba(255, 0, 0, 1)';
  var getBlueColor = function () {
    var opacity = (Math.random() / 2 + 0.5); // ∈ [0.5; 1.0]
    return 'rgba(0, 0, 255, ' + opacity + ')';
  };
  return (currentPlayer === targetPlayer) ? targetColor : getBlueColor();
}
