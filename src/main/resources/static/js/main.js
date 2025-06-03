// OCR 번역 TTS 시스템 JS 전체 코드
let imagePath = "";
let translatedText = "";
let languageCode = "en-US";
const BASE_URL = "http://localhost:8080";
let selectedOcrLangs = new Set();
let previousScreen = "mainScreen"; // 이전 화면을 추적하는 변수 추가

// 기본 설정
const defaultSettings = {
    darkMode: false,
    defaultOcrLang: ["kor"],
    defaultTranslateLang: "en",
    useCustomFilename: false,
    customFilename: "",
    siteLanguage: "ko"
};

// 번역된 텍스트 정의
const translations = {
    ko: {
        mainTitle: "📄 OCR 번역 TTS 시스템",
        start: "시작하기",
        settings: "⚙️ 설정",
        upload: "업로드",
        add: "추가",
        startOcr: "OCR 시작",
        capture: "📸 전체 화면 캡처",
        areaCapture: "📐 영역 지정 캡처",
        viewResult: "👉 결과 보기",
        ocrResult: "📝 OCR 결과",
        copyOcr: "📋 OCR 복사",
        saveOcr: "📝 OCR 결과 저장",
        translation: "🌐 번역",
        selectTargetLang: "번역할 언어 선택:",
        startTranslation: "번역 시작",
        saveTranslation: "🌐 번역 결과 저장",
        copyTranslation: "📋 번역 복사",
        tts: "🔊 TTS",
        runTts: "TTS 실행",
        backToOcr: "← 다시 OCR 화면",
        darkMode: "다크 모드:",
        defaultOcrLang: "기본 OCR 언어 설정:",
        customFilename: "파일명 직접 입력:",
        siteLanguage: "사이트 언어:",
        applySettings: "설정 저장",
        backToPrevious: "이전 화면으로",
        imageUpload: "1. 이미지 업로드",
        ocrLangSelect: "2. OCR 언어 선택",
        langKor: "한국어",
        langEng: "영어",
        langJpn: "일본어",
        langChiSim: "중국어 간체",
        langChiTrad: "중국어 번체",
        langRus: "러시아어",
        langDeu: "독일어",
        langFra: "프랑스어",
        langSpa: "스페인어",
        langVie: "베트남어",
        langTha: "태국어",
        noFileSelected: "선택된 파일 없음",
        uploadSuccess: "✅ 이미지 업로드 성공",
        uploadFail: "❌ 이미지 업로드 실패",
        copySuccess: "✅ 복사 성공",
        copyFail: "❌ 복사 실패",
        saveSuccess: "✅ 저장 성공",
        saveFail: "❌ 저장 실패",
        noOcrResult: "OCR 결과가 비어 있습니다.",
        noTranslationResult: "번역 결과가 비어 있습니다.",
        ocrProcessing: "OCR 처리 중...",
        ocrSuccess: "✅ OCR 처리 완료",
        ocrFail: "❌ OCR 처리 실패",
        translationProcessing: "번역 처리 중...",
        translationSuccess: "✅ 번역 완료",
        translationFail: "❌ 번역 실패",
        ttsProcessing: "TTS 생성 중...",
        ttsSuccess: "✅ TTS 생성 완료",
        ttsFail: "❌ TTS 생성 실패",
        totalLines: "총 {count}줄의 텍스트가 인식되었습니다.",
        totalWords: "총 {count}개의 단어가 인식되었습니다.",
        selectFile: "파일 선택",
        savePathPlaceholder: "예: /Users/사용자이름/Desktop 또는 C:\\Users\\사용자이름\\Desktop"
    },
    en: {
        mainTitle: "📄 OCR Translation TTS System",
        start: "Start",
        settings: "⚙️ Settings",
        upload: "Upload",
        add: "Add",
        startOcr: "Start OCR",
        capture: "📸 Full Screen Capture",
        areaCapture: "📐 Area Capture",
        viewResult: "👉 View Result",
        ocrResult: "📝 OCR Result",
        copyOcr: "📋 Copy OCR",
        saveOcr: "📝 Save OCR Result",
        translation: "🌐 Translation",
        selectTargetLang: "Select target language:",
        startTranslation: "Start Translation",
        saveTranslation: "🌐 Save Translation",
        copyTranslation: "📋 Copy Translation",
        tts: "🔊 TTS",
        runTts: "Run TTS",
        backToOcr: "← Back to OCR",
        darkMode: "Dark Mode:",
        defaultOcrLang: "Default OCR Language:",
        customFilename: "Custom Filename:",
        siteLanguage: "Site Language:",
        applySettings: "Apply Settings",
        backToPrevious: "Back to Previous",
        imageUpload: "1. Image Upload",
        ocrLangSelect: "2. OCR Language Selection",
        langKor: "Korean",
        langEng: "English",
        langJpn: "Japanese",
        langChiSim: "Chinese (Simplified)",
        langChiTrad: "Chinese (Traditional)",
        langRus: "Russian",
        langDeu: "German",
        langFra: "French",
        langSpa: "Spanish",
        langVie: "Vietnamese",
        langTha: "Thai",
        noFileSelected: "No file selected",
        uploadSuccess: "✅ Image upload successful",
        uploadFail: "❌ Image upload failed",
        copySuccess: "✅ Copy successful",
        copyFail: "❌ Copy failed",
        saveSuccess: "✅ Save successful",
        saveFail: "❌ Save failed",
        noOcrResult: "OCR result is empty.",
        noTranslationResult: "Translation result is empty.",
        ocrProcessing: "Processing OCR...",
        ocrSuccess: "✅ OCR processing completed",
        ocrFail: "❌ OCR processing failed",
        translationProcessing: "Processing translation...",
        translationSuccess: "✅ Translation completed",
        translationFail: "❌ Translation failed",
        ttsProcessing: "Generating TTS...",
        ttsSuccess: "✅ TTS generation completed",
        ttsFail: "❌ TTS generation failed",
        totalLines: "Total {count} lines of text recognized.",
        totalWords: "Total {count} words recognized.",
        selectFile: "Select File",
        savePathPlaceholder: "Example: /Users/username/Desktop or C:\\Users\\username\\Desktop"
    },
};

