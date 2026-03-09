const MessageBubble = ({ message, isDark }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
        ${isUser ? "bg-green-500" : "bg-purple-600"} text-white`}>
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble */}
      <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
        ${isUser
          ? "bg-green-500 text-white"
          : isDark
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-gray-800"}`}>
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;