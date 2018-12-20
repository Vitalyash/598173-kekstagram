'use strict';

(function(){
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

  window.uploadpicture = {

    openUploadImg: function () {
      imgUploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', window.util.escapeUploadImgPress);
    },

    escapeUploadImgPress: function (evt) {
      if ((evt.keycode === keycode.Esc) && (textHashtags !== document.activeElement)) {
        closeUploadImg();
      }
    },
       
    closeUploadImg: function () {
      imgUploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', escapeUploadImgPress);
      uploadFileInput.value = '';
      imgUploadPreview.className = '';
    }
  };

  uploadFileInput.addEventListener('change', function () {
    window.uploadpicture.openUploadImg();
  });
  
  imgUploadCancel.addEventListener('click', function () {
    window.uploadpicture.closeUploadImg();
  });
})();