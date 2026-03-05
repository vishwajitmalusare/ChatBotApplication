package com.example.chatbot.services;

import com.example.chatbot.entity.ChatMessage;
import com.example.chatbot.repository.ChatMessageRepository;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository repository;

    @Autowired
    private EmbeddingModel embeddingModel;

    @Autowired
    private ChatModel chatModel;

    private String toVectorString(float[] embedding) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < embedding.length; i++) {
            sb.append(embedding[i]);
            if (i != embedding.length - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }

    public String getResponse(String message) {

        // 1️⃣ Generate embedding
        float[] embedding = embeddingModel.embed(message);
        String embeddingStr = toVectorString(embedding);

        // 2️⃣ Check if similar message already exists in DB (semantic cache)
        List<ChatMessage> exactMatch = repository.findMostSimilar(embeddingStr);
        if (!exactMatch.isEmpty()) {
            System.out.println("✅ Cache hit! Returning existing response.");
            return exactMatch.getFirst().getAiResponse();
        }

        // 3️⃣ Retrieve similar past messages for context
        List<ChatMessage> similarMessages = repository.findMostSimilar(embeddingStr);

        // 4️⃣ Build prompt
        StringBuilder prompt = new StringBuilder();
        for (ChatMessage chat : similarMessages) {
            prompt.append("User: ").append(chat.getUserMessage()).append("\n");
            prompt.append("AI: ").append(chat.getAiResponse()).append("\n");
        }
        prompt.append("User: ").append(message).append("\nAI:");

        // 5️⃣ Call AI
        String aiResponse = chatModel.call(prompt.toString());

        // 6️⃣ Save new message + embedding
        repository.insertWithEmbedding(message, aiResponse, embeddingStr);
        System.out.println("💾 New response saved to DB.");

        return aiResponse;
    }
}