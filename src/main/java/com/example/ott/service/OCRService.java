package com.example.ott.service;

import com.example.ott.util.TesseractUtil;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OCRService {

    public List<String> performOCR(String imagePath) {
        try{
            String fullText = TesseractUtil.extractText(imagePath);
            return TesseractUtil.splitLines(fullText);
        } catch (TesseractException e) {
            throw new RuntimeException("OCR 처리 실패", e);
        }
    }
}
