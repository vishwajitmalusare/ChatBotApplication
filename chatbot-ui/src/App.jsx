import Sidebar from "./component/SideBar";
import ChatWindow from "./component/ChatWindow";
import { useChat } from "./hooks/UseChat";
import { UseTheme } from "./hooks/UseTheme";

export default function App() {
  const { messages, loading, sendUserMessage, clearMessages } = useChat();
  const { isDark, toggleTheme } = UseTheme();

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <Sidebar onNewChat={clearMessages} isDark={isDark} toggleTheme={toggleTheme} />
      <ChatWindow
        messages={messages}
        loading={loading}
        onSend={sendUserMessage}
        isDark={isDark}
      />
    </div>
  );
}
