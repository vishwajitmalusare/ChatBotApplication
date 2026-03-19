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

export const streamMessage = async (message, sessionId, token, onChunk) => {
  const response = await fetch(`${BASE_URL}/chat/${sessionId}/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) throw new Error("Failed to get streaming response");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    
    buffer = lines.pop(); // keep incomplete line in buffer

    for (const line of lines) {
      if (line.startsWith("data:")) {
        const text = line.slice(5); // ✅ no trim() - keeps spaces
        if (text && text !== "[DONE]") {
          onChunk(text);
        }
      }
    }
  }
};

export const getSessionMessages = async (sessionId, token) => {
  const response = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Failed to get messages from server");
  return await response.json();
};
