package com.example.chatbot.controller;

import com.example.chatbot.services.ChatService;
import com.example.chatbot.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private ChatService chatService;

    @PostMapping("/{sessionId}")
    public ResponseEntity<String> uploadFile(@PathVariable Long sessionId, @RequestParam("file")MultipartFile file,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        try {
            // extract text from file
            String extractedText = fileService.extractText(file);

            // build summary prompt
            String summaryPrompt = "You are a helpful assistant. Analyze the following content extracted from a file and provide a clear summary. " +
                    "Adapt your response based on the content type:\n" +
                    "- If it's code: explain what it does\n" +
                    "- If it's a document: summarize the key points\n" +
                    "- If it's an invoice/receipt: list the important details\n" +
                    "- If it's a resume: highlight key skills and experience\n" +
                    "- If it's an image with text: summarize the text\n" +
                    "- For any other content: provide a relevant summary\n\n" +
                    "Content:\n" + extractedText;

            // Get summary from AI
            String summary = chatService.getResponse(summaryPrompt, sessionId, userDetails.getUsername());

            return ResponseEntity.ok(summary);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
};
