'use strict';
window.dragAndDrop = (function () {
  return {
    drag: function (handle, draggedElement) {
      handle.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMousemove = function (moveEvt) {
          moveEvt.preventDefault();
          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };
          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };
          draggedElement.style.top = (draggedElement.offsetTop - shift.y) + 'px';
          draggedElement.style.left = (draggedElement.offsetLeft - shift.x) + 'px';
        };

        var onMouseup = function (upEvt) {
          upEvt.preventDefault();
          document.removeEventListener('mousemove', onMousemove);
          document.removeEventListener('mouseup', onMouseup);
        };

        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('mouseup', onMouseup);
      });
    }
  };
})();
(function () {
  var setup = document.querySelector('.setup');
  var handle = setup.querySelector('.setup-user-pic');
  window.dragAndDrop.drag(handle, setup);
})();
