package com.example.chatbot.controller;

import com.example.chatbot.entity.Session;
import com.example.chatbot.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<Session> createSession(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody SessionRequest sessionRequest
            ) {
        Session session = sessionService.createSession(
                userDetails.getUsername(), sessionRequest.getTitle());
        return  ResponseEntity.ok(session);
    }

    @GetMapping
    public ResponseEntity<List<Session>> getSessions(@AuthenticationPrincipal UserDetails userDetails) {
        List<Session> sessions = sessionService.getUserSessions(userDetails.getUsername());
        return ResponseEntity.ok(sessions);
    }

    @DeleteMapping("/{sessionId}")
    public ResponseEntity<String> deleteSession(@PathVariable Long sessionId) {
        sessionService.deleteSession(sessionId);
        return ResponseEntity.ok("Session Deleted");
    }

    public static  class SessionRequest {
        private String title;
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
    }
}
