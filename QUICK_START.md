# 🚀 QUICK START - Copy & Paste These Commands

## 📦 Initial Setup (Do Once)

```bash
# 1. Navigate to your project folder
cd locus-website-deploy

# 2. Install dependencies
npm install

# 3. Test it works
npm run dev
# Open http://localhost:5173 - Press Ctrl+C to stop

# 4. Initialize Git
git init
git add .
git commit -m "Initial commit - Locus Framework"
```

## 🔗 Push to GitHub (Do Once)

### Create repo on GitHub first, then:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/locus-quantum-framework.git
git branch -M main
git push -u origin main
```

## ⚡ Deploy to Vercel (Do Once)

### Option 1: Website (Easiest)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your `locus-quantum-framework` repo
5. Click "Deploy"
6. ✅ Done!

### Option 2: CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Make it production
vercel --prod
```

## 🔄 Update Your Site (After Initial Deploy)

Every time you want to make changes:

```bash
# 1. Make your edits in src/App.jsx

# 2. Test locally (optional)
npm run dev

# 3. Commit and push
git add .
git commit -m "Updated content"
git push

# Vercel automatically rebuilds! No extra steps needed! ✨
```

## 🆘 If Something Goes Wrong

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Force rebuild
npm run build

# Check for errors
npm run dev
```

## 📍 Important URLs

- **Local Dev:** http://localhost:5173
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Site:** https://YOUR-PROJECT.vercel.app

---

## That's It! 🎉

Three commands to get live:
1. `npm install`
2. Push to GitHub
3. Import to Vercel

Then just `git push` for all future updates!