// 페이지 로드 시 설정 불러오기
document.addEventListener("DOMContentLoaded", () => {
    // 로컬 스토리지 초기화 (첫 실행 시)
    if (!localStorage.getItem("appSettings")) {
        localStorage.setItem("appSettings", JSON.stringify(defaultSettings));
    }
    
    loadSettings();
    initTargetLangDropdown();
    
    // 시작하기 버튼 이벤트
    document.getElementById("startBtn").addEventListener("click", () => {
        showScreen("ocrScreen");
    });

    // 캡처 버튼 이벤트
    document.getElementById("screenshotBtn").addEventListener("click", captureAndSend);
    document.getElementById("areaCaptureBtn").addEventListener("click", startAreaCapture);
    
    // 파일 선택 이벤트 리스너
    const fileInput = document.getElementById("imageInput");
    const selectedFileName = document.getElementById("selectedFileName");
    
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            selectedFileName.textContent = file.name;
        } else {
            selectedFileName.textContent = getTranslatedMessage("noFileSelected");
        }
    });

    // 파일명 입력 필드 이벤트 리스너
    const filenameInput = document.getElementById("filenameInput");
    if (filenameInput) {
        filenameInput.addEventListener("input", () => {
            const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
            settings.customFilename = filenameInput.value.trim();
            localStorage.setItem("appSettings", JSON.stringify(settings));
        });
    }

    // 설정 화면의 이전 화면으로 돌아가기 버튼 이벤트
    const backToPreviousBtn = document.querySelector('#settingsScreen button[data-translate="backToPrevious"]');
    if (backToPreviousBtn) {
        backToPreviousBtn.addEventListener("click", () => {
            showScreen(previousScreen);
        });
    }
});

