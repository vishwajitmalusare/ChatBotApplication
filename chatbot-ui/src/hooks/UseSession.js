import { useEffect, useState } from "react";
import { getSessions, createSession, deleteSession } from "../services/SessionService";

export const useSession = (token) => {
    const [sessions, setSessions] = useState([]);
    const [activeSession, setActiveSession] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) loadSessions();
    }, [token]);

    const loadSessions = async () => {
        try {
            const data = await getSessions(token);
            setSessions(data);
            if (data.length > 0) setActiveSession(data[0]);
        } catch (err) {
            console.error("Failed to load sessions", err);
        }
    };

    const handleCreateSession = async (title) => {
        setLoading(true);
        try {
            const session = await createSession(title, token);
            setSessions(prev => [session, ...prev]);
            setActiveSession(session);
        } catch (err) {
            console.error("Failed to create session", err);
        } finally { setLoading(false);  }
    };

    const handleDeleteSession = async (sessionId) => {
        try {
            await deleteSession(sessionId, token);
            setSessions(prev => prev.filter(s => s.id !== sessionId));
            if (activeSession?.id === sessionId) {
                setActiveSession(sessions[0] || null);
            }
        } catch (err) {
            console.error("Failed to delete session", err);
        }
    };

    return { sessions, activeSession, setActiveSession, loading, handleCreateSession, handleDeleteSession };    
}
