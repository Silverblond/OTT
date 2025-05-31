package com.example.ott.util;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

import java.io.File;

public class TesseractUtil {

    /**
     * 이미지를 OCR 처리하여 텍스트 추출
     *
     * @param imagePath 이미지 파일 경로
     * @return 추출된 텍스트
     * @throws TesseractException 오류 발생 시
     */
    public static String extractText(String imagePath) throws TesseractException {
        // Tesseract 인스턴스 Lazy 생성
        Tesseract tesseract = new Tesseract();

        // 데이터 경로 설정 (예: /opt/homebrew/share/tessdata 또는 /usr/local/share/tessdata)
        // 환경변수 혹은 고정 경로로 지정 가능
        String tessDataPath = System.getenv("TESSDATA_PREFIX");
        if (tessDataPath == null || tessDataPath.isEmpty()) {
            tessDataPath = "/opt/homebrew/share/tessdata";
        }

        tesseract.setDatapath(tessDataPath);
        tesseract.setLanguage("kor");

        return tesseract.doOCR(new File(imagePath));
    }
}