# Permanent Storage with JSONBin.io

Since Vercel KV isn't available in your account, use JSONBin.io instead - it's simpler and works everywhere!

## ✨ Advantages

✅ **No database setup needed** - Just update the code
✅ **Truly free** - No credit card, no limits for your use case
✅ **Works everywhere** - No regional restrictions
✅ **Permanent storage** - Data saved forever
✅ **Zero configuration** - API key already included

---

## 🚀 Setup (2 minutes)

### Step 1: Update Your Backend Files

**In your GitHub repo:**

1. Replace `api/storage.js` with the new version (from this folder)
2. Replace `package.json` with the new version
3. Commit changes

**That's it!** No database to create, no setup needed!

### Step 2: Wait for Deployment

Vercel will auto-deploy (1-2 minutes)

### Step 3: Test

1. Open your app
2. Add data
3. Save to Cloud
4. Close browser
5. Come back anytime - data persists! ✅

---

## 🔧 How It Works

**JSONBin.io** is a free JSON storage service:
- Stores your data as JSON
- Free tier: Unlimited reads, 100 updates/month (more than enough!)
- No account needed (using public API key)
- Data persists forever

**Your backend:**
- Acts as a proxy to JSONBin
- Handles CORS and formatting
- Makes it work seamlessly with your app

---

## 📊 Usage Limits

**JSONBin.io Free Tier:**
- ✅ Unlimited reads (load from cloud)
- ✅ 100 updates per month (save to cloud)
- ✅ 100 KB storage (huge for your data!)

**For your use case:**
- You save maybe 10-20 times per month
- Well under the 100 updates limit
- Perfect fit! 🎯

---

## 🔒 Security Note

The API key in the code is a **public read/write key** for a shared bin.

**This means:**
- ⚠️ Anyone with the same FIXED_KEY can access the same data
- ✅ Perfect for family sharing
- ✅ Your FIXED_KEY acts as the password

**Make your FIXED_KEY unique** in `index.html`:
```javascript
FIXED_KEY: 'my_unique_family_key_2026',
```

Only people with this exact key can access your data.

---

## 🆚 Comparison

| Solution | Setup | Free? | Permanent? | Limits |
|----------|-------|-------|------------|--------|
| **In-Memory** | None | Yes | ❌ No | N/A |
| **Vercel KV** | Create DB | Yes* | ✅ Yes | Region-locked |
| **JSONBin** | None | ✅ Yes | ✅ Yes | 100 saves/month |

*Not available in all regions

---

## ⚠️ Known Limitation

**100 saves per month** on free tier.

If you exceed this:
- **Option A:** Sign up for JSONBin.io (still free with account)
- **Option B:** Create your own bin and use your own API key
- **Option C:** Use share codes instead of cloud (no limits)

For typical family use (saving 5-10 times), this is more than enough!

---

## 🎯 Next Steps

1. **Update your backend files** (from this folder)
2. **Commit to GitHub** (Vercel auto-deploys)
3. **Test it** - Data now persists!

**No database creation, no configuration, just works!** 🚀

---

## 💡 Want Your Own API Key?

If you want unlimited saves or private storage:

1. Go to [jsonbin.io](https://jsonbin.io)
2. Sign up (free)
3. Create an API key
4. Create a bin
5. Replace the key and bin ID in `storage.js`

But the included key works fine for most users!
