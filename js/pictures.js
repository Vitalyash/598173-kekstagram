'use strict';

var set = {
  maxLikes: 200,
  minLikes: 15,
  countPictures: 25,
  comments: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  description: [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ]
};

var keycode = {
  Esc: 27,
  Enter: 13
};

var hashtag = {
  maxAmount: 5,
  maxLength: 20
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var listPictureEl = document.querySelector('.pictures');

var bigPicture = document.querySelector('.big-picture');
var bigPictureCancel = document.querySelector('.big-picture__cancel');

var uploadFileInput = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

var textHashtags = document.querySelector('.text__hashtags');

var effectList = document.querySelector('.effects__list');
var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');


function getUrl(i) {
  return ('photos/' + (i + 1) + '.jpg');
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArrayElement(array) {
  return array[(Math.floor(Math.random() * array.length))];
}

function getCountLikes() {
  return getRandomNumber(set.minLikes, set.maxLikes);
}

function getDescription() {
  return getRandomArrayElement(set.description);
}

function getComment() {
  return getRandomArrayElement(set.comments);
}

var getPictureObjectsArray = function (countPictures) {
  var pictureObjectsArray = [];
  for (var i = 0; i < countPictures; i++) {
    var pictureObjectUrl = getUrl(i);
    var pictureObjectLikes = getCountLikes();
    var pictureObjectDescription = getDescription();
    var pictureAmmountComments = getRandomNumber(1, 5);
    var arrayComments = [];

    for (var k = 0; k < pictureAmmountComments; k++) {
      arrayComments[k] = getComment();
    }

    pictureObjectsArray[i] = {
      url: pictureObjectUrl,
      likes: pictureObjectLikes,
      description: pictureObjectDescription,
      comments: arrayComments
    };
  }
  return pictureObjectsArray;
};

var arrayObjectsPicture = getPictureObjectsArray(set.countPictures);

var getPictureElement = function (object, template) {
  var objectElement = template.cloneNode(true);
  objectElement.querySelector('.picture__img').src = object.url;
  objectElement.querySelector('.picture__likes').textContent = object.likes;
  objectElement.querySelector('.picture__comments').textContent = object.comments.length;

  objectElement.addEventListener('click', function () {
    showBigPicture(object);
  });

  return objectElement;
};

var escapeBigPicturePress = function (evt) {
  if (evt.keyCode === keycode.Esc) {
    bigPicture.classList.add('hidden');
  }
};


var getFragmentPictures = function (array, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPictureElement(array[i], template, i));
  }
  return fragment;
};

var fragmentPictures = getFragmentPictures(arrayObjectsPicture, pictureTemplate);
listPictureEl.appendChild(fragmentPictures);

var showBigPicture = function (bigPictureObject) {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = bigPictureObject.url;
  bigPicture.querySelector('.likes-count').textContent = bigPictureObject.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPictureObject.comments.length;

  var commentsList = '';

  for (var i = 0; i < bigPictureObject.comments.length; i++) {
    commentsList = commentsList + '<li class="social__comment"><img class="social__picture" src="img/avatar-'
  + getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
  + bigPictureObject.comments[i] + '</p></li>';
  }

  bigPicture.querySelector('.social__comments').innerHTML = commentsList;
  bigPicture.querySelector('.social__caption').textContent = bigPictureObject.description;
};

var openUploadImg = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escapeUploadImgPress);
};

var escapeUploadImgPress = function (evt) {
  if ((evt.keyCode === keycode.Esc) && (textHashtags !== document.activeElement)) {
    closeUploadImg();
  }
};

var closeUploadImg = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escapeUploadImgPress);
  uploadFileInput.value = '';
  imgUploadPreview.className = '';
};

bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', escapeBigPicturePress);

uploadFileInput.addEventListener('change', function () {
  openUploadImg();
});

imgUploadCancel.addEventListener('click', function () {
  closeUploadImg();
});

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

textHashtags.addEventListener('keyup', validateHashtagsForm);

function validateHashtagsForm() {
  var hashtagItem = textHashtags.value.replace(/\s+/g, ' ').trim();
  var hashtagList = hashtagItem.toLowerCase().split(' ');
  var hashtagErrorMessage = '';
  hashtagErrorMessage = '';

  if (hashtagList.length > hashtag.maxAmount) {
    hashtagErrorMessage = 'Не более 5 хэштегов';
  } else {
    for (var i = 0; i < hashtagList.length; i++) {
      var hashtagElement = hashtagList[i];
      if (hashtagElement.indexOf('#') !== 0) {
        hashtagErrorMessage = 'Начните хэштег с #';
      } else if (hashtagElement.length === 1) {
        hashtagErrorMessage = 'Хэштег не может состоять из одного символа #';
      } else if (hashtagElement.length >= hashtag.maxLength) {
        hashtagErrorMessage = 'Хэштег не более 20 символов';
      } else if (unique(hashtagList).length < hashtagList.length) {
        hashtagErrorMessage = 'Не повторяйте хэштеги';
      }

      if (hashtagErrorMessage) {
        break;
      }
    }
  }
  textHashtags.setCustomValidity(hashtagErrorMessage);
}

function unique(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true;
  }

  return Object.keys(obj);
}

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
    var sliderWidth = parseInt(window.getComputedStyle(effectLevelLine).width, 0);
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
