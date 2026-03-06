const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 
        ${isUser ? "bg-green-500" : "bg-purple-600"}`}>
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble */}
      <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
        ${isUser
          ? "bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 text-white"
          : "bg-gray-700 text-white"}`}>
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;