'use strict';

(function () {
  
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var listPictureEl = document.querySelector('.pictures');

  var getFragmentPictures = function (array, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.data.getPictureElement(array[i], template, i));
    }
    return fragment;
  };

  var arrayObjectsPicture = window.data.getPictureObjectsArray(countPictures);

  var fragmentPictures = getFragmentPictures(arrayObjectsPicture, pictureTemplate);
  listPictureEl.appendChild(fragmentPictures);
})();
