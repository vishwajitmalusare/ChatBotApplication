import Sidebar from "./component/SideBar";
import ChatWindow from "./component/ChatWindow";
import { useChat } from "./hooks/UseChat";

export default function App() {
  const { messages, loading, sendUserMessage, clearMessages } = useChat();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onNewChat={clearMessages} />
      <ChatWindow
        messages={messages}
        loading={loading}
        onSend={sendUserMessage}
      />
    </div>
  );
}