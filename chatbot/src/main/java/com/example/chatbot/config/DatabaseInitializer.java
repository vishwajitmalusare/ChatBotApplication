package com.example.chatbot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Initializing database extensions and schema adjustments...");
        try {
            // Enable pgvector extension
            jdbcTemplate.execute("CREATE EXTENSION IF NOT EXISTS vector;");
            System.out.println("✅ Extension 'vector' verified/created.");

            // Add embedding column if it does not exist in chat_message
            jdbcTemplate.execute("ALTER TABLE chat_message ADD COLUMN IF NOT EXISTS embedding vector;");
            System.out.println("✅ Column 'embedding' verified/created in 'chat_message' table.");
        } catch (Exception e) {
            System.err.println("⚠️ Warning during database initialization: " + e.getMessage());
            // Log warning but don't crash, in case the database user doesn't have superuser permission
        }
    }
}
