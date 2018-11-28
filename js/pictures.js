'use strict';
// дано
var set = {
  maxLikes: 200,
  minLikes: 15,
  countPictures: 25,
  comments: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  description: [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ]
};

// получаем урл фотографии
function getUrl(i) {
  return ('photos/' + (i + 1) + '.jpg');
}

// генератор случайных чисел
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// генератор случайного элемента массива
function getRandomArrayElement(array) {
  return array[(Math.floor(Math.random() * array.length))];
}

// случайное количество лайков
function getCountLikes() {
  return getRandomNumber(set.minLikes, set.maxLikes);
}

// случайный коммент
function getDescription() {
  return getRandomArrayElement(set.description);
}

// случайное описание
function getComment() {
  return getRandomArrayElement(set.comments);
}

// собираем массив из объектов (1)
var getPictureObjectsArray = function (countPictures) {
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
};

// массив из 25 объектов
var arrayObjectsPicture = getPictureObjectsArray(set.countPictures);

// создаём ДОМ элемент (2)
var getPictureElement = function (object, template) {
  var objectElement = template.cloneNode(true);
  objectElement.querySelector('.picture__img').src = object.url;
  objectElement.querySelector('.picture__likes').textContent = object.likes;
  objectElement.querySelector('.picture__comments').textContent = object.comment;

  return objectElement;
};

// заполняем блок ДОМ элементами
var getFragmentPictures = function (array, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPictureElement(array[i], template));
  }
  return fragment;
};

// шаблон
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// отрисовываем элементы в блок .pictures (3)
var fragmentPictures = getFragmentPictures(arrayObjectsPicture, pictureTemplate);
var listPictureEl = document.querySelector('.pictures');
listPictureEl.appendChild(fragmentPictures);

// показываем элемент .big-picture (4)
// заполняем его данными из массива
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img img').src = arrayObjectsPicture[getRandomNumber(0, 24)].url;
bigPicture.querySelector('.likes-count').textContent = arrayObjectsPicture[getRandomNumber(0, 24)].likes;
bigPicture.querySelector('.comments-count').textContent = arrayObjectsPicture[getRandomNumber(0, 24)].comments.length;

// отрисовываем комменты
var commentsList = '';
for (var i = 0; i < arrayObjectsPicture[0].comments.length; i++) {
  commentsList = commentsList + '<li class="social__comment"><img class="social__picture" src="img/avatar-'
+ getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
+ arrayObjectsPicture[0].comments[i] + '</p></li>';
}
bigPicture.querySelector('.social__comments').innerHTML = commentsList;

// отрисовываем описание
bigPicture.querySelector('.social__caption').textContent = arrayObjectsPicture[getRandomNumber(0, 24)].description;

// скрываем счетчик комментариев и кнопку подгрузки новых комментариев (5)
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
