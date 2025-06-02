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

// 1. 이미지 업로드
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

// 2. OCR 실행
async function performOCR() {
    const response = await fetch(`${BASE_URL}/api/ocr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath })
    });

    const result = await response.json();
    document.getElementById("ocrResult").innerText = result.lines.join("\n");
}

// 3. 번역 실행
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

// 4. TTS 생성
async function generateTTS() {
    const response = await fetch(`${BASE_URL}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            text: translatedText,
            languageCode: languageCode
        })
    });

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    document.getElementById("audioPlayer").src = audioUrl;
}