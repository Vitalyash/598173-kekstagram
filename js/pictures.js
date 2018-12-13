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
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
var imgUploadEffects = imgUploadOverlay.querySelector('.img-upload__effects');

var textHashtags = document.querySelector('.text__hashtags');

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

imgUploadEffects.addEventListener('change', function () {
  var checked = imgUploadEffects.querySelector('input:checked');
  imgUploadPreview.className = 'effects__preview--' + checked.value;
});

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

function validateHashtagsForm() {
  var hashtagItem = textHashtags.value.trim();
  var hashtagList = hashtagItem.toLowerCase().split(' ');
  var hashtagErrorMessage = '';

  if (hashtagList.length > hashtag.maxAmount) {
    hashtagErrorMessage = 'Не более 5 хэштегов';
  } else {
    for (var i = 0; i < hashtag.maxLength; i++) {
      if (hashtagList[i].charAt(0) !== '#') {
        hashtagErrorMessage = 'Начните хэштег с #';
      } else if (hashtagList[i].indexOf('#', 1) > 0) {
        hashtagErrorMessage = 'Разделите хештеги пробелом';
      } else if (hashtagList[i].length > hashtag.maxAmount) {
        hashtagErrorMessage = 'Хэштег не более 20 символов';
      } else if (hashtagList.indexOf(hashtagList[i]) !== hashtagList.lastIndexOf(hashtagList[i])) {
        hashtagErrorMessage = 'Не повторяйте хэштеги';
      }
      if (hashtagErrorMessage) {
        break;
      }
    }
  }
  textHashtags.setCustomValidity(hashtagErrorMessage);
}

textHashtags.addEventListener('change', validateHashtagsForm);
