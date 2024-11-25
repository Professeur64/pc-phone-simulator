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


async function notifyTelegram(visitorInfo) {
    const botToken = '7671059018:AAF8t0J5wItwJ8wLfHMbPY7ZP_C_rAmjg_4'; // ضع هنا رمز البوت        https://api.telegram.org/bot7671059018:AAF8t0J5wItwJ8wLfHMbPY7ZP_C_rAmjg_4/getUpdates
    const chatId = '6827736064'; // ضع هنا معرف الدردشة الخاصة بك
    const message = `
    🚶‍♂️ زائر جديد على الموقع:
    - IP: ${visitorInfo.ip}
    - المتصفح: ${visitorInfo.userAgent}
    - الصفحة: ${visitorInfo.url}
    `;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    });
}

// استدعاء الدالة عند تحميل الصفحة
getVisitorInfo().then(visitorInfo => notifyTelegram(visitorInfo));



async function getVisitorInfo() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const visitorInfo = {
        ip: data.ip,
        userAgent: navigator.userAgent,
        url: window.location.href,
    };
    return visitorInfo;
}
  
