import { useEffect, useState } from "react";
import { getSessionMessages, sendMessage, streamMessage } from "../services/ChatService";
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

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: message }]);

    // Add empty AI message that will be filled word by word
    setMessages(prev => [...prev, { role: "ai", text: "" }]);
    setLoading(true);

    try {
      await streamMessage(message, activeSession.id, token, (chunk) => {
        // Update last AI message with each chunk
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === "ai") {
            updated[updated.length - 1] = {
              ...lastMsg,
              text: lastMsg.text + chunk
            };
          }
          return updated;
        });
      });
       } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "ai", text: "⚠️ Error connecting to server." };
        return updated;
      });
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
