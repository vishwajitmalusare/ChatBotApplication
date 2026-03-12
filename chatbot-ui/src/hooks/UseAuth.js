import { useState } from "react";
import { login, register } from "../services/AuthService";

export const useAuth = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (username, password) => {
        setLoading(true);
        setError("");
        try {
            const jwt = await login(username, password);
            localStorage.setItem("token", jwt);
            localStorage.setItem("user", username);
            setToken(jwt);
            setUser(username);
        } catch (err) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username, password) => {
        setLoading(true);
        setError("");
        try {
            const jwt = await register(username, password);
            localStorage.setItem("token", jwt);
            localStorage.setItem("user", username);
            setToken(jwt);
            setUser(username);
        } catch (err) {
            setError("Registration failed. Username may already exist.");
        } finally { setLoading(false);}
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null); 
    };

    return { token, user, error, loading, handleLogin, handleRegister, handleLogout };
};
