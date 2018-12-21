'use strict';

(function () {

  window.validation = {
    textHashtags: document.querySelector('.text__hashtags')
  };

  window.validation.escapeUploadImgPress = function escapeUploadImgPress(evt) {
    if ((evt.keyCode === window.data.keycode.Esc) && (window.validation.textHashtags !== document.activeElement)) {
      window.form.closeUploadImg();
    }
  };

  window.validation.textHashtags.addEventListener('keyup', window.validation.validateHashtagsForm);

  window.validation.validateHashtagsForm = function validateHashtagsForm() {
    var hashtagItem = window.validation.textHashtags.value.replace(/\s+/g, ' ').trim();
    var hashtagList = hashtagItem.toLowerCase().split(' ');
    var hashtagErrorMessage = '';
    hashtagErrorMessage = '';

    if (hashtagList.length > window.data.hashtag.maxAmount) {
      hashtagErrorMessage = 'Не более 5 хэштегов';
    } else {
      for (var i = 0; i < hashtagList.length; i++) {
        var hashtagElement = hashtagList[i];
        if (hashtagElement.indexOf('#') !== 0) {
          hashtagErrorMessage = 'Начните хэштег с #';
        } else if (hashtagElement.length === 1) {
          hashtagErrorMessage = 'Хэштег не может состоять из одного символа #';
        } else if (hashtagElement.length >= window.data.hashtag.maxLength) {
          hashtagErrorMessage = 'Хэштег не более 20 символов';
        } else if (window.validation.unique(hashtagList).length < hashtagList.length) {
          hashtagErrorMessage = 'Не повторяйте хэштеги';
        }

        if (hashtagErrorMessage) {
          break;
        }
      }
    }
    window.validation.textHashtags.setCustomValidity(hashtagErrorMessage);
  };

  window.validation.unique = function unique(arr) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true;
    }

    return Object.keys(obj);
  };
})();
