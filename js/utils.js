'use strict';
(function(){
  window.utils = { };
  window.utils.getUrl = function getUrl(i) {
    return ('photos/' + (i + 1) + '.jpg');
  };
  window.utils.getRandomNumber = function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  window.utils.getRandomArrayElement = function getRandomArrayElement(array) {
    return array[(Math.floor(Math.random() * array.length))];
  };
  window.utils.getCountLikes = function getCountLikes() {
    return window.utils.getRandomNumber(window.data.set.minLikes, window.data.set.maxLikes);
  };
  window.utils.getDescription = function getDescription() {
    return window.utils.getRandomArrayElement(window.data.set.description);
  };
  window.utils.getComment = function getComment() {
    return window.utils.getRandomArrayElement(window.data.set.comments);
  };
})();