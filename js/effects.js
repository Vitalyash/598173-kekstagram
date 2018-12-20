'use strict';

var effectList = document.querySelector('.effects__list');
var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');

var effectCurrent = '';

effectList.addEventListener('change', function (evt) {
  var effectButton = evt.target;

  var effectName = effectButton.value;

  imgUploadPreview.querySelector('img').classList.remove('effects__preview--' + effectCurrent);
  imgUploadPreview.querySelector('img').classList.add('effects__preview--' + effectName);

  effectCurrent = effectName;

  imgUploadEffectLevel.style.display = effectCurrent === 'none' ? 'none' : 'block';
  setFilterView(50);
  setFilterValue(50);
});

imgUploadEffectLevel.style.display = 'none';

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var initialPoint = evt.clientX;

  function mouseMove(moveEvt) {
    moveEvt.preventDefault();
    var mouseShift = initialPoint - moveEvt.clientX;
    initialPoint = moveEvt.clientX;
    var sliderWidth = parseInt(getComputedStyle(effectLevelLine).width, 10);
    var scaleValue = (effectLevelPin.offsetLeft - mouseShift) / sliderWidth * 100;
    effectLevelPin.style.left = (effectLevelPin.offsetLeft - mouseShift) + '%';

    scaleValue = getScaleValue(scaleValue);
    setFilterValue(scaleValue);
    setFilterView(scaleValue);
  }

  function mouseDrop(dropEvt) {
    dropEvt.preventDefault();
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseDrop);
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseDrop);
});

function getScaleValue(currentValue) {
  if (currentValue <= 0) {
    effectLevelPin.style.left = 0 + '%';
    effectLevelValue.setAttribute('value', '0');
    currentValue = 0;
  } else if (currentValue >= 100) {
    effectLevelPin.style.left = 100 + '%';
    effectLevelValue.setAttribute('value', '100');
    currentValue = 100;
  }
  return currentValue;
}

function setFilterValue(value) {
  var filterValue;
  switch (effectCurrent) {
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
  imgUploadPreview.querySelector('img').style.filter = filterValue;
}

function setFilterView(scaleValue) {
  effectLevelPin.style.left = (scaleValue) + '%';
  effectLevelValue.setAttribute('value', Math.round(scaleValue));
  effectLevelDepth.style.width = effectLevelPin.style.left;
}
