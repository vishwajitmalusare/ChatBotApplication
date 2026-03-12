const BASE_URL = "http://localhost:8080";

export const getSessions = async (token) => {
  const response = await fetch(`${BASE_URL}/sessions`, {
    headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to get sessions");
    return await response.json();
};

export const createSession = async (title, token) => {
    const response = await fetch(`${BASE_URL}/sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title })
    });
    if (!response.ok) throw new Error("Failed to create session");
    return await response.json();
};

export const deleteSession = async (sessionId, token) => {
    const response = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to delete session");
};
