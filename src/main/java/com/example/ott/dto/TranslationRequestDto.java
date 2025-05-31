package com.example.ott.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TranslationRequestDto {
    private String originalText;
    private String targetLang;
}
