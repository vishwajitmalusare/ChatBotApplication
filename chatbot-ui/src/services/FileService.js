const BASE_URL = "http://localhost:8080";

export const uploadFile = async (file, sessionId, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/upload/${sessionId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });
    if (!response.ok) throw new Error("Failed to upload file");
    return await response.text();
};
