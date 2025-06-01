package com.example.ott.controller;

import com.example.ott.dto.TTSRequestDto;
import com.example.ott.service.TTSService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tts")
public class TTSController {

    private final TTSService ttsService;

    @PostMapping(produces = "audio/mpeg")
    public ResponseEntity<byte[]> convertToSpeech(@RequestBody TTSRequestDto requestDto) {
        byte[] audio = ttsService.generateSpeech(requestDto.getText(), requestDto.getLanguageCode());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("audio/mpeg"));
        headers.setContentLength(audio.length);

        return new ResponseEntity<>(audio, headers, HttpStatus.OK);
    }
}
