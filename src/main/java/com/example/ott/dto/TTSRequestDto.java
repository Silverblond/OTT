package com.example.ott.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TTS(Text-to-Speech) 생성을 위한 요청 정보를 담는 DTO 클래스
 *
 * @param text         변환할 텍스트
 * @param languageCode 사용할 TTS 언어 코드 (예: "en-US", "ko-KR")
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TTSRequestDto {
    private String text;
    private String languageCode;
}
