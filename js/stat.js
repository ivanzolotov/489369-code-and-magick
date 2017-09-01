'use strict';

(function () {

  function renderStatistics(ctx, names, times) {
    var player = 'Вы';
    var maximumScore = window.utils.findMaximum(times);

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

    window.utils.drawRectangle(ctx, cloud);
    window.utils.drawText(ctx, caption);

    for (var i = 0; i < names.length; i++) {
      window.utils.drawText(ctx, {
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
      window.utils.drawRectangle(ctx, bar);
      window.utils.drawText(ctx, {
        text: names[i],
        left: histogram.left + i * (histogram.width + histogram.offset),
        top: histogram.top + histogram.height + 20,
      });
    }
  }

  function getColumnColor(currentPlayer, targetPlayer) {
    var targetColor = 'rgba(255, 0, 0, 1)';
    var getBlueColor = function () {
      var opacity = (Math.random() / 2 + 0.5); // ∈ [0.5; 1.0]
      return 'rgba(0, 0, 255, ' + opacity + ')';
    };
    return (currentPlayer === targetPlayer) ? targetColor : getBlueColor();
  }

  window.renderStatistics = renderStatistics;

})();
