'use strict';
window.renderStatistics = function (ctx, names, times) {
  var max = getMaxElement(times, -1);
  var histogramHeight = 150;
  var step = histogramHeight / max;
  var histogramColumnWidth = 40;
  var indent = 50;
  var userColumnFill = 'rgba(255, 0, 0, 1)';
  var initialX = 130;
  var initialY = 100;

  function getOpaсity(minOpacity, maxOpacity) {
    return +(Math.random() * (maxOpacity - minOpacity)).toFixed(2) + minOpacity;
  }

  function colorColumn(arrayElement, columnName, color) {
    if (arrayElement === columnName) {
      ctx.fillStyle = color;
    }
  }

  function getMaxElement(array, maxProperty) {
    for (var i = 0; i < array.length; i++) {
      var property = array[i];
      if (property > maxProperty) {
        maxProperty = property;
      }
    }
    return maxProperty;
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);
  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура, вы победили!', 230, 40);
  ctx.fillText('Список результатов:', 230, 60);

  for (var i = 0; i < times.length; i++) {
    var histogramColumnY = initialY + (histogramHeight - times[i] * step);
    var histogramColumnX = initialX + (histogramColumnWidth + indent) * i;
    ctx.fillStyle = 'rgba(0, 0, 255, ' + getOpaсity(0.2, 1) + ')';
    colorColumn(names[i], 'Вы', userColumnFill);
    ctx.fillRect(histogramColumnX, histogramColumnY, histogramColumnWidth, times[i] * step);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], histogramColumnX, 270);
    ctx.fillText(times[i].toFixed(0), histogramColumnX, histogramColumnY - 10);
  }

};
