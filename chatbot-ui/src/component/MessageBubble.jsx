import ReactMarkdown from "react-markdown";

const MessageBubble = ({ message, isDark }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white
        ${isUser ? "bg-green-500" : "bg-purple-600"}`}>
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble */}
      <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
        ${isUser
          ? "bg-green-500 text-white"
          : isDark
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-gray-800"}`}>
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.text}</span>
        ) : (
          <ReactMarkdown
            components={{
              // Headings
              h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-base font-bold mb-1" {...props} />,
              // Paragraphs
              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
              // Lists
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
              li: ({node, ...props}) => <li className="ml-2" {...props} />,
              // Code
              code: ({node, inline, ...props}) => 
                inline 
                  ? <code className="bg-gray-600 px-1 rounded text-green-400 text-xs" {...props} />
                  : <code className="block bg-gray-900 p-3 rounded-lg text-green-400 text-xs overflow-x-auto my-2" {...props} />,
              // Bold
              strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
              // Blockquote
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-green-500 pl-3 italic my-2" {...props} />,
            }}
          >
            {message.text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
