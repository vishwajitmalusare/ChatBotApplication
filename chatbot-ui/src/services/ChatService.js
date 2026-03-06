const BASE_URL = "http://localhost:8080/chat";

export const sendMessage = async (message) => {
  const response = await fetch(`${BASE_URL}?message=${encodeURIComponent(message)}`);
  if (!response.ok) throw new Error("Failed to get response from server");
  return await response.text();
};