// 화면 전환 함수 수정
function showScreen(targetId) {
    const screens = ["mainScreen", "ocrScreen", "resultScreen", "settingsScreen"];
    
    // 설정 화면으로 이동할 때 현재 화면을 저장
    if (targetId === "settingsScreen") {
        screens.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.style.display === "block") {
                previousScreen = id;
            }
        });
    }
    
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = (id === targetId) ? "block" : "none";
        }
    });
}

// 설정 관련 함수들
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
    applySettings(settings);
    return settings;
}

// 운영체제 감지 함수
function getOSPathSeparator() {
    return navigator.platform.includes('Win') ? '\\' : '/';
}

// 경로 정규화 함수
function normalizePath(path) {
    if (!path) return '';
    
    // 모든 경로 구분자를 현재 OS에 맞는 구분자로 변환
    const separator = getOSPathSeparator();
    const normalizedPath = path.replace(/[\/\\]/g, separator);
    
    // 경로 끝에 구분자가 없는 경우 추가
    return normalizedPath.endsWith(separator) ? normalizedPath : normalizedPath + separator;
}

// 파일명에서 경로 제거 함수
function getFileNameFromPath(path) {
    const separator = getOSPathSeparator();
    const parts = path.split(/[\/\\]/);
    return parts[parts.length - 1];
}

function downloadTextFile(content, defaultFilename) {
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
    let filename = settings.useCustomFilename && settings.customFilename 
        ? settings.customFilename 
        : defaultFilename;
    
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    
    // 다운로드 시작
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // 저장 성공 메시지 표시
    alert(getTranslatedMessage("saveSuccess"));
}

// 설정 저장 함수 수정
function saveSettings() {
    const settings = {
        darkMode: document.getElementById("darkModeToggle").checked,
        defaultOcrLang: [document.getElementById("defaultLang").value],
        defaultTranslateLang: document.getElementById("targetLang")?.value || "en",
        useCustomFilename: document.getElementById("customFilename").checked,
        customFilename: document.getElementById("filenameInput").value.trim(),
        siteLanguage: document.getElementById("siteLanguage").value
    };
    
    localStorage.setItem("appSettings", JSON.stringify(settings));
    applySettings(settings);
}

