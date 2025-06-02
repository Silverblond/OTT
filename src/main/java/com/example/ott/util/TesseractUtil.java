package com.example.ott.util;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class TesseractUtil {

    /**
     * 이미지에서 주어진 언어로 텍스트 추출
     *
     * @param imagePath 이미지 파일 경로
     * @param lang      언어 코드 (예: "kor", "eng", "jpn", "chi_sim" 등)
     * @return OCR 결과 텍스트
     * @throws TesseractException 오류 발생 시
     */
    public static String extractText(String imagePath, String lang) throws TesseractException {
        Tesseract tesseract = new Tesseract();

        // TESSDATA_PREFIX 환경변수 또는 기본 경로 사용
        String tessDataPath = System.getenv("TESSDATA_PREFIX");
        if (tessDataPath == null || tessDataPath.isEmpty()) {
            tessDataPath = "/opt/homebrew/share/tessdata";  // 또는 "/usr/share/tessdata"
        }

        tesseract.setDatapath(tessDataPath);
        tesseract.setLanguage(lang); // lang 파라미터로 설정

        return tesseract.doOCR(new File(imagePath));
    }

    /**
     * OCR 텍스트를 줄 단위로 정제
     */
    public static List<String> splitLines(String rawText) {
        return Arrays.stream(rawText.split("\\r?\\n"))
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .collect(Collectors.toList());
    }
}