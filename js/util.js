'use strict';

(function () {
  var keycode = {
    Esc: 27,
    Enter: 13
  };

  window.util = {
    getUrl: function(i) {
      return ('photos/' + (i + 1) + '.jpg');
    },
    
    getRandomNumber: function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    
    getRandomArrayElement: function(array) {
      return array[(Math.floor(Math.random() * array.length))];
    },
    
    getCountLikes: function() {
      return getRandomNumber(maxLikes);
    },
    
    getDescription: function() {
      return getRandomArrayElement(description);
    },
    
    getComment: function() {
      return getRandomArrayElement(comments);
    },
    
    escapeBigPicturePress: function (evt) {
      if (evt.keyCode === keycode.Esc) {
        bigPicture.classList.add('hidden');
      }
    }
  };
})();