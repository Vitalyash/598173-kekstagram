'use strict';

(function(){
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  window.bigPicture = {
    showBigPicture: function (bigPictureObject) {
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
    },
  };

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', window.util.escapeBigPicturePress);

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
})();