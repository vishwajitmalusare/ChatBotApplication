import { useState, useRef } from "react";

const InputBox = ({ onSend, onFileUpload, loading, isDark, disabled }) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (loading || disabled) return;
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
      return;
    }
    if (!input.trim()) return;
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
    <div className={`p-4 border-t ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
      {disabled && (
        <p className="text-yellow-400 text-xs text-center mb-2">
          ⚠️ Please create or select a session to start chatting
        </p>
      )}

      {selectedFile && (
        <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl">
          <span className="text-purple-400 text-xs">📎 {selectedFile.name}</span>
          <button onClick={() => setSelectedFile(null)} className="ml-auto text-gray-400 hover:text-white text-xs">✕</button>
        </div>
      )}

      <div className={`flex items-end gap-2 rounded-2xl px-4 py-3 border transition-all
        ${isDark
          ? "bg-gray-800 border-gray-700 focus-within:border-purple-500"
          : "bg-gray-100 border-gray-300 focus-within:border-purple-400"}`}>

        {/* File Upload */}
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={disabled}
          className={`text-gray-400 hover:text-purple-400 transition-colors text-lg pb-1
            ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          title="Upload file"
        >
          📎
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
          onChange={e => { const file = e.target.files[0]; if (file) setSelectedFile(file); }}
          className="hidden"
        />

        {/* Text Input */}
        <textarea
          className={`flex-1 bg-transparent outline-none text-sm resize-none max-h-40 leading-relaxed
            ${isDark ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
          placeholder={disabled ? "Select a session first..." : selectedFile ? "Click ➤ to summarize..." : "Message AI..."}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled || !!selectedFile}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading || (!input.trim() && !selectedFile) || disabled}
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all shadow-lg
            ${loading || (!input.trim() && !selectedFile) || disabled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-br from-purple-500 to-blue-500 hover:opacity-90 shadow-purple-500/20"}`}
        >
          {loading ? "⏳" : "➤"}
        </button>
      </div>
      <p className={`text-xs text-center mt-2 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
        Enter to send • Shift+Enter for new line • 📎 PDF, DOCX, TXT, Images
      </p>
    </div>
  );
};

export default InputBox;