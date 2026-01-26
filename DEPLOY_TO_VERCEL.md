# 🚀 Deploy Your Locus Website to Vercel

## Prerequisites
- Node.js installed (v16 or higher)
- Git installed
- GitHub account (free)
- Vercel account (free - sign up at vercel.com)

---

## 🎯 Quick Deploy (5 Minutes!)

### Step 1: Extract the Project
```bash
# Extract the locus-website-deploy folder from the zip
# Navigate into it
cd locus-website-deploy
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- React 18
- Framer Motion (for animations)
- Vite (build tool)

### Step 3: Test Locally (Optional but Recommended)
```bash
npm run dev
```

Open http://localhost:5173 in your browser. You should see your quantum website!
Press `Ctrl+C` to stop the server when done.

### Step 4: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit - Locus Quantum Framework"
```

### Step 5: Create GitHub Repository

**Option A: Via GitHub Website**
1. Go to https://github.com/new
2. Repository name: `locus-quantum-framework`
3. Make it Public (or Private if you prefer)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

**Option B: Via GitHub CLI (if installed)**
```bash
gh repo create locus-quantum-framework --public --source=. --remote=origin
```

### Step 6: Push to GitHub

GitHub will show you commands, but they'll look like this:
```bash
git remote add origin https://github.com/YOUR_USERNAME/locus-quantum-framework.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!

### Step 7: Deploy to Vercel

**Option A: Via Vercel Website (Easiest)**
1. Go to https://vercel.com
2. Click "Sign Up" (use GitHub to sign in)
3. Click "New Project"
4. Import your `locus-quantum-framework` repository
5. Vercel auto-detects it's a Vite project ✓
6. Click "Deploy"
7. Wait 1-2 minutes... ☕
8. Done! 🎉

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - What's your project's name? locus-quantum-framework
# - In which directory is your code located? ./
# - Want to override settings? No

# Production deployment
vercel --prod
```

---

## 🎊 You're Live!

Your website is now at: `https://locus-quantum-framework.vercel.app`

Or a custom domain if you configured one!

---

## 🔧 Making Changes

After the initial deployment, any updates are super easy:

```bash
# Make your changes to src/App.jsx or other files

# Commit and push
git add .
git commit -m "Updated content"
git push

# Vercel automatically rebuilds and deploys! ✨
```

Every push to `main` branch = automatic deployment!

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `locusframework.com`)
4. Follow Vercel's instructions to update your DNS settings
5. Wait for DNS propagation (can take up to 48 hours)
6. Vercel automatically handles HTTPS! 🔒

**Popular Domain Registrars:**
- Namecheap.com
- Google Domains
- GoDaddy
- Cloudflare

---

## 📝 Environment Variables (If Needed Later)

If you add features that need API keys or secrets:

1. Create `.env.local` file in your project:
```bash
VITE_API_KEY=your_secret_key_here
```

2. Add to Vercel:
   - Project Settings → Environment Variables
   - Add the same variables
   - Redeploy

3. Use in code:
```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Problem:** "Command failed: npm run build"

**Solution:**
```bash
# Test build locally first
npm run build

# If it works locally but fails on Vercel:
# Check that all dependencies are in package.json (not devDependencies)
```

### Site Loads but Shows Blank Page

**Problem:** White screen, no content

**Solutions:**
1. Check browser console for errors (F12)
2. Ensure `src/main.jsx` imports `App.jsx` correctly
3. Verify `index.html` has `<div id="root"></div>`

### Animations Don't Work

**Problem:** Static site, no particle effects

**Solution:**
```bash
# Reinstall framer-motion
npm install framer-motion --save
```

### Port Already in Use

**Problem:** "Error: Port 5173 is already in use"

**Solution:**
```bash
# Kill the process
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

---

## 📊 Vercel Analytics (Optional but Cool!)

Enable free analytics to see visitor stats:

1. Go to your project on Vercel
2. Click "Analytics" tab
3. Click "Enable Analytics"
4. See real-time visitors, page views, and more!

---

## ⚡ Performance Tips

Your site is already fast, but to make it BLAZING:

### 1. Optimize Images
If you add images, compress them:
- TinyPNG.com (free)
- ImageOptim (Mac)
- Squoosh.app (online)

### 2. Reduce Particles on Mobile
In `src/App.jsx`, find `particleCount`:
```javascript
const particleCount = window.innerWidth < 768 ? 50 : 150;
```

### 3. Enable Edge Functions (Advanced)
In `vercel.json`:
```json
{
  "functions": {
    "src/api/*.js": {
      "runtime": "edge"
    }
  }
}
```

---

## 🎨 Next Steps

Now that your site is live, consider:

1. **Add more content**
   - Blog posts about your framework
   - Case studies
   - Testimonials
   - Contact form

2. **SEO Optimization**
   - Add meta tags
   - Create sitemap
   - Submit to Google Search Console

3. **Analytics**
   - Google Analytics
   - Vercel Analytics
   - Hotjar (user behavior)

4. **Social Media**
   - Share your site!
   - Add social sharing buttons
   - Create preview images (Open Graph)

---

## 🆘 Need Help?

### Vercel Support
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Twitter: @vercel

### React/Vite Issues
- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev
- Framer Motion: https://www.framer.com/motion

### This Project
- Check the main README
- Review src/App.jsx comments
- Test locally with `npm run dev`

---

## 🎉 Congratulations!

Your Locus Quantum Framework is now live on the internet! 

**Your deployment:**
- ✅ Lightning-fast loading
- ✅ Auto HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on push
- ✅ Zero configuration
- ✅ Free hosting!

Share your live site URL and show off your quantum framework! 🌌✨

---

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build locally

# Git
git status           # Check what changed
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub (triggers Vercel deploy)

# Vercel CLI
vercel               # Deploy preview
vercel --prod        # Deploy to production
vercel logs          # View deployment logs
```

---

**Note:** Every time you push to GitHub, Vercel automatically rebuilds and deploys your site. No manual steps needed! 🚀
