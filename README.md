# EGN STORE — Order & Price List App

A simple mobile-friendly app for marking items to order and viewing/editing a price list. Built with React + Vite.

## Features
- 6 categories (Market Items, Wet & Frozen, Dry Goods, Meat Products, Condiments, Plastic Supplies) + add your own
- Mark items with a red checkmark, add notes (e.g. "5kls", "1box lang")
- Copy the marked order list for SMS or Messenger
- Price List view — tap any item's price to add/edit it (reference only, not included in orders)
- **Data is saved automatically on the device** (browser local storage) — survives closing the app/browser

---

## Option A: Deploy to Vercel (recommended, free)

1. Go to https://vercel.com and sign up / log in (GitHub, Google, or email).
2. Click **"Add New" → "Project"**.
3. Choose **"Deploy without Git"** / drag-and-drop option, or push this folder to a GitHub repo and import it.
4. If uploading manually: zip this whole folder and drag it into the Vercel upload area.
5. Vercel auto-detects Vite — leave settings as default and click **Deploy**.
6. After ~1 minute you'll get a live URL like `https://egn-store.vercel.app`.

## Option B: Deploy to Netlify (also free)

1. Go to https://netlify.com and sign up / log in.
2. Run these commands locally (or in any environment with Node.js installed):
   ```bash
   npm install
   npm run build
   ```
   This creates a `dist/` folder.
3. On Netlify, choose **"Add new site" → "Deploy manually"**, then drag the `dist/` folder into the upload area.
4. You'll get a live URL like `https://egn-store.netlify.app`.

---

## After deployment — installing on the employee's Android phone

1. Open the live URL in **Chrome** on the Android phone.
2. Tap the **⋮ (three dots) menu** in the top right.
3. Tap **"Add to Home screen"** or **"Install app"**.
4. Confirm — an **EGN STORE** icon will appear on the home screen, opening full-screen like a real app.

---

## Notes
- All data (marks, notes, prices, custom categories) is stored **locally on each device** using browser storage. It will NOT sync between different phones/devices — each device keeps its own data.
- If the employee clears their browser data/cache, the saved data will be lost.
- To reset the app to defaults, clear the site's storage in the browser settings (Settings → Site settings → All sites → find the site → Clear & reset).
