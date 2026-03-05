package com.example.chatbot.repository;

import com.example.chatbot.entity.ChatMessage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query(value = "SELECT id, user_message, ai_response, created_at " +
            "FROM chat_message " +
            "WHERE embedding <-> CAST(:embedding AS vector) < 0.5 " +
            "ORDER BY embedding <-> CAST(:embedding AS vector) LIMIT 5",
            nativeQuery = true)
    List<ChatMessage> findMostSimilar(@Param("embedding") String embedding);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO chat_message (user_message, ai_response, embedding, created_at) " +
            "VALUES (:userMessage, :aiResponse, CAST(:embedding AS vector), NOW())",
            nativeQuery = true)
    void insertWithEmbedding(@Param("userMessage") String userMessage,
                             @Param("aiResponse") String aiResponse,
                             @Param("embedding") String embedding);
}