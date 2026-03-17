import React, { useState } from "react";

const InputBox = ({ onSend, onFileUpload, loading, isDark, disabled }) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleSend = () => {
    if ( loading || disabled) return;

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div className={`p-4 border-t ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      {disabled && (
        <p className="text-yellow-400 text-xs text-center mb-2">
          ⚠️ Please create or select a session to start chatting
        </p>
      )}

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 rounded-lg">
          <span className="text-green-400 text-xs">📎 {selectedFile.name}</span>
          <button
            onClick={() => setSelectedFile(null)}
            className="ml-auto text-gray-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <div className={`flex items-end gap-2 rounded-xl px-4 py-2 border
        ${isDark ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
        
        {/* File Upload Button */}
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={disabled}
          className={`text-gray-400 hover:text-white transition-colors text-lg pb-1
            ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          title="Upload file"
        >
          📎
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Text Input */}
        <textarea
          className={`flex-1 bg-transparent outline-none text-sm resize-none max-h-40 leading-relaxed
            ${isDark ? "text-white placeholder-gray-400" : "text-gray-800 placeholder-gray-500"}`}
          placeholder={disabled ? "Select a session first..." : "Message ChatBot..."}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled || selectedFile}
        />
        <button
          onClick={handleSend}
          disabled={loading || (!input.trim() && !selectedFile) || disabled}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-base transition-colors
            ${loading || (!input.trim() && !selectedFile) || disabled
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"}`}
        >
          {loading ? "⏳" : "➤"}
        </button>
      </div>
      <p className={`text-xs text-center mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};

export default InputBox;
