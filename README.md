# 🔐 Security Portfolio

A fast, minimal, professional security portfolio built with React + Vite.  
Designed for CTF players, pentesters, and security researchers.

## 🚀 Quick Start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # production build
npm run preview    # preview production build
```

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── writeups/          ← ✅ DROP YOUR NOTION HTML EXPORTS HERE
│   │   └── *.html
│   └── favicon.svg
├── scripts/
│   └── generate-manifest.mjs   ← auto-scan writeups dir
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.jsx
│   │       └── Layout.module.css
│   ├── data/
│   │   └── writeups-manifest.json   (auto-generated)
│   ├── pages/
│   │   ├── Home.jsx / .module.css
│   │   ├── Writeups.jsx / .module.css
│   │   ├── WriteupDetail.jsx / .module.css
│   │   ├── Cheatsheets.jsx / .module.css
│   │   ├── Projects.jsx / .module.css
│   │   └── Contact.jsx / .module.css
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
```

---

## ✏️ Personalizing Your Portfolio

### 1. Your Name & Info
Edit `src/components/layout/Layout.jsx`:
```jsx
// Change the logo:
<span className={styles.logoName}>yourname</span>
```

Edit `src/pages/Home.jsx`:
- Update the hero bio text
- Update the stats numbers
- Update the RECENT writeups array
- Update skills list

### 2. Social Links
Edit `src/pages/Contact.jsx` → `SOCIALS` array:
```js
{ label: 'GitHub', handle: '@yourhandle', href: 'https://github.com/yourhandle', ... }
```
Also update the footer links in `Layout.jsx`.

### 3. Projects
Edit `src/pages/Projects.jsx` → `PROJECTS` array with your real projects.

### 4. Cheatsheets
Edit `src/pages/Cheatsheets.jsx` → `CHEATSHEETS` array.  
Add as many sections and commands as you like.

---

## 📝 Adding Writeups (Notion Workflow)

### Option A — Manual (quickest)

1. In Notion, open your writeup page → **Export → HTML**
2. Move the `.html` file to `public/writeups/`
3. Add an entry to the manifest array in **both** files:
   - `src/pages/Writeups.jsx` → `WRITEUPS_MANIFEST`  
   - `src/pages/WriteupDetail.jsx` → `WRITEUPS_MANIFEST`

```js
{
  slug: 'my-writeup-slug',          // URL path: /writeups/my-writeup-slug
  title: 'HTB: MyMachine — RCE via Deserialization',
  date: '2024-04-10',
  event: 'HackTheBox',
  difficulty: 'medium',             // easy | medium | hard
  tags: ['java', 'deserialization', 'linux'],
  description: 'Short one-liner description shown on the card.',
  file: 'my-writeup.html',          // filename in public/writeups/
}
```

### Option B — Auto-generate (recommended for many writeups)

Add special `<meta>` tags to your Notion export (or a small script that adds them):

```html
<meta name="description" content="Short description...">
<meta name="keywords" content="pwn,binary,linux">
<meta name="ctf-event" content="picoCTF">
<meta name="ctf-difficulty" content="medium">
<meta name="date" content="2024-03-18">
```

Then run:
```bash
node scripts/generate-manifest.mjs
```

This outputs `src/data/writeups-manifest.json`.  
Then in both `Writeups.jsx` and `WriteupDetail.jsx`, replace the inline array with:
```js
import WRITEUPS_MANIFEST from '../data/writeups-manifest.json'
```

---

## 🎨 Customizing the Theme

All design tokens live in `src/styles/globals.css` under `:root { ... }`.

Key variables:
```css
--bg: #f7f6f2;           /* page background */
--accent: #2563eb;        /* primary blue */
--text-primary: #1a1916;  /* main text */
```

Change `--accent` to any color to instantly re-theme the whole portfolio.

---

## 📬 Contact Form

The form currently simulates a submission. To wire it up for real:

### Formspree (free tier)
```bash
# 1. Go to formspree.io and create a form
# 2. In Contact.jsx, replace the handleSubmit function:
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
setStatus(res.ok ? 'sent' : 'error')
```

### EmailJS (free tier, no backend)
```bash
npm install emailjs-com
# Follow emailjs.com docs for setup
```

---

## 🚢 Deployment

### Vercel (recommended — free)
```bash
npm install -g vercel
vercel
# Follow the prompts — auto-detects Vite
```

### Netlify
```bash
npm run build
# Drag & drop the dist/ folder at netlify.com
```

### GitHub Pages
```bash
# In vite.config.js, add: base: '/your-repo-name/'
npm run build
# Push dist/ to gh-pages branch
```

### Self-hosted (nginx)
```bash
npm run build
# Serve the dist/ folder with nginx
# Add this to your nginx config for SPA routing:
# try_files $uri $uri/ /index.html;
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Vite 5 | Build tool (blazing fast HMR) |
| CSS Modules | Scoped styling, zero runtime |
| Space Mono | Monospace / terminal font |
| DM Sans | Clean body font |
| Syne | Display / heading font |

No UI library dependencies. Pure CSS + React.

---

## 📄 License

MIT — use freely for your personal portfolio.
