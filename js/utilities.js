'use strict';

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
