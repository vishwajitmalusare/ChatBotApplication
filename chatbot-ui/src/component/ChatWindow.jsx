import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

const ChatWindow = ({ messages, loading, onSend, isDark, activeSession }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col flex-1 h-screen ${isDark ? "bg-gray-800" : "bg-white"}`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
        <h1 className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-800"}`}>
          {activeSession ? activeSession.title : "Select a Session"}
        </h1>
        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Powered by Ollama + pgvector
        </p>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-6 flex flex-col gap-6 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              {activeSession ? "No messages yet. Start chatting!" : "Create or select a session to start"}
            </p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} isDark={isDark} />
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
              AI
            </div>
            <div className={`px-4 py-3 rounded-2xl text-sm italic ${isDark ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-500"}`}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <InputBox onSend={onSend} loading={loading} isDark={isDark} disabled={!activeSession}/>
    </div>
  );
};

export default ChatWindow;
