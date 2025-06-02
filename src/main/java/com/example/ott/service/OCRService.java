package com.example.ott.service;

import com.example.ott.util.TesseractUtil;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OCRService {

    /**
     * 주어진 언어로 이미지에서 텍스트 추출
     *
     * @param imagePath 이미지 경로
     * @param lang      언어 코드
     * @return 줄 단위로 나눈 OCR 결과
     */
    public List<String> performOCR(String imagePath, String lang) {
        try {
            if (lang == null || lang.trim().isEmpty()) {
                lang = "kor"; // 기본값 설정
            }
            String fullText = TesseractUtil.extractText(imagePath, lang);
            return TesseractUtil.splitLines(fullText);
        } catch (TesseractException e) {
            throw new RuntimeException("OCR 처리 실패", e);
        }
    }
}