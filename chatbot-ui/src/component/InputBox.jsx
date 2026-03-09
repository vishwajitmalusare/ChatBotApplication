import { useState } from "react";

const InputBox = ({ onSend, loading, isDark }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`p-4 border-t ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className={`flex items-end gap-2 rounded-xl px-4 py-2 border
        ${isDark ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
        <textarea
          className={`flex-1 bg-transparent outline-none text-sm resize-none max-h-40 leading-relaxed
            ${isDark ? "text-white placeholder-gray-400" : "text-gray-800 placeholder-gray-500"}`}
          placeholder="Message ChatBot..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-base transition-colors
            ${loading || !input.trim()
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"}`}
        >
          ➤
        </button>
      </div>
      <p className={`text-xs text-center mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};

export default InputBox;