import { useEffect, useState } from "react";
import { getSessionMessages, sendMessage } from "../services/ChatService";
import { uploadFile } from "../services/FileService";

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

    if (!message.trim() || loading || !activeSession) return;

    setMessages(prev => [...prev, { role: "user", text: message }]);
    setLoading(true);

    try {
      const aiResponse = await sendMessage(message, activeSession.id, token);
      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", text: "⚠️ Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

const sendFile = async (file) => {
    console.log("📎 File:", file);
    console.log("🗂 Session:", activeSession);
    console.log("🔑 Token:", token);

    if (!activeSession || loading) {
      console.log("❌ Blocked — session:", activeSession, "loading:", loading);
      return;
    }

    setMessages(prev => [...prev, { role: "user", text: `📎 Uploaded: ${file.name}` }]);
    setLoading(true);

    try {
      const summary = await uploadFile(file, activeSession.id, token);
      console.log("✅ Summary:", summary);
      setMessages(prev => [...prev, { role: "ai", text: `📄 Summary of ${file.name}:\n\n${summary}` }]);
    } catch (err) {
      console.error("❌ Error:", err);
      setMessages(prev => [...prev, { role: "ai", text: "⚠️ Error processing file." }]);
    } finally {
      setLoading(false);
    }
};

  return { messages, loading, sendUserMessage, sendFile };
};
