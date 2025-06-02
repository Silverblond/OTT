let imagePath = "";
let translatedText = "";
let languageCode = "en-US";
const BASE_URL = "http://localhost:8080";

// 언어 코드 매핑 함수
function getTTSLang(target) {
    const map = {
        ko: "ko-KR",
        en: "en-US",
        ja: "ja-JP",
        zh: "zh-CN",
        "zh-CN": "zh-CN",
        "zh-TW": "zh-TW",
        fr: "fr-FR",
        de: "de-DE",
        es: "es-ES",
        ru: "ru-RU",
        vi: "vi-VN",
        th: "th-TH"
    };
    return map[target] || "en-US";
}

// 번역 언어 드롭다운 초기화
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("targetLang");
    const options = [
        { code: "en", label: "영어" },
        { code: "ko", label: "한국어" },
        { code: "ja", label: "일본어" },
        { code: "zh-CN", label: "중국어 간체" },
        { code: "zh-TW", label: "중국어 번체" },
        { code: "fr", label: "프랑스어" },
        { code: "de", label: "독일어" },
        { code: "es", label: "스페인어" },
        { code: "ru", label: "러시아어" },
        { code: "vi", label: "베트남어" },
        { code: "th", label: "태국어" },
    ];

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.code;
        option.textContent = opt.label;
        select.appendChild(option);
    });
});

async function uploadImage() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];
    if (!file) return alert("이미지를 선택해주세요.");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/api/image/upload`, {
        method: "POST",
        body: formData
    });
    imagePath = await res.text();
    document.getElementById("uploadResult").innerText = "✅ 업로드 완료: " + imagePath;
}

async function performOCR() {
    const lang = document.getElementById("ocrLang").value;
    const res = await fetch(`${BASE_URL}/api/ocr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath, lang })
    });
    const result = await res.json();
    document.getElementById("ocrResult").innerText = result.lines.join("\n");
}

async function translateText() {
    const targetLang = document.getElementById("targetLang").value;
    const originalText = document.getElementById("ocrResult").innerText;
    const res = await fetch(`${BASE_URL}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalText, targetLang })
    });
    const result = await res.json();
    translatedText = result.translatedText;
    languageCode = getTTSLang(targetLang);
    document.getElementById("translationResult").innerText = translatedText;
}

async function generateTTS() {
    const res = await fetch(`${BASE_URL}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: translatedText, languageCode })
    });
    const blob = await res.blob();
    const audioUrl = URL.createObjectURL(blob);
    document.getElementById("audioPlayer").src = audioUrl;
}

document.getElementById("screenshotBtn").addEventListener("click", captureAndSend);
document.getElementById("areaCaptureBtn").addEventListener("click", startAreaCapture);

async function captureAndSend() {
    const lang = document.getElementById("ocrLang").value;
    document.getElementById("screenshotStatus").innerText = "📷 캡처 중...";
    const canvas = await html2canvas(document.body);
    canvas.toBlob(async blob => {
        const file = new File([blob], "screenshot.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch(`${BASE_URL}/api/image/upload`, {
            method: "POST",
            body: formData
        });
        imagePath = await uploadRes.text();
        document.getElementById("uploadResult").innerText = "✅ 업로드 완료: " + imagePath;
        const ocrRes = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath, lang })
        });
        const result = await ocrRes.json();
        document.getElementById("ocrResult").innerText = result.lines.join("\n");
        document.getElementById("screenshotStatus").innerText = "✅ OCR 완료";
    });
}

function startAreaCapture() {
    const overlay = document.createElement("div");
    overlay.id = "captureOverlay";
    overlay.style = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.2); z-index: 9999; cursor: crosshair;
    `;
    document.body.appendChild(overlay);

    let startX, startY, box;

    overlay.addEventListener("mousedown", e => {
        startX = e.clientX;
        startY = e.clientY;

        box = document.createElement("div");
        box.className = "selectionBox";
        box.style = `
            position: absolute; border: 2px dashed #2196f3;
            background: rgba(33,150,243,0.2);
            left: ${startX}px; top: ${startY}px;
        `;
        overlay.appendChild(box);

        const onMouseMove = ev => {
            const width = ev.clientX - startX;
            const height = ev.clientY - startY;
            box.style.width = `${Math.abs(width)}px`;
            box.style.height = `${Math.abs(height)}px`;
            box.style.left = `${Math.min(ev.clientX, startX)}px`;
            box.style.top = `${Math.min(ev.clientY, startY)}px`;
        };

        const onMouseUp = async () => {
            overlay.removeEventListener("mousemove", onMouseMove);
            overlay.remove();
            const rect = box.getBoundingClientRect();
            await captureRegion(rect);
        };

        overlay.addEventListener("mousemove", onMouseMove);
        overlay.addEventListener("mouseup", onMouseUp);
    });
}

async function captureRegion(rect) {
    const lang = document.getElementById("ocrLang").value;
    document.getElementById("areaCaptureStatus").innerText = "📷 영역 캡처 중...";
    const canvas = await html2canvas(document.body);
    const croppedCanvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    croppedCanvas.width = rect.width * dpr;
    croppedCanvas.height = rect.height * dpr;
    const ctx = croppedCanvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.drawImage(canvas, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);
    croppedCanvas.toBlob(async blob => {
        const file = new File([blob], "area-capture.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch(`${BASE_URL}/api/image/upload`, {
            method: "POST",
            body: formData
        });
        imagePath = await uploadRes.text();
        document.getElementById("uploadResult").innerText = "✅ 업로드 완료: " + imagePath;
        const ocrRes = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath, lang })
        });
        const result = await ocrRes.json();
        document.getElementById("ocrResult").innerText = result.lines.join("\n");
        document.getElementById("areaCaptureStatus").innerText = "✅ OCR 완료";
    });
}