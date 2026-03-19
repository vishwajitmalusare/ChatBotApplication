package com.example.chatbot.services;

import com.example.chatbot.entity.ChatMessage;
import com.example.chatbot.entity.Session;
import com.example.chatbot.entity.User;
import com.example.chatbot.repository.ChatMessageRepository;
import com.example.chatbot.repository.SessionRepository;
import com.example.chatbot.repository.UserRepository;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.StreamingChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository repository;

    @Autowired
    private EmbeddingModel embeddingModel;

    @Autowired
    private ChatModel chatModel;

    @Autowired
    private StreamingChatModel streamingChatModel;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    private String toVectorString(float[] embedding) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < embedding.length; i++) {
            sb.append(embedding[i]);
            if (i != embedding.length - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }

    private StringBuilder buildPrompt(List<ChatMessage> recentMessages,
                                      List<ChatMessage> similarMessages,
                                      String message) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are a helpful assistant. Use the conversation history below to maintain context.\n\n");
        prompt.append("Important: Always format responses with:\n");
        prompt.append("- Each bullet point on a new line\n");
        prompt.append("- A blank line between sections\n");
        prompt.append("- Proper spacing after punctuation\n\n");

        if (!recentMessages.isEmpty()) {
            prompt.append("Conversation history:\n");
            for (ChatMessage chat : recentMessages) {
                prompt.append("User: ").append(chat.getUserMessage()).append("\n");
                prompt.append("AI: ").append(chat.getAiResponse()).append("\n");
            }
            prompt.append("\n");
        }

        if (!similarMessages.isEmpty()) {
            prompt.append("Related context:\n");
            for (ChatMessage chat : similarMessages) {
                if (recentMessages.stream().noneMatch(r -> r.getId().equals(chat.getId()))) {
                    prompt.append("User: ").append(chat.getUserMessage()).append("\n");
                    prompt.append("AI: ").append(chat.getAiResponse()).append("\n");
                }
            }
            prompt.append("\n");
        }

        prompt.append("Current question:\n");
        prompt.append("User: ").append(message).append("\nAI:");
        return prompt;
    }

    public String getResponse(String message, Long sessionId, String username) {
        // Get user and session
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // Generate embedding
        float[] embedding = embeddingModel.embed(message);
        String embeddingStr = toVectorString(embedding);

        // Check semantic cache
        List<ChatMessage> exactMatch = repository.findExactSimilar(embeddingStr, session.getId());
        if (!exactMatch.isEmpty()) {
            System.out.println("✅ Cache hit!");
            return exactMatch.get(0).getAiResponse();
        }

        // Get last 10 messages from session
        List<ChatMessage> sessionMessages = repository.findBySessionId(sessionId);
        List<ChatMessage> recentMessages = sessionMessages.stream()
                .skip(Math.max(0, sessionMessages.size() - 10))
                .collect(Collectors.toList());

        // Get similar messages
        List<ChatMessage> similarMessages = repository.findMostSimilar(embeddingStr, session.getId());

        // Build prompt
        StringBuilder prompt = buildPrompt(recentMessages, similarMessages, message);

        // Call AI
        String aiResponse = chatModel.call(prompt.toString());
        System.out.println("🤖 AI Response: " + aiResponse);

        // Save
        repository.insertWithEmbedding(message, aiResponse, embeddingStr, session.getId(), user.getId());
        System.out.println("💾 Saved to DB.");

        return aiResponse;
    }

    public Flux<String> getStreamingResponse(String message, Long sessionId, String username) {
        // Get user and session
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // Generate embedding
        float[] embedding = embeddingModel.embed(message);
        String embeddingStr = toVectorString(embedding);

        // Check semantic cache
        List<ChatMessage> exactMatch = repository.findExactSimilar(embeddingStr, session.getId());
        if (!exactMatch.isEmpty()) {
            System.out.println("✅ Cache hit!");
            return Flux.just(exactMatch.get(0).getAiResponse());
        }

        // Get last 10 messages from session
        List<ChatMessage> sessionMessages = repository.findBySessionId(sessionId);
        List<ChatMessage> recentMessages = sessionMessages.stream()
                .skip(Math.max(0, sessionMessages.size() - 10))
                .collect(Collectors.toList());

        // Get similar messages
        List<ChatMessage> similarMessages = repository.findMostSimilar(embeddingStr, session.getId());

        // Build prompt
        StringBuilder prompt = buildPrompt(recentMessages, similarMessages, message);

        // Stream response
        StringBuilder fullResponse = new StringBuilder();

        return streamingChatModel.stream(new Prompt(prompt.toString()))
                .map(response -> {
                    String chunk = response.getResult().getOutput().getText();
                    if (chunk != null) fullResponse.append(chunk);
                    return chunk != null ? chunk : "";
                })
                .doOnComplete(() -> {
                    repository.insertWithEmbedding(
                            message,
                            fullResponse.toString(),
                            embeddingStr,
                            session.getId(),
                            user.getId()
                    );
                    System.out.println("💾 Saved to DB.");
                });
    }

    public List<ChatMessage> getSessionMessages(Long sessionId) {
        return repository.findBySessionId(sessionId);
    }
}