// 설정 적용 함수 수정
function applySettings(settings) {
    // 다크모드 적용
    if (settings.darkMode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // OCR 언어 설정 적용
    const defaultLangSelect = document.getElementById("defaultLang");
    if (defaultLangSelect) {
        defaultLangSelect.value = settings.defaultOcrLang[0];
    }

    // OCR 언어 드롭다운 업데이트
    const ocrLangDropdown = document.getElementById("ocrLangDropdown");
    if (ocrLangDropdown) {
        ocrLangDropdown.value = settings.defaultOcrLang[0];
        selectedOcrLangs.clear();
        selectedOcrLangs.add(settings.defaultOcrLang[0]);
        updateSelectedLangTags();
    }

    // 번역 언어 설정 적용
    const targetLangSelect = document.getElementById("targetLang");
    if (targetLangSelect) {
        targetLangSelect.value = settings.defaultTranslateLang;
    }

    // 파일명 직접 입력 설정 적용
    const customFilename = document.getElementById("customFilename");
    const filenameInput = document.getElementById("filenameInput");
    if (customFilename && filenameInput) {
        customFilename.checked = settings.useCustomFilename || false;
        filenameInput.value = settings.customFilename || "";
        filenameInput.style.display = settings.useCustomFilename ? "block" : "none";
    }

    // 사이트 언어 적용
    const siteLanguage = document.getElementById("siteLanguage");
    if (siteLanguage) {
        siteLanguage.value = settings.siteLanguage;
        changeSiteLanguage(); // 언어 변경 즉시 적용
    }
}

// 다크모드 토글
function toggleDarkMode() {
    const isDarkMode = document.getElementById("darkModeToggle").checked;
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// OCR 언어 업데이트
function updateDefaultOcrLang() {
    const lang = document.getElementById("defaultLang").value;
    selectedOcrLangs.clear();
    selectedOcrLangs.add(lang);
    updateSelectedLangTags();
}

// 선택된 언어 태그 업데이트
function updateSelectedLangTags() {
    const container = document.getElementById("selectedLangTags");
    container.innerHTML = "";
    const currentLang = getCurrentLanguage();
    
    selectedOcrLangs.forEach(code => {
        const langKey = getLangKeyFromCode(code);
        const tag = document.createElement("span");
        tag.className = "lang-tag";
        tag.dataset.code = code;
        tag.innerHTML = `${translations[currentLang][langKey]} <button onclick="removeOcrLang('${code}')">×</button>`;
        container.appendChild(tag);
    });
}

// OCR 언어 추가
function addOcrLang() {
    const dropdown = document.getElementById("ocrLangDropdown");
    const langCode = dropdown.value;
    const langText = dropdown.options[dropdown.selectedIndex].text;

    if (selectedOcrLangs.has(langCode)) return;

    selectedOcrLangs.add(langCode);
    updateSelectedLangTags();
}

// OCR 언어 제거
function removeOcrLang(code) {
    selectedOcrLangs.delete(code);
    updateSelectedLangTags();
}

// ... (기존 OCR, 번역, TTS 관련 함수들은 그대로 유지) ...

function initTargetLangDropdown() {
    const select = document.getElementById("targetLang");
    const options = [
        { code: "en", label: "langEng" },
        { code: "ko", label: "langKor" },
        { code: "ja", label: "langJpn" },
        { code: "zh-CN", label: "langChiSim" },
        { code: "zh-TW", label: "langChiTrad" },
        { code: "fr", label: "langFra" },
        { code: "de", label: "langDeu" },
        { code: "es", label: "langSpa" },
        { code: "ru", label: "langRus" },
        { code: "vi", label: "langVie" },
        { code: "th", label: "langTha" }
    ];
    
    select.innerHTML = '';
    options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.code;
        o.setAttribute("data-translate", opt.label);
        const currentLang = getCurrentLanguage();
        o.textContent = translations[currentLang][opt.label] || translations['ko'][opt.label];
        select.appendChild(o);
    });
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

function saveOCRResult() {
    const text = document.getElementById("ocrResult")?.innerText || "";
    if (!text.trim()) return alert("OCR 결과가 비어 있습니다.");
    downloadTextFile(text, "ocr_result.txt");
}

function saveTranslationResult() {
    const text = document.getElementById("translationResult")?.innerText || "";
    if (!text.trim()) return alert("번역 결과가 비어 있습니다.");
    downloadTextFile(text, "translation_result.txt");
}

function copyTranslation() {
    const text = document.getElementById("translationResult")?.innerText || "";
    if (!text.trim()) {
        alert(getTranslatedMessage("noTranslationResult"));
        return;
    }
    navigator.clipboard.writeText(text)
        .then(() => alert(getTranslatedMessage("copySuccess")))
        .catch(() => alert(getTranslatedMessage("copyFail")));
}

function copyOCRResult() {
    const text = document.getElementById("ocrResult")?.innerText || "";
    if (!text.trim()) {
        alert(getTranslatedMessage("noOcrResult"));
        return;
    }
    navigator.clipboard.writeText(text)
        .then(() => alert(getTranslatedMessage("copySuccess")))
        .catch(() => alert(getTranslatedMessage("copyFail")));
}

function getTTSLang(target) {
    const map = {
        ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN",
        "zh-CN": "zh-CN", "zh-TW": "zh-TW", fr: "fr-FR", de: "de-DE",
        es: "es-ES", ru: "ru-RU", vi: "vi-VN", th: "th-TH"
    };
    return map[target] || "en-US";
}

// 📸 캡처 및 영역 캡처 함수 생략 안 함
async function captureAndSend() {
    const lang = Array.from(selectedOcrLangs).join("+");
    const canvas = await html2canvas(document.body);
    canvas.toBlob(async blob => {
        const file = new File([blob], "screenshot.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${BASE_URL}/api/image/upload`, { method: "POST", body: formData });
        imagePath = await res.text();
        const ocrRes = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath, lang })
        });
        const result = await ocrRes.json();
        document.getElementById("ocrResult").innerText = result.lines.join("\n");
    });
}

