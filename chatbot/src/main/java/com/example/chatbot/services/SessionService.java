package com.example.chatbot.services;

import com.example.chatbot.entity.Session;
import com.example.chatbot.entity.User;
import com.example.chatbot.repository.SessionRepository;
import com.example.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    public Session createSession(String username, String title) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Session session = new Session();
        session.setTitle(title);
        session.setUser(user);
        return sessionRepository.save(session);
    }

    public List<Session> getUserSessions(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return sessionRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public void deleteSession(Long sessionId) {
        sessionRepository.deleteById(sessionId);
    }
}