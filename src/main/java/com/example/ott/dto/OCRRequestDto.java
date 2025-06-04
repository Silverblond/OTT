package com.example.ott.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * OCR 요청에 사용되는 데이터 전송 객체 (DTO)
 *
 * @field imagePath OCR을 수행할 이미지의 경로
 * @field lang      이미지에서 추출할 텍스트의 언어 코드
 */
@Getter
@Setter
public class OCRRequestDto {
    private String imagePath; //저장된 이미지 경로
    private String lang;
}
