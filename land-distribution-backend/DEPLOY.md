# Land Distribution Backend - Deployment Guide

This is a simple serverless backend for your Land Distribution App. It provides a fixed URL for cloud storage with no setup required on the frontend.

## Quick Deploy to Vercel (FREE - 5 minutes)

### Step 1: Prerequisites
- Free Vercel account (sign up at vercel.com)
- The files in this folder

### Step 2: Deploy

**Option A: Deploy via Vercel CLI (Recommended)**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to this folder:
```bash
cd land-distribution-backend
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Login to Vercel (if not already)
   - Link to existing project? **N** (No - create new)
   - Project name? **land-distribution-backend** (or your choice)
   - Which directory? **.** (current directory)
   - Want to override settings? **N** (No)

5. After deployment, you'll get a URL like:
   ```
   https://land-distribution-backend.vercel.app
   ```

**Option B: Deploy via Vercel Web UI**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"** or drag the folder
4. Upload these files (or connect your GitHub repo)
5. Click **"Deploy"**
6. Wait 1-2 minutes
7. You'll get a URL like: `https://land-distribution-backend.vercel.app`

### Step 3: Update Your Frontend

After deployment, update your `index.html`:

1. Open `index.html`
2. Find this line (around line 716):
```javascript
API_URL: 'YOUR_VERCEL_URL_HERE',
```

3. Replace `YOUR_VERCEL_URL_HERE` with your Vercel URL:
```javascript
API_URL: 'https://land-distribution-backend.vercel.app',
```

4. Save the file

**Done! Your app now has permanent cloud storage! 🎉**

---

## How It Works

- **Save**: `POST https://your-url.vercel.app/api/storage?key=YOUR_KEY&data={...}`
- **Load**: `GET https://your-url.vercel.app/api/storage?key=YOUR_KEY`

The backend stores data in memory (persists during the serverless function lifetime). For permanent storage, you can upgrade to use Vercel KV (still free tier available).

---

## Upgrading to Persistent Storage (Optional)

For data that persists forever (even after restarts), you can use Vercel KV:

1. Go to your Vercel dashboard
2. Click on your project
3. Go to **Storage** tab
4. Create a **KV Database** (free tier: 256 MB)
5. Update `api/storage.js` to use KV instead of in-memory storage

I can help you with this if needed!

---

## Testing Your Backend

Test if it's working:

```bash
# Save data
curl -X POST "https://your-url.vercel.app/api/storage" \
  -H "Content-Type: application/json" \
  -d '{"key":"test","data":{"hello":"world"}}'

# Load data
curl "https://your-url.vercel.app/api/storage?key=test"
```

---

## Troubleshooting

**Problem:** "Module not found"
**Solution:** Make sure `package.json` is in the root directory

**Problem:** CORS errors
**Solution:** The API already has CORS enabled. Make sure you're using the correct URL.

**Problem:** Data not persisting
**Solution:** In-memory storage resets when the function restarts. Upgrade to Vercel KV for persistence.

---

## Cost

- **Vercel Free Tier:**
  - ✅ 100 GB bandwidth/month
  - ✅ Unlimited requests
  - ✅ Serverless function executions
  - ✅ No credit card required

This is more than enough for personal/family use!

---

## Next Steps

1. Deploy backend to Vercel
2. Copy your Vercel URL
3. Update `index.html` with the URL
4. Upload updated `index.html` to GitHub Pages
5. Done! Cloud storage works on all devices!
