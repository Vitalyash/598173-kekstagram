'use strict';

(function () {

  window.effects = {
    effectList: document.querySelector('.effects__list'),
    imgUploadEffectLevel: document.querySelector('.img-upload__effect-level'),
    effectLevelValue: document.querySelector('.effect-level__value'),
    effectLevelLine: document.querySelector('.effect-level__line'),
    effectLevelPin: document.querySelector('.effect-level__pin'),
    effectLevelDepth: document.querySelector('.effect-level__depth'),
    effectCurrent: ''
  };

  window.effects.effectList.addEventListener('change', function (evt) {
    var effectButton = evt.target;

    var effectName = effectButton.value;

    window.form.imgUploadPreview.querySelector('img').classList.remove('effects__preview--' + window.effects.effectCurrent);
    window.form.imgUploadPreview.querySelector('img').classList.add('effects__preview--' + window.effects.effectName);

    window.effects.effectCurrent = effectName;

    window.effects.imgUploadEffectLevel.style.display = window.effects.effectCurrent === 'none' ? 'none' : 'block';
    window.effects.setFilterView(50);
    window.effects.setFilterValue(50);
  });

  window.effects.imgUploadEffectLevel.style.display = 'none';

  window.effects.effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var initialPoint = evt.clientX;

    function mouseMove(moveEvt) {
      moveEvt.preventDefault();
      var mouseShift = initialPoint - moveEvt.clientX;
      initialPoint = moveEvt.clientX;
      var sliderWidth = parseInt(getComputedStyle(window.effects.effectLevelLine).width, 10);
      var scaleValue = (window.effects.effectLevelPin.offsetLeft - mouseShift) / sliderWidth * 100;
      window.effects.effectLevelPin.style.left = (window.effects.effectLevelPin.offsetLeft - mouseShift) + '%';

      window.effects.scaleValue = window.effects.getScaleValue(scaleValue);
      window.effects.setFilterValue(scaleValue);
      window.effects.setFilterView(scaleValue);
    }

    function mouseDrop(dropEvt) {
      dropEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseDrop);
    }

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseDrop);
  });

  window.effects.getScaleValue = function getScaleValue(currentValue) {
    if (currentValue <= 0) {
      window.effects.effectLevelPin.style.left = 0 + '%';
      window.effects.effectLevelValue.setAttribute('value', '0');
      currentValue = 0;
    } else if (currentValue >= 100) {
      window.effects.effectLevelPin.style.left = 100 + '%';
      window.effects.effectLevelValue.setAttribute('value', '100');
      currentValue = 100;
    }
    return currentValue;
  };

  window.effects.setFilterValue = function setFilterValue(value) {
    var filterValue;
    switch (window.effects.effectCurrent) {
      case 'chrome':
        filterValue = 'grayscale(' + (value) / 100 + ')';
        break;
      case 'sepia':
        filterValue = 'sepia(' + (value) / 100 + ')';
        break;
      case 'marvin':
        filterValue = 'invert(' + (value) + '%)';
        break;
      case 'phobos':
        filterValue = 'blur(' + (value) * 3 / 100 + 'px)';
        break;
      case 'heat':
        filterValue = 'brightness(' + (value) * 3 / 100 + ')';
        break;
      case 'none':
        filterValue = 'none';
        break;
    }

    window.form.imgUploadPreview.querySelector('img').style.filter = filterValue;
  };

  window.effects.setFilterView = function setFilterView(scaleValue) {
    window.effects.effectLevelPin.style.left = (scaleValue) + '%';
    window.effects.effectLevelValue.setAttribute('value', Math.round(scaleValue));
    window.effects.effectLevelDepth.style.width = window.effects.effectLevelPin.style.left;
  };
})();
