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
    <div className={`w-72 h-screen flex flex-col ${isDark ? "bg-gray-900 border-r border-gray-800" : "bg-gray-50 border-r border-gray-200"}`}>

      {/* Header */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-xl shadow-lg">
            🤖
          </div>
          <div>
            <h1 className={`font-bold text-base ${isDark ? "text-white" : "text-gray-800"}`}>AI ChatBot</h1>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>👤 {user}</p>
          </div>
        </div>

        {/* New Chat Button */}
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
          >
            + New Chat
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Chat title..."
              value={newSessionTitle}
              onChange={e => setNewSessionTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              className="bg-gray-800 text-white rounded-xl px-3 py-2 text-sm outline-none border border-gray-700 focus:border-purple-500"
            />
            <div className="flex gap-2">
              <button onClick={handleCreate} className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl py-2 text-sm font-medium">
                Create
              </button>
              <button onClick={() => setShowInput(false)} className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sessions */}
      <div className="flex-1 overflow-y-auto px-3 flex flex-col gap-1">
        <p className={`text-xs font-semibold px-2 mb-2 uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          Recent Chats
        </p>
        {sessions.length === 0 && (
          <p className={`text-xs text-center mt-4 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            No chats yet. Create one!
          </p>
        )}
        {sessions.map(session => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-all group
              ${activeSession?.id === session.id
                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white"
                : isDark
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"}`}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-base">💬</span>
              <span className="truncate">{session.title}</span>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onDeleteSession(session.id); }}
              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all ml-2"
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${isDark ? "border-gray-800" : "border-gray-200"} flex flex-col gap-2`}>
        <button
          onClick={toggleTheme}
          className={`w-full rounded-xl px-4 py-2.5 text-sm text-left transition-all
            ${isDark
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button
          onClick={onLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl px-4 py-2.5 text-sm transition-all"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;