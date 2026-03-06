import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

const ChatWindow = ({ messages, loading, onSend }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700 bg-gray-800">
        <h1 className="text-white font-semibold text-lg">ChatBot (llama3)</h1>
        <p className="text-gray-400 text-xs">Powered by Ollama + pgvector</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-gray-800">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
              AI
            </div>
            <div className="bg-gray-700 px-4 py-3 rounded-2xl text-sm text-gray-400 italic">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <InputBox onSend={onSend} loading={loading} />
    </div>
  );
};

export default ChatWindow;