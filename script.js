document.addEventListener('DOMContentLoaded', function () {
    const urlInput = document.getElementById('url-input');
    const updateFramesButton = document.getElementById('update-frames');
    const phoneFrame = document.getElementById('phone-frame');
    const desktopFrame = document.getElementById('desktop-frame');
  
    // تحديث الإطارات عند الضغط على زر "عرض"
    updateFramesButton.addEventListener('click', function () {
      const url = urlInput.value.trim();
      if (url) {
        phoneFrame.src = url;
        desktopFrame.src = url;
      } else {
        alert('يرجى إدخال رابط صالح.');
      }
    });
  });
  