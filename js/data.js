'use strict';

(function () {
  // var set = {
  //   maxLikes: 200,
  //   minLikes: 15,
  //   countPictures: 25,
  //   comments: [
  //     'Всё отлично!',
  //     'В целом всё неплохо. Но не всё.',
  //     'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //     'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //     'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //     'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  //   ],
  //   description: [
  //     'Тестим новую камеру!',
  //     'Затусили с друзьями на море',
  //     'Как же круто тут кормят',
  //     'Отдыхаем...',
  //     'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  //     'Вот это тачка!'
  //   ]
  // }

  var maxLikes = 200;
  var minLikes = 15;
  var countPictures = 25;
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var description = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  
  
  window.data = {
    getPictureObjectsArray: function (countPictures) {
      var pictureObjectsArray = [];
      for (var i = 0; i < countPictures; i++) {
        var pictureObjectUrl = window.util.getUrl(i);
        var pictureObjectLikes = window.util.getCountLikes();
        var pictureObjectDescription = window.util.getDescription();
        var pictureAmmountComments = window.util.getRandomNumber(1, 5);
        var arrayComments = [];
    
        for (var k = 0; k < pictureAmmountComments; k++) {
          arrayComments[k] = window.util.getComment();
        }
    
        pictureObjectsArray[i] = {
          url: pictureObjectUrl,
          likes: pictureObjectLikes,
          description: pictureObjectDescription,
          comments: arrayComments
        };
      }
      return pictureObjectsArray;
    },

    getPictureElement: function (object, template) {
      var objectElement = template.cloneNode(true);
      objectElement.querySelector('.picture__img').src = object.url;
      objectElement.querySelector('.picture__likes').textContent = object.likes;
      objectElement.querySelector('.picture__comments').textContent = object.comments.length;
    
      objectElement.addEventListener('click', function () {
        window.showBigPicture(object);
      });
    
      return objectElement;
    }
  };

})();