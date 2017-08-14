'use strict';

window.renderStatistics = function (ctx, names, times) {

  var cloudXPosition = 100;
  var cloudYPosition = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudVerticalPadding = 30;
  var cloudHorizontalPadding = 50;
  var columnWidth = 40;
  var columnOffset = 50;
  var columnMaxHeight = 150;
  var columnHeight;

  var drawCloud = function () {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#FFF';
    ctx.fillRect(cloudXPosition, cloudYPosition, cloudWidth, cloudHeight);
    ctx.restore();
    ctx.strokeRect(cloudXPosition, cloudYPosition, cloudWidth, cloudHeight);
  };

  var drawCaption = function () {
    var lineHeight = 22;
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', cloudXPosition + cloudHorizontalPadding, cloudYPosition + cloudVerticalPadding);
    ctx.fillText('Список результатов:', cloudXPosition + cloudHorizontalPadding, cloudYPosition + cloudVerticalPadding + lineHeight);
  };

  var drawHistoram = function () {
    var i;
    var columnXPosition;
    var columnYPosition = cloudVerticalPadding + 65;

    var maximumScore = -1;
    for (i = 0; i < times.length; i++) {
      if (maximumScore < times[i]) {
        maximumScore = times[i];
      }
    }

    for (i = 0; i < names.length; i++) {
      columnHeight = times[i] / maximumScore * columnMaxHeight;
      columnXPosition = cloudXPosition + cloudHorizontalPadding + i * (columnWidth + columnOffset);

      ctx.fillStyle = '#333';
      ctx.fillText(~~times[i], columnXPosition, columnYPosition + columnMaxHeight - columnHeight - 5);
      ctx.fillText(names[i], columnXPosition, columnYPosition + columnMaxHeight + 20);

      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() / 2 + 0.5) + ')'; // alpha ∈ [0.5; 1.0]
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }
      ctx.fillRect(columnXPosition, columnYPosition + columnMaxHeight - columnHeight, columnWidth, columnHeight);
    }
  };

  drawCloud();
  drawCaption();
  drawHistoram();

};
