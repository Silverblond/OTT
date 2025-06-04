package com.example.ott.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * OCR 처리 결과를 담는 DTO 클래스
 *
 * @param lines 줄 단위로 인식된 텍스트 결과 목록
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OCRResultDto {
    private List<String> lines;
}
