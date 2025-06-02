let imagePath = "";         // 서버에 저장된 이미지 경로 저장용
let translatedText = "";    // 번역된 텍스트 저장용
let languageCode = "en-US"; // TTS용 언어 코드
const BASE_URL = "http://localhost:8080";

// 언어 코드 매핑 함수
function getTTSLang(target) {
    const map = {
        ko: "ko-KR",
        en: "en-US",
        ja: "ja-JP",
        zh: "zh-CN",
    };
    return map[target] || "en-US";  // 기본 영어
}

// 이미지 업로드
async function uploadImage() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];
    if (!file) {
        alert("이미지를 선택해주세요.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/api/image/upload`, {
        method: "POST",
        body: formData
    });

    const result = await response.text();
    imagePath = result;
    document.getElementById("uploadResult").innerText = "✅ 업로드 완료: " + imagePath;
}

// OCR 실행
async function performOCR() {
    const response = await fetch(`${BASE_URL}/api/ocr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath })
    });

    const result = await response.json();
    document.getElementById("ocrResult").innerText = result.lines.join("\n");
}

// 번역 실행
async function translateText() {
    const targetLang = document.getElementById("targetLang").value;
    const originalText = document.getElementById("ocrResult").innerText;

    const response = await fetch(`${BASE_URL}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalText, targetLang })
    });

    const result = await response.json();
    translatedText = result.translatedText;
    languageCode = getTTSLang(targetLang); // 변환된 TTS용 언어코드 저장
    document.getElementById("translationResult").innerText = translatedText;
}

// TTS 생성
async function generateTTS() {
    const response = await fetch(`${BASE_URL}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: translatedText, languageCode })
    });

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    document.getElementById("audioPlayer").src = audioUrl;
}

// 전체 화면 캡처
async function captureAndSend() {
    document.getElementById("screenshotStatus").innerText = "📷 캡처 중...";

    const canvas = await html2canvas(document.body);
    canvas.toBlob(async function(blob) {
        const file = new File([blob], "screenshot.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await fetch(`${BASE_URL}/api/image/upload`, {
            method: "POST",
            body: formData
        });

        if (!uploadResponse.ok) {
            document.getElementById("screenshotStatus").innerText = "❌ 업로드 실패";
            return;
        }

        const result = await uploadResponse.text();
        imagePath = result;
        document.getElementById("uploadResult").innerText = "✅ 업로드 완료: " + imagePath;

        const ocrResponse = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath })
        });

        const ocrResult = await ocrResponse.json();
        document.getElementById("ocrResult").innerText = ocrResult.lines.join("\n");
        document.getElementById("screenshotStatus").innerText = "✅ OCR 완료";
    });
}

document.getElementById("screenshotBtn").addEventListener("click", captureAndSend);
document.getElementById("areaCaptureBtn").addEventListener("click", startAreaCapture);

// 영역 캡처 실행
function startAreaCapture() {
    const overlay = document.createElement("div");
    overlay.id = "captureOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0,0,0,0.2)";
    overlay.style.zIndex = 9999;
    overlay.style.cursor = "crosshair";
    document.body.appendChild(overlay);

    let startX, startY, box;

    overlay.addEventListener("mousedown", function (e) {
        startX = e.clientX;
        startY = e.clientY;

        box = document.createElement("div");
        box.className = "selectionBox";
        box.style.position = "absolute";
        box.style.border = "2px dashed #2196f3";
        box.style.background = "rgba(33, 150, 243, 0.2)";
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;
        overlay.appendChild(box);

        function onMouseMove(ev) {
            const width = ev.clientX - startX;
            const height = ev.clientY - startY;
            box.style.width = `${Math.abs(width)}px`;
            box.style.height = `${Math.abs(height)}px`;
            box.style.left = `${Math.min(ev.clientX, startX)}px`;
            box.style.top = `${Math.min(ev.clientY, startY)}px`;
        }

        function onMouseUp(ev) {
            overlay.removeEventListener("mousemove", onMouseMove);
            overlay.removeEventListener("mouseup", onMouseUp);
            const rect = box.getBoundingClientRect();
            captureRegion(rect);
            overlay.remove();
        }

        overlay.addEventListener("mousemove", onMouseMove);
        overlay.addEventListener("mouseup", onMouseUp);
    });
}

// 영역 캡처 후 업로드 및 OCR
async function captureRegion(rect) {
    document.getElementById("areaCaptureStatus").innerText = "📷 영역 캡처 중...";
    const canvas = await html2canvas(document.body);

    const croppedCanvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    croppedCanvas.width = rect.width * dpr;
    croppedCanvas.height = rect.height * dpr;

    const ctx = croppedCanvas.getContext("2d");
    ctx.scale(dpr, dpr);  // 실제 캔버스 크기를 확대
    ctx.drawImage(
        canvas,
        rect.left, rect.top, rect.width, rect.height,
        0, 0, rect.width, rect.height
    );
    croppedCanvas.toBlob(async function (blob) {
        const file = new File([blob], "area-capture.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await fetch(`${BASE_URL}/api/image/upload`, {
            method: "POST",
            body: formData
        });

        if (!uploadResponse.ok) {
            document.getElementById("areaCaptureStatus").innerText = "❌ 업로드 실패";
            return;
        }

        const result = await uploadResponse.text();
        imagePath = result;
        document.getElementById("uploadResult").innerText = "✅ 업로드 완료: " + imagePath;

        const ocrResponse = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath })
        });

        const ocrResult = await ocrResponse.json();
        document.getElementById("ocrResult").innerText = ocrResult.lines.join("\n");
        document.getElementById("areaCaptureStatus").innerText = "✅ OCR 완료";
    });
}