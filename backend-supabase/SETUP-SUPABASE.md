# Permanent Storage with Supabase (Free Forever!)

The best solution for unlimited, permanent storage.

---

## ✨ Why Supabase?

✅ **Completely free** (no credit card)
✅ **500 MB storage** (huge!)
✅ **50,000 requests/month**
✅ **Data persists forever**
✅ **Works everywhere**
✅ **No complex setup**

---

## 🚀 Setup (10 minutes)

### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (easiest)
4. **No credit card required!**

---

### Step 2: Create a Project

1. Click **"New Project"**
2. Fill in:
   - **Name:** `tarla` (or anything)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to you
3. Click **"Create new project"**
4. Wait 2 minutes for setup

---

### Step 3: Create the Database Table

1. In your Supabase project, click **"Table Editor"** (left sidebar)
2. Click **"Create a new table"**
3. Fill in:
   - **Name:** `land_storage`
   - **Enable Row Level Security (RLS):** ❌ **Turn OFF** (we want it public)

4. **Add columns:**

| Column Name | Type | Settings |
|------------|------|----------|
| `id` | `int8` | Primary key, Auto-increment |
| `key` | `text` | Unique |
| `data` | `jsonb` | |
| `updated_at` | `timestamptz` | Default: `now()` |
| `created_at` | `timestamptz` | Default: `now()` |

5. Click **"Save"**

---

### Step 4: Disable RLS (Important!)

After creating the table:

1. Click on **"Authentication"** in left sidebar
2. Go to **"Policies"** tab
3. Find **"land_storage"** table
4. Make sure **RLS is disabled** (toggle should be OFF)

**Why?** We want anyone with the FIXED_KEY to access the data.

---

### Step 5: Get Your API Keys

1. Click **"Settings"** (gear icon, bottom left)
2. Click **"API"** in the sidebar
3. You'll see:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJh...` (very long)

**Copy both of these!**

---

### Step 6: Add Keys to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your **tarla** project
3. Go to **"Settings"** → **"Environment Variables"**
4. Add these two:

**Variable 1:**
- Name: `SUPABASE_URL`
- Value: (paste your Project URL)

**Variable 2:**
- Name: `SUPABASE_ANON_KEY`
- Value: (paste your anon public key)

5. Click **"Save"**

---

### Step 7: Update Your Code

**In your GitHub repo:**

1. Replace `api/storage.js` with the new version (from this folder)
2. Replace `package.json` with the new version
3. Commit changes

**Vercel will auto-deploy!**

---

### Step 8: Test

After deployment (2 minutes):

1. Open: `https://tarla-rose.vercel.app/api/storage?key=test`
2. Should see: `{"error":"No data found for this key"}`
3. ✅ Working!

4. Open your app
5. Add data → Save to Cloud
6. Should work! ✅

---

## 📊 Your Free Tier Limits

**Supabase Free Tier:**
- ✅ 500 MB database storage
- ✅ 50,000 rows
- ✅ 2 GB bandwidth
- ✅ 50,000 requests per month
- ✅ Unlimited projects

**For your use case:**
- Each save = ~5 KB
- 500 MB = **100,000 saves!**
- 50,000 requests = **1,600 saves per day**

**More than enough!** 🎯

---

## 🔒 Security

**Is my data safe?**
- ✅ Yes! Supabase is very secure
- ✅ Only people with your FIXED_KEY can access your data
- ✅ Data is encrypted at rest
- ✅ Hosted by AWS (enterprise-grade)

**Make your FIXED_KEY unique:**
```javascript
FIXED_KEY: 'my_secret_family_key_2026_xyz',
```

---

## 🆚 Comparison

| Solution | Permanent | Free | Limit | Setup |
|----------|-----------|------|-------|-------|
| **In-Memory** | ❌ No | ✅ Yes | None | 0 min |
| **Vercel KV** | ✅ Yes | ✅ Yes* | 256 MB | 5 min |
| **JSONBin** | ✅ Yes | ✅ Yes | 100 saves/mo | 0 min |
| **Supabase** | ✅ Yes | ✅ Yes | 500 MB | 10 min |

*Not available in all regions

**Supabase is the best!** ⭐

---

## 🛠 Troubleshooting

**Error: "Invalid API key"**
→ Check environment variables in Vercel

**Error: "relation 'land_storage' does not exist"**
→ Create the table in Supabase (Step 3)

**Error: "row-level security policy violation"**
→ Disable RLS on the table (Step 4)

**Error: "Failed to fetch"**
→ Check SUPABASE_URL is correct

---

## 🎉 After Setup

✅ Data saves permanently
✅ Works on all devices
✅ Never resets
✅ No maintenance needed
✅ Scales automatically

**Your land distribution data is now stored forever!** 🚀

---

## 💡 Optional: View Your Data

Want to see your saved data?

1. Go to Supabase dashboard
2. Click **"Table Editor"**
3. Click **"land_storage"** table
4. See all saved data!

You can also:
- Export to CSV
- Manually edit
- Delete old data
- Search and filter

---

## 📞 Need Help?

1. Make sure you completed all 8 steps
2. Check environment variables are set in Vercel
3. Check table exists in Supabase
4. Check RLS is disabled

**This is the best permanent storage solution!** 🏆