function startAreaCapture() {
    // 기존 오버레이가 있다면 제거
    const existingOverlay = document.getElementById("captureOverlay");
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = "captureOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "crosshair";
    document.body.appendChild(overlay);

    let startX, startY, box;
    let isCapturing = false;

    overlay.addEventListener("mousedown", e => {
        isCapturing = true;
        startX = e.clientX;
        startY = e.clientY;

        box = document.createElement("div");
        box.className = "selectionBox";
        box.style.position = "absolute";
        box.style.border = "2px solid #00ff00";
        box.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;
        overlay.appendChild(box);

        const onMouseMove = e => {
            if (!isCapturing) return;
            
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            box.style.width = `${Math.abs(width)}px`;
            box.style.height = `${Math.abs(height)}px`;
            box.style.left = `${Math.min(e.clientX, startX)}px`;
            box.style.top = `${Math.min(e.clientY, startY)}px`;
        };

        const onMouseUp = async () => {
            if (!isCapturing) return;
            isCapturing = false;
            
            const rect = box.getBoundingClientRect();
            if (rect.width < 10 || rect.height < 10) {
                overlay.remove();
                return;
            }

            try {
                document.getElementById("areaCaptureStatus").textContent = getTranslatedMessage("ocrProcessing");
                await captureRegion(rect);
                document.getElementById("areaCaptureStatus").textContent = getTranslatedMessage("ocrSuccess");
            } catch (error) {
                console.error("영역 캡처 에러:", error);
                document.getElementById("areaCaptureStatus").textContent = getTranslatedMessage("ocrFail");
            } finally {
                overlay.remove();
            }
        };

        overlay.addEventListener("mousemove", onMouseMove);
        overlay.addEventListener("mouseup", onMouseUp);
    });

    // ESC 키로 캡처 취소
    const onKeyDown = (e) => {
        if (e.key === "Escape") {
            overlay.remove();
            document.removeEventListener("keydown", onKeyDown);
        }
    };
    document.addEventListener("keydown", onKeyDown);
}

async function captureRegion(rect) {
    const lang = Array.from(selectedOcrLangs).join("+");
    
    try {
        const canvas = await html2canvas(document.body, {
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
        });

        const cropped = document.createElement("canvas");
        const dpr = window.devicePixelRatio || 1;
        cropped.width = rect.width * dpr;
        cropped.height = rect.height * dpr;
        
        const ctx = cropped.getContext("2d");
        ctx.scale(dpr, dpr);
        ctx.drawImage(
            canvas,
            rect.left, rect.top, rect.width, rect.height,
            0, 0, rect.width, rect.height
        );

        return new Promise((resolve, reject) => {
            cropped.toBlob(async blob => {
                try {
                    const file = new File([blob], "area.png", { type: "image/png" });
                    const formData = new FormData();
                    formData.append("file", file);

                    const res = await fetch(`${BASE_URL}/api/image/upload`, {
                        method: "POST",
                        body: formData
                    });

                    if (!res.ok) {
                        throw new Error("이미지 업로드 실패");
                    }

                    imagePath = await res.text();
                    const ocrRes = await fetch(`${BASE_URL}/api/ocr`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ imagePath, lang })
                    });

                    if (!ocrRes.ok) {
                        throw new Error("OCR 처리 실패");
                    }

                    const result = await ocrRes.json();
                    document.getElementById("ocrResult").innerText = result.lines.join("\n");
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, "image/png");
        });
    } catch (error) {
        throw error;
    }
}

// 이미지 업로드 함수
async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];
    if (!file) {
        alert(getTranslatedMessage("noFileSelected"));
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch(`${BASE_URL}/api/image/upload`, {
            method: "POST",
            body: formData
        });
        
        if (!res.ok) {
            throw new Error("업로드 실패");
        }

        imagePath = await res.text();
        document.getElementById("uploadResult").textContent = getTranslatedMessage("uploadSuccess");
        
        const preview = document.getElementById("imagePreview");
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    } catch (error) {
        console.error("업로드 에러:", error);
        document.getElementById("uploadResult").textContent = getTranslatedMessage("uploadFail");
    }
}

