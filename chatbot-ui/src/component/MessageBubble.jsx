import ReactMarkdown from "react-markdown";

const MessageBubble = ({ message, isDark }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 text-white shadow-lg
        ${isUser
          ? "bg-gradient-to-br from-green-400 to-emerald-500"
          : "bg-gradient-to-br from-purple-500 to-blue-500"}`}>
        {isUser ? "U" : "🤖"}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
        ${isUser
          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-sm"
          : isDark
            ? "bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700"
            : "bg-white text-gray-800 rounded-tl-sm border border-gray-200 shadow-md"}`}>
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.text}</span>
        ) : (
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2 text-purple-400" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2 text-purple-400" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-base font-bold mb-1 text-purple-300" {...props} />,
              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
              li: ({node, ...props}) => <li className="ml-2" {...props} />,
              code: ({node, inline, ...props}) =>
                inline
                  ? <code className="bg-gray-700 px-1.5 py-0.5 rounded text-purple-300 text-xs" {...props} />
                  : <code className="block bg-gray-900 p-3 rounded-xl text-green-400 text-xs overflow-x-auto my-2 border border-gray-700" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-purple-300" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-500 pl-3 italic my-2 text-gray-400" {...props} />,
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