# OTT
OCR, Translate and TTS

# OCR + 번역 서비스 프로젝트 (OTT)

손글씨 및 이미지에서 텍스트를 추출(OCR)한 후 번역 결과를 제공하는 웹 서비스입니다.  
**Spring Boot + Gradle + Tess4J + Tesseract OCR 엔진** 기반으로 구현되었습니다.

---

## 📂 프로젝트 구성

- Backend : Spring Boot (Gradle)
- Frontend : HTML + JavaScript
- OCR : Tesseract OCR (Tess4J 라이브러리 사용)

---

## 🚀 설치 및 실행 방법

---

## 📦 설치 방법 (Windows / macOS / Ubuntu 전부 포함)

---

### 🪟 Windows 설치 방법 (처음부터 단계별)

#### 1️⃣ Java 17 설치

- [AdoptOpenJDK](https://adoptium.net/) 또는 [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) 에서 Java 17 설치
- 설치 후 `JAVA_HOME` 환경변수 설정 필요

#### 2️⃣ Git 설치

- [Git 공식 다운로드](https://git-scm.com/download/win)에서 설치

#### 3️⃣ Tesseract 설치

Chocolatey 사용 (권장):

```powershell
choco install tesseract

#### 4️⃣ kor.traineddata 설치 확인
# kor.traineddata 파일이 아래 경로에 존재하는지 확인
C:\Program Files\Tesseract-OCR\tessdata\kor.traineddata
