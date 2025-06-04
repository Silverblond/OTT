package com.example.ott.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * 번역 결과를 담는 DTO 클래스
 *
 * translatedText 필드는 번역된 텍스트 데이터를 포함한다.
 */
public class TranslationDto {
    private String translatedText;
}
