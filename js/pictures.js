'use strict';
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var listPictureEl = document.querySelector('.pictures');

function getPictureObjectsArray(countPictures) {
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
}

var arrayObjectsPicture = getPictureObjectsArray(set.countPictures);

function getPictureElement(object, template) {
  var objectElement = template.cloneNode(true);
  objectElement.querySelector('.picture__img').src = object.url;
  objectElement.querySelector('.picture__likes').textContent = object.likes;
  objectElement.querySelector('.picture__comments').textContent = object.comments.length;

  objectElement.addEventListener('click', function () {
    showBigPicture(object);
  });

  return objectElement;
}

function getFragmentPictures(array, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPictureElement(array[i], template, i));
  }
  return fragment;
}

var fragmentPictures = getFragmentPictures(arrayObjectsPicture, pictureTemplate);
listPictureEl.appendChild(fragmentPictures);
