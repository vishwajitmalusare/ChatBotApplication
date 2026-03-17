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

    @Query(value = "SELECT cm.id, cm.user_message, cm.ai_response, cm.session_id, cm.user_id, cm.created_at " +
            "FROM chat_message cm WHERE cm.session_id = :sessionId ORDER BY cm.created_at ASC",
            nativeQuery = true)
    List<ChatMessage> findBySessionId(@Param("sessionId") Long sessionId);

    @Query(value = "SELECT cm.id, cm.user_message, cm.ai_response, cm.session_id, cm.user_id, cm.created_at " +
            "FROM chat_message cm " +
            "WHERE cm.session_id = :sessionId " +
            "AND cm.embedding <-> CAST(:embedding AS vector) < 0.2 " +
            "ORDER BY cm.embedding <-> CAST(:embedding AS vector) LIMIT 1",
            nativeQuery = true)
    List<ChatMessage> findExactSimilar(@Param("embedding") String embedding,
                                       @Param("sessionId") Long sessionId);

    @Query(value = "SELECT cm.id, cm.user_message, cm.ai_response, cm.session_id, cm.user_id, cm.created_at " +
            "FROM chat_message cm " +
            "WHERE cm.session_id = :sessionId " +
            "AND cm.embedding <-> CAST(:embedding AS vector) < 0.5 " +
            "ORDER BY cm.embedding <-> CAST(:embedding AS vector) LIMIT 5",
            nativeQuery = true)
    List<ChatMessage> findMostSimilar(@Param("embedding") String embedding,
                                      @Param("sessionId") Long sessionId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO chat_message (user_message, ai_response, embedding, session_id, user_id, created_at) " +
            "VALUES (:userMessage, :aiResponse, CAST(:embedding AS vector), :sessionId, :userId, NOW())",
            nativeQuery = true)
    void insertWithEmbedding(@Param("userMessage") String userMessage,
                             @Param("aiResponse") String aiResponse,
                             @Param("embedding") String embedding,
                             @Param("sessionId") Long sessionId,
                             @Param("userId") Long userId);
}
