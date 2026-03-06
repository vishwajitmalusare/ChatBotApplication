  const Sidebar = ({ onNewChat }) => {
    return (
      <div className="w-64 bg-gray-900 h-screen flex flex-col p-4">
        <div className="text-white text-xl font-bold mb-6">🤖 ChatBot</div>
        <button
          onClick={onNewChat}
          className="border border-gray-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-700 transition-colors text-left"
        >
          + New Chat
        </button>
        <div className="bg-red-500 text-white p-6">
          Tailwind Test
        </div>
      </div>
      
    );
  };

  export default Sidebar;