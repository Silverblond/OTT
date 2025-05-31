package com.example.ott.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OCRResultDto {
    private String ocrText; //인식된 텍스트
}
