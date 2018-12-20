'use strict';

var hashtag = {
  maxAmount: 5,
  maxLength: 20
};

var textHashtags = document.querySelector('.text__hashtags');

function escapeUploadImgPress(evt) {
  if ((evt.keyCode === keycode.Esc) && (textHashtags !== document.activeElement)) {
    closeUploadImg();
  }
}

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
