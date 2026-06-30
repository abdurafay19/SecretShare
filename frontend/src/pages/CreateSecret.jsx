import { useState } from "react";

import { createSecret } from "../api/secretApi";

import {
    generateKey,
    exportKey,
    encryptSecret
} from "../crypto/crypto";

const TTL_OPTIONS = [
    {
        label: "1 Minute",
        value: 60
    },
    {
        label: "5 Minutes",
        value: 300
    },
    {
        label: "15 Minutes",
        value: 900
    },
    {
        label: "1 Hour",
        value: 3600
    },
    {
        label: "6 Hours",
        value: 21600
    },
    {
        label: "1 Day",
        value: 86400
    },
    {
        label: "1 Week",
        value: 604800
    }
];

export default function CreateSecret() {

    const [secret, setSecret] = useState("");
    const [shareUrl, setShareUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [ttl, setTtl] = useState(86400);
    const [copied, setCopied] = useState(false);
    const [views, setViews] = useState(1);

    function handleViewsChange(e) {

        const value = e.target.value;

        if (value === "") {
            setViews("");
            return;
        }

        const number = Number(value);

        if (
            number >= 1 &&
            number <= 10
        ) {
            setViews(number);
        }
    }

    async function handleCreate() {

        if (!secret.trim()) {
            return;
        }

        if (
            !views ||
            views < 1 ||
            views > 10
        ) {
            alert(
                "Views must be between 1 and 10"
            );
            return;
        }

        try {

            setLoading(true);

            // Generate AES key
            const key =
                await generateKey();

            // Encrypt secret
            const encrypted =
                await encryptSecret(
                    secret,
                    key
                );

            // Send ciphertext to backend
            const response =
                await createSecret({
                    ciphertext:
                        encrypted.ciphertext,
                    nonce:
                        encrypted.nonce,
                    ttl,
                    views
                });

            // Export key
            const exportedKey =
                await exportKey(key);

            // Build URL
            const url =
                `${window.location.origin}` +
                `/s/${response.id}` +
                `#${exportedKey}`;

            setShareUrl(url);

        } catch (err) {

            console.error(err);
            alert("Failed to create secret");

        } finally {

            setLoading(false);

        }
    }

    async function handleCopy() {

        try {

            await navigator.clipboard.writeText(
                shareUrl
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (err) {

            console.error(err);

            alert(
                "Failed to copy link"
            );
        }
    }

    return (
        <div className="page">

            <div className="card">

                <div className="topbar">

                    <div className="logo">
                        SecretShare
                    </div>

                    <div className="tagline">
                        Secure Secret Sharing
                    </div>

                </div>

                <div className="info-box">

                    <strong>What is SecretShare?</strong>

                    <p>
                        SecretShare allows you to securely share
                        passwords, API keys, access tokens and
                        confidential information using encrypted
                        self-destructing links.
                    </p>

                    <ul>
                        <li>Client side AES-GCM encryption</li>
                        <li>Secrets are encrypted before leaving your browser</li>
                        <li>Automatic expiration</li>
                        <li>Configurable view limits</li>
                        <li>No plaintext stored on the server</li>
                    </ul>

                </div>

                <label className="label">
                    Secret
                </label>

                <textarea
                    className="textarea"
                    value={secret}
                    onChange={(e) =>
                        setSecret(e.target.value)
                    }
                />

                <div className="form-row">

                    <div>

                        <label className="label">
                            Expiration
                        </label>

                        <select
                            className="select"
                            value={ttl}
                            onChange={(e) =>
                                setTtl(Number(e.target.value))
                            }
                        >
                            {TTL_OPTIONS.map(option => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div>

                        <label className="label">
                            Views Allowed
                        </label>

                        <input
                            className="input"
                            type="number"
                            min="1"
                            max="10"
                            value={views}
                            onChange={handleViewsChange}
                        />

                    </div>

                </div>

                <button
                    className="button"
                    onClick={handleCreate}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Creating Link..."
                            : "Generate Link"
                    }
                </button>

                {shareUrl && (

                    <div className="success-box">

                        <strong>
                            Secret Created Successfully
                        </strong>

                        <p>
                            Share the following link:
                        </p>

                        <textarea
                            className="textarea share-box"
                            readOnly
                            value={shareUrl}
                        />

                        <button
                            className="button"
                            onClick={handleCopy}
                        >
                            {
                                copied
                                    ? "Copied!"
                                    : "Copy Link"
                            }
                        </button>

                        <div className="warning-box">

                            Anyone with this link can access
                            the secret until it expires or
                            reaches its view limit.

                        </div>

                    </div>

                )}

                <div className="footer">

                    SecretShare v1.0

                </div>

            </div>

        </div>
    );
}