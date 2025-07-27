# 🧠 AI-Powered LeetCode Helper Extension

Supercharge your LeetCode problem solving with AI! This Chrome extension provides AI-generated **Thinking Insights** and **Full Solutions** for coding problems — directly on the problem page.

---

## 🚀 Features

- 🧠 **Get Thinking Insights** — High-level hints to guide your thought process.
- 💡 **Get Solution** — Full code-level explanation for the problem.
- 🎯 **Auto-activates only on LeetCode problem pages**.
- ⚡ Powered by [OpenRouter](https://openrouter.ai) API (supports GPT, Claude, etc.).
- 🖥️ Lightweight and simple popup UI.
- 🔐 Your API key stays on your machine.

---

## 📸 Demo Video

[▶️ Watch how to use it (Step-by-step Guide)](https://drive.google.com/file/d/1YHmX1kMOj-T7xprDKDNuwe3VRRP0J_Bi/view?usp=drive_link)
Pro tip: Watch the video at 1.25x speed for better experience

> 📌 The video walks through installing the extension, generating an OpenRouter API key, and getting insights in real-time.

---

## 🛠 Installation

1. **Clone or Download this repo**.
2. Go to `chrome://extensions/` in Chrome.
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the folder.
5. Add your AI model URL in `popup.js` at:
   ```js
   fetch("<YOUR_AI_MODEL_URL>", {...}) 
6. Add your **OpenRouter API key** in `popup.js` at:
   ```js
   "Authorization": "Bearer <YOUR_AI_AUTH_TOKEN>"
