const API_BASE = "http://localhost:8000/api";

export async function createSecret(data) {
    const response = await fetch(
        `${API_BASE}/secrets`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create secret");
    }

    return await response.json();
}

export async function getSecret(id) {
    const response = await fetch(
        `${API_BASE}/secrets/${id}`
    );

    if (!response.ok) {
        throw new Error("Secret not found");
    }

    return await response.json();
}