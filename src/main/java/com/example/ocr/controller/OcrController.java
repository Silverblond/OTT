package com.example.ocr.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.IOException;
import java.util.UUID;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

import net.sourceforge.tess4j.Tesseract;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class OcrController {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @PostMapping("/image/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("업로드된 파일이 비어있습니다.");
        }

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

    @PostMapping("/ocr")
    public ResponseEntity<Map<String, Object>> performOcr(@RequestBody Map<String, String> request) {
        try {
            String imagePath = request.get("imagePath");
            String lang = request.get("lang");
            boolean enhancedMode = Boolean.parseBoolean(request.getOrDefault("enhancedMode", "false"));

            File imageFile = new File(uploadDir, imagePath);
            if (!imageFile.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Image file not found: " + imageFile.getAbsolutePath()));
            }

            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath("tessdata");
            tesseract.setLanguage(lang);

            if (enhancedMode) {
                tesseract.setPageSegMode(6);
                tesseract.setOcrEngineMode(1);
            }

            String result = tesseract.doOCR(imageFile);
            List<String> lines = Arrays.asList(result.split("\n"));
            
            Map<String, Object> response = new HashMap<>();
            response.put("lines", lines);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
} 