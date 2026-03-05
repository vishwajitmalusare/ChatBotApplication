# Chatbot
A RAG-based semantic cache chatbot using Spring Boot, pgvector and Ollama (llama3).

## Projects
- `chatbot/` - Spring Boot backend
- `chatbot-ui/` - React frontend

## Setup
### Backend
- Requires PostgreSQL with pgvector extension
- Requires Ollama running locally with llama3 model
- Run: `mvn spring-boot:run`

### Frontend
- Run: `npm install && npm run dev`