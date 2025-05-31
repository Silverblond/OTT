package com.example.ott.controller;

import com.example.ott.dto.OCRRequestDto;
import com.example.ott.dto.OCRResultDto;
import com.example.ott.service.OCRService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ocr")
public class OCRController {

    private final OCRService ocrService;

    @PostMapping
    public OCRResultDto ocrImage(@RequestBody OCRRequestDto requestDto) {
        List<String> lines = ocrService.performOCR(requestDto.getImagePath());
        return new OCRResultDto(lines);
    }
}
