package com.example.ott.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TTSRequestDto {
    private String text;
    private String languageCode;
}
