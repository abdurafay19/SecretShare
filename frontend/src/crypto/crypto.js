export async function generateKey() {
    return await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );
}

export async function exportKey(key) {

    const raw = await crypto.subtle.exportKey(
        "raw",
        key
    );

    return btoa(
        String.fromCharCode(
            ...new Uint8Array(raw)
        )
    );
}

export async function importKey(base64Key) {

    const bytes = Uint8Array.from(
        atob(base64Key),
        c => c.charCodeAt(0)
    );

    return await crypto.subtle.importKey(
        "raw",
        bytes,
        {
            name: "AES-GCM"
        },
        true,
        ["decrypt"]
    );
}

export async function encryptSecret(
    plaintext,
    key
) {

    const iv =
        crypto.getRandomValues(
            new Uint8Array(12)
        );

    const encoded =
        new TextEncoder().encode(
            plaintext
        );

    const encrypted =
        await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv
            },
            key,
            encoded
        );

    return {
        ciphertext: btoa(
            String.fromCharCode(
                ...new Uint8Array(encrypted)
            )
        ),
        nonce: btoa(
            String.fromCharCode(...iv)
        )
    };
}

export async function decryptSecret(
    ciphertext,
    nonce,
    key
) {

    const cipherBytes =
        Uint8Array.from(
            atob(ciphertext),
            c => c.charCodeAt(0)
        );

    const nonceBytes =
        Uint8Array.from(
            atob(nonce),
            c => c.charCodeAt(0)
        );

    const decrypted =
        await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: nonceBytes
            },
            key,
            cipherBytes
        );

    return new TextDecoder()
        .decode(decrypted);
}