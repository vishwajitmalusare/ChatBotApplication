package com.example.chatbot.controller;

import com.example.chatbot.services.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin("*")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    public String chat(@RequestParam String message) {
        return chatService.getResponse(message);
    }

    @PostMapping
    public String chatPost(@RequestBody ChatRequest request) {
        return chatService.getResponse(request.getMessage());
    }

    public static class ChatRequest {
        private String message;
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
