const Sidebar = ({ onNewChat, isDark, toggleTheme }) => {
  return (
    <div className={isDark ? "w-64 h-screen flex flex-col p-4 bg-gray-900" : "w-64 h-screen flex flex-col p-4 bg-gray-200"}>
      
      <div className={isDark ? "text-xl font-bold mb-6 text-white" : "text-xl font-bold mb-6 text-gray-800"}>
        🤖 ChatBot
      </div>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        className={isDark ? "border border-gray-600 text-white hover:bg-gray-700 rounded-lg px-4 py-2 text-sm text-left transition-colors mb-4" : "border border-gray-400 text-gray-800 hover:bg-gray-300 rounded-lg px-4 py-2 text-sm text-left transition-colors mb-4"}
      >
        + New Chat
      </button>

      {/* Theme Toggle */}
      <div className="mt-auto">
        <button
          onClick={toggleTheme}
          className={isDark ? "w-full border border-gray-600 text-white hover:bg-gray-700 rounded-lg px-4 py-2 text-sm text-left transition-colors" : "w-full border border-gray-400 text-gray-800 hover:bg-gray-300 rounded-lg px-4 py-2 text-sm text-left transition-colors"}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

    </div>
  );
};

export default Sidebar;