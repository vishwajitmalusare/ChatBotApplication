const BASE_URL = "http://localhost:8080";

export const sendMessage = async (message, sessionId, token) => {
  const response = await fetch(`${BASE_URL}/chat/${sessionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  });
  if (!response.ok) throw new Error("Failed to get response from server");
  return await response.text();
};

export const getSessionMessages = async (sessionId, token) => {
  const response = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Failed to get messages from server");
  return await response.json();
};
