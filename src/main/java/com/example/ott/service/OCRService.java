package com.example.ott.service;

import com.example.ott.util.TesseractUtil;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * OCR(광학 문자 인식) 처리 서비스 클래스
 *
 * 이미지를 입력받아 지정된 언어로 텍스트를 추출하고,
 * 줄 단위로 결과를 반환하는 기능을 제공한다.
 */
@Service
@RequiredArgsConstructor
public class OCRService {

    /**
     * 주어진 언어로 이미지에서 텍스트를 추출하여 줄 단위로 반환합니다.
     *
     * @param imagePath 이미지의 파일 경로
     * @param lang      사용할 OCR 언어 코드 (예: "kor", "eng")
     * @return 줄 단위로 분리된 텍스트 리스트
     * @throws RuntimeException OCR 처리 중 오류 발생 시 예외 전환
     */
    public List<String> performOCR(String imagePath, String lang) {
        try {
            // 언어 코드가 지정되지 않았을 경우 기본값으로 'kor' 설정
            if (lang == null || lang.trim().isEmpty()) {
                lang = "kor";
            }

            // TesseractUtil을 사용하여 전체 텍스트 추출
            String fullText = TesseractUtil.extractText(imagePath, lang);

            // 줄 단위로 텍스트 분리
            return TesseractUtil.splitLines(fullText);
        } catch (TesseractException e) {
            // OCR 처리 실패 시 예외 래핑
            throw new RuntimeException("OCR 처리 실패", e);
        }
    }
}