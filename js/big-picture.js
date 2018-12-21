'use strict';
(function () {

  window.picture = {
    bigPicture: document.querySelector('.big-picture'),
    bigPictureCancel: document.querySelector('.big-picture__cancel')
  };

  window.picture.bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  window.picture.bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  window.picture.bigPictureCancel.addEventListener('click', function () {
    window.picture.bigPicture.classList.add('hidden');
  });

  window.picture.showBigPicture = function showBigPicture(bigPictureObject) {
    window.picture.bigPicture.classList.remove('hidden');
    window.picture.bigPicture.querySelector('.big-picture__img img').src = bigPictureObject.url;
    window.picture.bigPicture.querySelector('.likes-count').textContent = bigPictureObject.likes;
    window.picture.bigPicture.querySelector('.comments-count').textContent = bigPictureObject.comments.length;

    var commentsList = '';

    for (var i = 0; i < bigPictureObject.comments.length; i++) {
      commentsList = commentsList + '<li class="social__comment"><img class="social__picture" src="img/avatar-'
    + window.utils.getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
    + bigPictureObject.comments[i] + '</p></li>';
    }

    window.picture.bigPicture.querySelector('.social__comments').innerHTML = commentsList;
    window.picture.bigPicture.querySelector('.social__caption').textContent = bigPictureObject.description;
  };

  window.picture.escapeBigPicturePress = function escapeBigPicturePress(evt) {
    if (evt.keyCode === window.data.keycode.Esc) {
      window.picture.bigPicture.classList.add('hidden');
    }
  };

  document.addEventListener('keydown', window.picture.escapeBigPicturePress);
})();
