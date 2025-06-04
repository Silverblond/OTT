package com.example.ott.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 번역 요청 정보를 담는 DTO 클래스
 *
 * @param originalText 번역할 원문 텍스트
 * @param targetLang   번역 대상 언어 코드 (예: "en", "ko", "ja" 등)
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TranslationRequestDto {
    private String originalText;
    private String targetLang;
}
