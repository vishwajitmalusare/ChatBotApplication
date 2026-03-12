import Sidebar from "./component/Sidebar";
import ChatWindow from "./component/ChatWindow"; 
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./hooks/UseAuth";
import { useChat } from "./hooks/UseChat";
import { useSession } from "./hooks/UseSession";
import { useTheme } from "./hooks/UseTheme";

export default function App() {
  const { token, user, error, loading: authLoading, handleLogin, handleRegister, handleLogout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { sessions, activeSession, setActiveSession, handleCreateSession, handleDeleteSession } = useSession(token);
  const { messages, loading, sendUserMessage } = useChat(token, activeSession);

  console.log("🔑 App token:", token);
  console.log("🗂 App activeSession:", activeSession);

  if (!token) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegister={handleRegister}
        error={error}
        loading={authLoading}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sessions={sessions}
        activeSession={activeSession}
        onSelectSession={setActiveSession}
        onNewSession={handleCreateSession}
        onDeleteSession={handleDeleteSession}
        onLogout={handleLogout}
        user={user}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <ChatWindow
        messages={messages}
        loading={loading}
        onSend={sendUserMessage}
        isDark={isDark}
        activeSession={activeSession}
      />
    </div>
  );
}