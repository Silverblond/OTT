package com.example.ott.controller;

import com.example.ott.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {

    private final FileStorageService fileStorageService;

    //Post - upload
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        //파일 저장 후 저장된 경로 반환
        String savedPath = fileStorageService.saveImage(file);
        return ResponseEntity.ok(savedPath);
    }
}
