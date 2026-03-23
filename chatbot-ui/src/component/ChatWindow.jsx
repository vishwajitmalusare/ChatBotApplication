import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

const ChatWindow = ({ messages, loading, onSend, onFileUpload, isDark, activeSession }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col flex-1 h-screen ${isDark ? "bg-gray-950" : "bg-white"}`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center gap-3
        ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-sm">
          🤖
        </div>
        <div>
          <h1 className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
            {activeSession ? activeSession.title : "Select a Session"}
          </h1>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              llama3 • pgvector
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-6 flex flex-col gap-4 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              🤖
            </div>
            <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {activeSession ? "Start a conversation!" : "Create or select a session to start"}
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} isDark={isDark} />
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
              🤖
            </div>
            <div className={`px-4 py-3 rounded-2xl text-sm ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-500"}`}>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <InputBox
        onSend={onSend}
        onFileUpload={onFileUpload}
        loading={loading}
        isDark={isDark}
        disabled={!activeSession}
      />
    </div>
  );
};

export default ChatWindow;