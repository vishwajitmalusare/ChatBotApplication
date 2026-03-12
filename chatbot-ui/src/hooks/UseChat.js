import { useEffect, useState } from "react";
import { getSessionMessages, sendMessage } from "../services/ChatService";

export const useChat = (token, activeSession) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeSession) {
      console.log("📂 Loading messages for session:", activeSession.id);
      loadMessages();
    }
  }, [activeSession]);

  const loadMessages = async () => {
    try {
      const data = await getSessionMessages(activeSession.id, token);
      console.log("📩 Loaded messages:", data);
      const formatted = data.flatMap(msg => [
        { role: "user", text: msg.userMessage },
        { role: "ai", text: msg.aiResponse }
      ]);
      setMessages(formatted);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  const sendUserMessage = async (message) => {
    console.log("📤 Sending:", message);
    console.log("🗂 Session:", activeSession);
    console.log("🔑 Token:", token);

    if (!message.trim() || loading || !activeSession) {
      console.log("❌ Blocked — loading:", loading, "session:", activeSession);
      return;
    }

    setMessages(prev => [...prev, { role: "user", text: message }]);
    setLoading(true);

    try {
      const aiResponse = await sendMessage(message, activeSession.id, token);
      console.log("✅ AI Response:", aiResponse);
      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
    } catch (err) {
      console.error("❌ Send error:", err);
      setMessages(prev => [...prev, { role: "ai", text: "⚠️ Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendUserMessage };
};