// OCR 실행 함수
async function performOCR() {
    if (!imagePath) {
        alert(getTranslatedMessage("noFileSelected"));
        return;
    }

    const lang = Array.from(selectedOcrLangs).join("+");
    try {
        document.getElementById("ocrResult").innerText = getTranslatedMessage("ocrProcessing");
        const res = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath, lang })
        });

        if (!res.ok) {
            throw new Error("OCR 처리 실패");
        }

        const result = await res.json();
        document.getElementById("ocrResult").innerText = result.lines.join("\n");
        
        // 줄 수와 단어 수 계산
        const lineCount = result.lines.length;
        const wordCount = result.lines.reduce((count, line) => count + line.split(/\s+/).filter(word => word.length > 0).length, 0);
        
        // 번역된 통계 메시지 표시
        const statsText = [
            getTranslatedMessage("totalLines", { count: lineCount }),
            getTranslatedMessage("totalWords", { count: wordCount })
        ].join("\n");
        
        document.getElementById("ocrStats").innerText = statsText;
        document.getElementById("uploadResult").textContent = getTranslatedMessage("ocrSuccess");
    } catch (error) {
        console.error("OCR 에러:", error);
        document.getElementById("uploadResult").textContent = getTranslatedMessage("ocrFail");
    }
}

// 파일명 직접 입력 토글
function toggleCustomFilename() {
    const checkbox = document.getElementById("customFilename");
    const input = document.getElementById("filenameInput");
    input.style.display = checkbox.checked ? "block" : "none";
    
    // 파일명 입력 필드에 현재 파일명 표시
    if (checkbox.checked) {
        const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
        input.value = settings.customFilename || "result.txt";
    }
}

// 사이트 언어 변경
function changeSiteLanguage() {
    const lang = document.getElementById("siteLanguage").value;
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
    settings.siteLanguage = lang;
    localStorage.setItem("appSettings", JSON.stringify(settings));
    
    // 페이지 새로고침 없이 언어 변경 적용
    const currentTranslations = translations[lang] || translations['ko'];
    
    // 모든 버튼, 라벨, 제목, 옵션의 텍스트 업데이트
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key && currentTranslations[key]) {
            if (element.tagName === 'LABEL') {
                element.textContent = currentTranslations[key] + ':';
            } else if (element.tagName === 'OPTION') {
                element.textContent = currentTranslations[key];
            } else {
                element.textContent = currentTranslations[key];
            }
        }
    });

    // 파일 입력 placeholder 업데이트
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (key && currentTranslations[key]) {
            element.setAttribute('placeholder', currentTranslations[key]);
        }
    });

    // 번역 언어 드롭다운 업데이트
    initTargetLangDropdown();
    
    // OCR 언어 태그 업데이트
    updateSelectedLangTags();
}

// 현재 언어 가져오기
function getCurrentLanguage() {
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
    return settings.siteLanguage;
}

// 번역된 메시지 가져오기
function getTranslatedMessage(key, params = {}) {
    const lang = getCurrentLanguage();
    let message = translations[lang][key] || translations['ko'][key];
    
    // 파라미터 치환
    Object.keys(params).forEach(param => {
        message = message.replace(`{${param}}`, params[param]);
    });
    
    return message;
}

// 언어 코드를 번역 키로 변환
function getLangKeyFromCode(code) {
    const codeToKey = {
        'kor': 'langKor',
        'eng': 'langEng',
        'jpn': 'langJpn',
        'chi_sim': 'langChiSim',
        'chi_tra': 'langChiTrad',
        'rus': 'langRus',
        'deu': 'langDeu',
        'fra': 'langFra',
        'spa': 'langSpa',
        'vie': 'langVie',
        'tha': 'langTha'
    };
    return codeToKey[code] || 'langEng';
}
