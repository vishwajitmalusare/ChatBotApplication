import { useState } from "react";
import { sendMessage } from "../services/ChatService";

export const useChat = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendUserMessage = async (message) => {
    if (!message.trim() || loading) return;

    setMessages(prev => [...prev, { role: "user", text: message }]);
    setLoading(true);

    try {
      const aiResponse = await sendMessage(message);
      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", text: "⚠️ Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([{ role: "ai", text: "Hello! How can I help you today?" }]);
  };

  return { messages, loading, sendUserMessage, clearMessages };
};