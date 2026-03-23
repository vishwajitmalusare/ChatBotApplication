import { useState } from "react";

const LoginPage = ({ onLogin, onRegister, error, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) return;
    if (isLogin) onLogin(username, password);
    else onRegister(username, password);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Glow effects */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 top-20 left-20" />
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 bottom-20 right-20" />

      <div className="relative bg-gray-900 bg-opacity-80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96 border border-gray-700">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            🤖
          </div>
          <h1 className="text-white text-2xl font-bold">AI ChatBot</h1>
          <p className="text-gray-400 text-sm mt-1">Powered by Ollama + pgvector</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
              ${isLogin
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
              ${!isLogin
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"}`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-gray-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none border border-gray-700 focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-gray-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none border border-gray-700 focus:border-purple-500 transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-xl px-4 py-2">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition-all shadow-lg
              ${loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 hover:shadow-purple-500/25"}`}
          >
            {loading ? "Please wait..." : isLogin ? "Login →" : "Create Account →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;