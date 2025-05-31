package com.example.ott.controller;

import com.example.ott.dto.TranslationDto;
import com.example.ott.dto.TranslationRequestDto;
import com.example.ott.service.TranslateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/translate")
public class TranslateController {

    private final TranslateService translateService;

    @PostMapping
    public TranslationDto translatText(@RequestBody TranslationRequestDto requestDto) {
        String translated = translateService.translate(requestDto.getOriginalText(),requestDto.getTargetLang());
        return new TranslationDto(translated);
    }
}
