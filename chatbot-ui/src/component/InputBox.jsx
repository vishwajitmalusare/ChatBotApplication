import { useState } from "react";

const InputBox = ({ onSend, loading }) => {
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
    <div className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-end gap-2 bg-gray-700 rounded-xl px-4 py-2 border border-gray-600">
        <textarea
          className="flex-1 bg-transparent outline-none text-white text-sm resize-none max-h-40 leading-relaxed"
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
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"}`}
        >
          ➤
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};

export default InputBox;