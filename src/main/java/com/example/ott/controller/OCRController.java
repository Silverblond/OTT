package com.example.ott.controller;

import com.example.ott.dto.OCRRequestDto;
import com.example.ott.dto.OCRResultDto;
import com.example.ott.service.OCRService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ocr")
public class OCRController {

    private final OCRService ocrService;

    @PostMapping
    public OCRResultDto ocrImage(@RequestBody OCRRequestDto requestDto) {
        String imagePath = requestDto.getImagePath();
        String lang = requestDto.getLang(); // 클라이언트로부터 전달받은 언어 코드

        List<String> lines = ocrService.performOCR(imagePath, lang);
        return new OCRResultDto(lines);
    }
}