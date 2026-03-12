import { useState } from "react";

const LoginPage = ({ onLogin, onRegister, error, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (!username.trim() || !password.trim()) return;
        if (isLogin) {
            onLogin(username, password);
        } else {
            onRegister(username, password);
        }
    };

   const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-3">🤖</div>
                    <h1 className="text-white text-2xl font-bold">ChatBot</h1>
                    <p className="text-gray-400 text-sm mt-1">Powered by Ollama + pgvector</p>
                </div>

                {/* Toggle */}
                <div className="flex bg-gray-700 rounded-lg p-1 mb-6">
                    <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isLogin ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
                    >
                    Login
                    </button>
                    <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                        ${!isLogin ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
                    >
                    Register
                    </button>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-4">
                    <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none border border-gray-600 focus:border-green-500 transition-colors"
                    />
                    <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none border border-gray-600 focus:border-green-500 transition-colors"
                     />

                    {/* Error */}
                    {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    {/* Submit */}
                    <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-medium transition-colors
                        ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                    >
                    {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
