# SecretShare

A secure, end-to-end encrypted one-time secret sharing platform built with React, FastAPI, and Redis.

SecretShare allows users to share sensitive information through a link that can only be viewed a limited number of times and automatically expires after a configurable duration. The server never sees or stores plaintext secrets. All encryption and decryption occur locally in the user's browser.

---

## Features

### End-to-End Encryption

Secrets are encrypted in the browser using AES-GCM before being transmitted to the server.

* Plaintext never leaves the user's device.
* The server only stores encrypted ciphertext.
* Decryption keys are never sent to the backend.

### One-Time Secret Sharing

Secrets can be configured to self-destruct after a specified number of views.

Examples:

* View once
* View twice
* Up to 10 views

### Automatic Expiration

Secrets can automatically expire after a selected duration.

Supported durations:

* 1 minute
* 5 minutes
* 15 minutes
* 1 hour
* 6 hours
* 1 day
* 1 week

### Client-Side Key Management

Encryption keys are embedded in the URL fragment:

```text
https://example.com/s/SECRET_ID#ENCRYPTION_KEY
```

The fragment portion (`#ENCRYPTION_KEY`) is never transmitted to the server, ensuring that the backend cannot decrypt stored data.

### Mobile Friendly

The interface is responsive and works on:

* Desktop
* Tablets
* Mobile devices

### Modern Architecture

* React Frontend
* FastAPI Backend
* Redis Storage
* Vercel Deployment
* Railway Deployment

---

## How It Works

### Secret Creation

1. User enters a secret.
2. Browser generates a random AES-GCM key.
3. Secret is encrypted locally.
4. Ciphertext is uploaded to the backend.
5. Backend stores ciphertext in Redis.
6. Backend returns a unique secret ID.
7. Browser creates a shareable URL:

```text
https://secretshare.example/s/SECRET_ID#KEY
```

### Secret Retrieval

1. Recipient opens the URL.
2. Browser extracts the key from the URL fragment.
3. Browser requests encrypted data from the backend.
4. Browser decrypts the secret locally.
5. Secret is displayed.
6. View count is reduced.
7. Secret is deleted when:

   * View limit is reached, or
   * Expiration time is exceeded.

---

## Security Model

### What the Server Knows

The backend can see:

* Ciphertext
* Nonce
* Secret ID
* Expiration settings
* View count

### What the Server Never Knows

The backend never sees:

* Plaintext secrets
* Encryption keys

### URL Fragment Security

The encryption key is stored after the `#` symbol:

```text
https://example.com/s/id#key
```

Browsers do not send URL fragments to servers.

This means:

* Railway never receives the key.
* Redis never stores the key.
* FastAPI never sees the key.

---

## Technology Stack

### Frontend

* React
* Vite
* Web Crypto API
* React Router

### Backend

* FastAPI
* Python
* Redis
* Uvicorn

### Infrastructure

* Railway
* Vercel

---

## Project Structure

```text
SecretShare/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   └── secrets.py
│   │   │
│   │   ├── schemas/
│   │   │   └── secret.py
│   │   │
│   │   ├── services/
│   │   │   └── redis_scripts.py
│   │   │
│   │   ├── redis_client.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── crypto/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Local Development

### Backend

Create a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start Redis:

```bash
redis-server
```

Run FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

### Frontend

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:8000
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Deployment

### Backend

Deploy FastAPI to Railway.

Required environment variables:

```env
REDIS_URL=your_redis_connection_string
```

### Frontend

Deploy React application to Vercel.

Required environment variables:

```env
VITE_API_URL=https://your-backend.up.railway.app
```

### Vercel Routing

Create:

```text
frontend/vercel.json
```

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This enables React Router support for secret URLs.

---

## Future Improvements

### Planned Features

* Password-protected secrets
* Split-key mode
* File sharing
* QR code sharing
* Anonymous burn-after-read notes
* Secret access audit logs
* Share expiration countdown
* Dark mode
* Secret folders
* Optional Shamir Secret Sharing

---

## Educational Goals

This project demonstrates:

* End-to-end encryption
* Browser cryptography
* Secure key handling
* FastAPI backend development
* Redis integration
* React application architecture
* Cloud deployment
* Secure system design

---

## Disclaimer

SecretShare is a portfolio and educational project designed to demonstrate secure software engineering concepts. It should be independently audited before use in high-security production environments.

---

## Author

Abdul Rafay

Computer Science Student | Software Developer | Systems Enthusiast
