# 🧠 Neural Learning Agent — Deploy Guide

A personalized AI tutor for any device. Deploy in ~5 minutes, totally free.

---

## 🚀 Deploy to Vercel (Free, recommended)

### Step 1 — Get your Anthropic API Key
1. Go to https://console.anthropic.com
2. Sign up / log in
3. Click **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`)

---

### Step 2 — Upload to GitHub
1. Go to https://github.com/new and create a new **public** repository
2. Name it `neural-learning-agent`
3. Upload all files from this folder (drag & drop or use GitHub Desktop)

---

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New → Project**
3. Select your `neural-learning-agent` repo → click **Import**
4. Before clicking Deploy, click **Environment Variables** and add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-key-here`
5. Click **Deploy** 🎉

You'll get a live URL like: `https://neural-learning-agent.vercel.app`

---

### Step 4 — Use on your phone!
- Open the URL on any phone, tablet, or computer
- Add to home screen for an app-like experience:
  - **iPhone:** Safari → Share → "Add to Home Screen"
  - **Android:** Chrome → Menu → "Add to Home Screen"

---

## 📁 Project Structure

```
neural-learning-agent/
├── api/
│   └── lesson.js        ← Serverless API (calls Claude)
├── public/
│   └── index.html       ← Full frontend (mobile-optimized)
├── vercel.json          ← Routing config
├── package.json
└── DEPLOY.md            ← This file
```

---

## 🛠 Run Locally (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# In project folder
ANTHROPIC_API_KEY=your_key_here vercel dev
```

Open http://localhost:3000

---

## ✨ Features
- 5-question learning style assessment
- 4 learner archetypes (Architect, Scholar, Builder, Listener)
- AI-generated lessons tailored to your learning style
- Fully mobile-optimized, works on all devices
- Add to home screen for app-like experience
