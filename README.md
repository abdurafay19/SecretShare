# SecretShare

<div align="center">

### Secure • End-to-End Encrypted • One-Time Secret Sharing

Share sensitive information through encrypted links that automatically expire after a configurable number of views or a specified duration.

<br>

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react\&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi\&logoColor=white)
![Redis](https://img.shields.io/badge/Database-Redis-DC382D?logo=redis\&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13+-3776AB?logo=python\&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Railway](https://img.shields.io/badge/Backend-Railway-0B0D0E)

![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)
![Portfolio Project](https://img.shields.io/badge/Portfolio-Project-blue)
![Security](https://img.shields.io/badge/Encryption-AES--GCM-important)

</div>

---

## Live Demo

[SecretShare](https://secret-share-green.vercel.app/)

---

## Why SecretShare?

Traditional messaging platforms store your messages and often have access to plaintext content.

SecretShare takes a different approach:

* Encryption happens entirely in your browser.
* Decryption happens entirely in your browser.
* Encryption keys never reach the server.
* Secrets can automatically expire.
* Secrets can self-destruct after a limited number of views.

The backend stores only encrypted ciphertext.

Even if the database is compromised, attackers cannot recover the original secret without the encryption key.

---

## Key Features

### 🔒 End-to-End Encryption

Uses AES-GCM through the browser's Web Crypto API.

### 💣 Self-Destructing Secrets

Automatically delete secrets after:

* 1 view
* Multiple views
* Configurable limits

### ⏳ Automatic Expiration

Expiration options include:

* Minutes
* Hours
* Days
* Weeks

### 🔑 Client-Side Key Storage

Encryption keys are stored in the URL fragment:

```text
https://example.com/s/secret_id#encryption_key
```

URL fragments are never sent to the server.

### 📱 Mobile Friendly

Responsive design supporting:

* Phones
* Tablets
* Desktops

### ⚡ Fast Retrieval

Redis provides near-instant secret access.

---

## Architecture

```text
┌───────────────┐
│     User      │
└───────┬───────┘
        │
        ▼
┌──────────────────┐
│ React Frontend   │
│ Web Crypto API   │
└───────┬──────────┘
        │
 Encrypt│Decrypt
        │
        ▼
┌──────────────────┐
│ FastAPI Backend  │
└───────┬──────────┘
        │
        ▼
┌──────────────────┐
│      Redis       │
└──────────────────┘
```

---

## Security Design

| Component       | Can See Plaintext? |
| --------------- | ------------------ |
| Browser         | ✅ Yes              |
| FastAPI Backend | ❌ No               |
| Redis Database  | ❌ No               |
| Railway Hosting | ❌ No               |
| Vercel Hosting  | ❌ No               |

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Web Crypto API

### Backend

* FastAPI
* Uvicorn
* Redis

### Deployment

* Vercel
* Railway

---

## Performance Goals

* Client-side encryption
* Minimal backend processing
* Redis-backed storage
* Near-instant retrieval
* Mobile-first experience

---

## Roadmap

### Completed

* End-to-end encryption
* One-time secret retrieval
* Expiration system
* View limits
* Mobile-responsive UI
* Cloud deployment

### Planned

* Password-protected secrets
* Split-key sharing mode
* File sharing
* QR-code sharing
* Secret folders
* Access analytics
* Temporary encrypted notes
* Shamir Secret Sharing
* Progressive Web App (PWA)

---

## Learning Outcomes

This project explores:

* Applied Cryptography
* Secure Software Design
* Client-Side Encryption
* FastAPI Development
* Redis Data Management
* React Frontend Architecture
* Cloud Deployment
* End-to-End Encryption Systems

---

## Contributing

Contributions, feature requests, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

MIT License

Feel free to use, modify, and learn from this project.

---

## Author

**Abdul Rafay**

Computer Science Student at ITU

Interested in:

* Systems Programming
* Networking
* Software Architecture

GitHub: https://github.com/abdurafay19

---

<div align="center">

Built with React, FastAPI, Redis, and curiosity.

</div>
