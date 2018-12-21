'use strict';

(function () {

  window.form = {
    uploadFileInput: document.querySelector('#upload-file'),
    imgUploadOverlay: document.querySelector('.img-upload__overlay'),
    imgUploadCancel: document.querySelector('.img-upload__cancel'),
    imgUploadPreview: document.querySelector('.img-upload__preview')
  };

  window.form.openUploadImg = function openUploadImg() {
    window.form.imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', window.validation.escapeUploadImgPress);
  };

  window.form.closeUploadImg = function closeUploadImg() {
    window.form.imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.validation.escapeUploadImgPress);
    window.form.uploadFileInput.value = '';
    window.form.imgUploadPreview.className = '';
  };

  window.form.uploadFileInput.addEventListener('change', function () {
    window.form.openUploadImg();
  });

  window.form.imgUploadCancel.addEventListener('click', function () {
    window.form.closeUploadImg();
  });
})();
