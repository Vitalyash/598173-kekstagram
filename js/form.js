'use strict';

var uploadFileInput = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

function openUploadImg() {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escapeUploadImgPress);
}

function closeUploadImg() {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escapeUploadImgPress);
  uploadFileInput.value = '';
  imgUploadPreview.className = '';
}

uploadFileInput.addEventListener('change', function () {
  openUploadImg();
});

imgUploadCancel.addEventListener('click', function () {
  closeUploadImg();
});
