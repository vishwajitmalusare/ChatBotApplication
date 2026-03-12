import { useState } from "react";

const Sidebar = ({ sessions, activeSession, onSelectSession, onNewSession, onDeleteSession, onLogout, user, isDark, toggleTheme }) => {
  const [newSessionTitle, setNewSessionTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  
  const handleCreate = () => {
    if (!newSessionTitle.trim()) return;
    onNewSession(newSessionTitle.trim());
    setNewSessionTitle("");
    setShowInput(false);
  };

  return (
    <div className={`w-64 h-screen flex flex-col ${isDark ? "bg-gray-900" : "bg-gray-200"}`}>
      
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-300"}`}>
        <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
          🤖 ChatBot
        </div>
        <div className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          👤 {user}
        </div>
      </div>

      {/* New Session Button */}
      <div className="p-4">
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className={`w-full border rounded-lg px-4 py-2 text-sm text-left transition-colors
              ${isDark ? "border-gray-600 text-white hover:bg-gray-700" : "border-gray-400 text-gray-800 hover:bg-gray-300"}`}
          >
            + New Chat
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Session title..."
              value={newSessionTitle}
              onChange={e => setNewSessionTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none border border-gray-600 focus:border-green-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg py-1 text-sm"
              >
                Create
              </button>
              <button
                onClick={() => setShowInput(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg py-1 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2">
        {sessions.length === 0 && (
          <p className={`text-xs text-center mt-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            No chats yet. Create one!
          </p>
        )}
        {sessions.map(session => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors
              ${activeSession?.id === session.id
                ? "bg-green-500 text-white"
                : isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-300"}`}
          >
            <span className="truncate flex-1">{session.title}</span>
            <button
              onClick={e => { e.stopPropagation(); onDeleteSession(session.id); }}
              className="ml-2 text-xs opacity-60 hover:opacity-100"
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`p-4 border-t flex flex-col gap-2 ${isDark ? "border-gray-700" : "border-gray-300"}`}>
        <button
          onClick={toggleTheme}
          className={`w-full border rounded-lg px-4 py-2 text-sm text-left transition-colors
            ${isDark ? "border-gray-600 text-white hover:bg-gray-700" : "border-gray-400 text-gray-800 hover:bg-gray-300"}`}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
