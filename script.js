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





async function getVisitorInfo() {
    try {
        // 1. الحصول على عنوان IP والموقع الجغرافي
        const ipResponse = await fetch('https://ipapi.co/json/'); // استخدم ipapi لجمع الموقع الجغرافي
        const ipData = await ipResponse.json();

        // 2. جمع بيانات الجهاز
        const visitorInfo = {
            ip: ipData.ip || "غير متوفر",
            country: ipData.country_name || "غير متوفر",
            city: ipData.city || "غير متوفر",
            region: ipData.region || "غير متوفر",
            timezone: ipData.timezone || "غير متوفر",
            isp: ipData.org || "غير متوفر",
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            referrer: document.referrer || "لا يوجد",
            url: window.location.href,
        };

        return visitorInfo;
    } catch (error) {
        console.error("Error fetching visitor info:", error);
        return null;
    }
}

async function notifyTelegram(visitorInfo) {
    if (!visitorInfo) return; // في حالة فشل جمع البيانات
    const botToken = '7671059018:AAF8t0J5wItwJ8wLfHMbPY7ZP_C_rAmjg_4'; // ضع هنا رمز البوت
    const chatId = '6827736064'; // ضع هنا معرف الدردشة الخاصة بك
    const message = `
🚶‍♂️ زائر جديد على الموقع:
- 🌐 IP: ${visitorInfo.ip}
- 🌍 الدولة: ${visitorInfo.country}
- 🏙️ المدينة: ${visitorInfo.city}
- 📍 المنطقة: ${visitorInfo.region}
- ⏰ المنطقة الزمنية: ${visitorInfo.timezone}
- 💻 مزود الخدمة: ${visitorInfo.isp}
- 🖥️ الجهاز: ${visitorInfo.userAgent}
- 🌐 اللغة: ${visitorInfo.language}
- 📺 دقة الشاشة: ${visitorInfo.screenResolution}
- 🔗 الصفحة: ${visitorInfo.url}
- ↩️ المرجع: ${visitorInfo.referrer}
    `;

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        if (!response.ok) {
            console.error("Failed to send message to Telegram:", response.statusText);
        }
    } catch (error) {
        console.error("Error notifying Telegram:", error);
    }
}

// استدعاء الدوال عند تحميل الصفحة
getVisitorInfo().then(visitorInfo => notifyTelegram(visitorInfo));

