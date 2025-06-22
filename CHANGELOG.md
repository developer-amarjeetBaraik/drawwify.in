# 📜 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [v1.0.0] - 22-06-2025

🎉 **Initial Launch — Drawwify V1 is Live**

### ✨ Added
- Canvas-based drawing system using pure HTML Canvas API (no third-party lib!)
- Tools: Rectangle, Circle, Line, Arrow, Text
- Element manipulation: resize, move, color, font, stroke controls
- Image export feature to save your canvas art as a .jpg
- Google OAuth2 authentication flow (self-implemented)
- Secure backend built with Node.js, Express, and MongoDB
- Data syncing: Save and update individual element properties in real-time
- Clean black-themed UI with glassmorphism and animations
- Fully responsive design with mobile-friendly layout
- Hosted on: 
  - 🌐 [drawwify.in](https://drawwify.in)
  - ⚙️ Backend: [api.drawwify.in](https://api.drawwify.in)

### 🔐 Security
- Encrypted user passwords (if registered via email)
- Cookies for secure auth token storage

### 🔍 Known Limitations
- No collaborative editing (coming soon!)
- Minor edge-case bugs may appear during fast drag/edit operations

---

## 📌 Next Release Goals (v1.1.0)
- 🔄 Real-time multi-user collaboration
- 🧠 AI assistant for drawing suggestions
- 💾 Version history for workspaces
