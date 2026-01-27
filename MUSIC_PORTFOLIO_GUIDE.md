# 🎵 skele.t0l Music Portfolio - Sibhaca

A stunning music portfolio website featuring your debut single "Sibhaca" - the warrior's dance. Built with the beautiful pastel aesthetic from your Locus Framework graphics.

## ✨ What's Included

### 🎨 Pastel Aesthetic
- **Wisteria** `#C5B4E3` - Air element
- **Blush Pink** `#E8B4D9` - Fire element  
- **Sage Mint** `#B4D9C5` - Earth element
- **Periwinkle** `#B4C5E3` - Water element
- **Champagne** `#E8DCC4` - Neutral highlights
- **Soft Cream** `#F5EFE7` - Text
- **Deep Space** `#0A0A0D` - Background

### 📱 Sections

1. **Hero Section**
   - Artist name with gradient text effect
   - Tagline: "Ancient rhythms meet electronic landscapes"
   - Decorative frame inspired by your pastel graphics
   - CTA buttons (Listen Now, Explore)

2. **Featured Track - Sibhaca**
   - Custom audio player with:
     - Animated rotating circles (like vinyl)
     - Play/pause controls
     - Progress bar
     - Time display
     - Track info
   - About the track description
   - Genre, BPM, Key, Release date
   - Streaming platform links (Spotify, Apple Music, SoundCloud, Bandcamp)

3. **Artist Bio**
   - Your philosophy and approach
   - Background story
   - Styled quote block

4. **Releases**
   - Sibhaca (Single - OUT NOW)
   - Elements EP (Coming Spring 2026)
   - Locus (Album - 2027)
   - Hover effects on each release card

5. **Footer**
   - Social media links
   - Copyright
   - Contact info

### 🎭 Visual Effects

- **Pastel Particle Field** - 120 floating particles in your signature colors
- **Gentle Connections** - Subtle lines between nearby particles
- **Smooth Animations** - All sections fade in on scroll
- **Hover Effects** - Cards glow with pastel colors
- **Rotating Circles** - Animated "vinyl" in the audio player
- **Decorative Frames** - Corner ornaments matching your graphics
- **Gradient Text** - Title effects using pastel gradients

## 🚀 Quick Setup

### Option 1: Use the Existing Deployment Package

Replace `src/App.jsx` in your `locus-website-deploy` folder with `music-portfolio.jsx`:

```bash
cd locus-website-deploy
cp /path/to/music-portfolio.jsx src/App.jsx
npm run dev
```

### Option 2: New Vite Project

```bash
npm create vite@latest music-portfolio -- --template react
cd music-portfolio
npm install
npm install framer-motion
# Replace src/App.jsx with music-portfolio.jsx
npm run dev
```

## 🖼️ Adding Your Pastel Graphics

### 1. Place Graphics in Public Folder

```
public/
  images/
    locus-pastel-landscape.png
    locus-pastel-portrait.png
    locus-pastel-icon-square.png
    locus-pastel-icon-small.png
```

### 2. Use as Hero Background

```jsx
<div style={{
  backgroundImage: 'url(/images/locus-pastel-landscape.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.2,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0
}}>
```

### 3. Use as Album Art

Replace the audio player placeholder:

```jsx
<img 
  src="/images/locus-pastel-portrait.png" 
  alt="Sibhaca Album Art"
  style={{
    width: '100%',
    borderRadius: '8px',
    border: '1px solid rgba(197, 180, 227, 0.3)'
  }}
/>
```

### 4. Use as Favicon

```html
<!-- In index.html -->
<link rel="icon" href="/images/locus-pastel-icon-small.png" />
```

## 🎵 Connecting Real Audio

### Using HTML5 Audio

```jsx
const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      if (audio) {
        const value = (audio.currentTime / audio.duration) * 100;
        setProgress(value || 0);
      }
    };
    
    audio?.addEventListener('timeupdate', updateProgress);
    return () => audio?.removeEventListener('timeupdate', updateProgress);
  }, []);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <div>
      <audio ref={audioRef} src="/audio/sibhaca.mp3" />
      {/* Your player UI */}
      <button onClick={togglePlay}>
        {isPlaying ? '⏸' : '▶'}
      </button>
    </div>
  );
};
```

### Using Spotify Embed

```jsx
<iframe 
  src="https://open.spotify.com/embed/track/YOUR_TRACK_ID" 
  width="100%" 
  height="380" 
  frameBorder="0" 
  allowtransparency="true" 
  allow="encrypted-media"
  style={{
    borderRadius: '12px',
    border: '2px solid rgba(197, 180, 227, 0.4)'
  }}
></iframe>
```

### Using SoundCloud Embed

```jsx
<iframe 
  width="100%" 
  height="166" 
  scrolling="no" 
  frameBorder="no" 
  src="https://w.soundcloud.com/player/?url=YOUR_TRACK_URL&color=%23c5b4e3"
  style={{
    borderRadius: '12px',
    border: '2px solid rgba(197, 180, 227, 0.4)'
  }}
></iframe>
```

## 🎨 Customization Guide

### Change Artist Name

Search for `skele.t0l` and replace throughout

### Update Track Info

In the `AudioPlayer` component:
```jsx
<h3>SIBHACA</h3>
<p>Warrior's Dance • skele.t0l</p>
```

### Add More Releases

Copy the `ReleaseCard` pattern:
```jsx
<ReleaseCard
  title="Your Track Name"
  subtitle="Single • 2026"
  color="#E8B4D9"
  status="COMING SOON"
/>
```

### Modify Colors

All pastel colors are used throughout - search for hex codes to change:
- `#C5B4E3` - Wisteria
- `#E8B4D9` - Pink
- `#B4D9C5` - Sage
- `#B4C5E3` - Periwinkle

### Add More Streaming Platforms

In the streaming links section:
```jsx
{['Spotify', 'Apple Music', 'SoundCloud', 'Bandcamp', 'Tidal', 'YouTube Music'].map(...)}
```

## 📱 Adding Social Media

### Instagram Feed

Use Instagram's embed API or a service like Juicer.io:
```jsx
<div className="juicer-feed" data-feed-id="YOUR_FEED_ID"></div>
```

### YouTube Videos

Embed music videos:
```jsx
<iframe 
  width="100%" 
  height="400" 
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  frameBorder="0" 
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen
  style={{
    borderRadius: '12px',
    border: '2px solid rgba(197, 180, 227, 0.4)'
  }}
></iframe>
```

### Twitter Timeline

```jsx
<a 
  className="twitter-timeline" 
  href="https://twitter.com/YOUR_HANDLE"
  data-theme="dark"
  data-chrome="noheader nofooter noborders"
></a>
<script async src="https://platform.twitter.com/widgets.js"></script>
```

## 🛍️ Adding E-Commerce

### Bandcamp Store

```jsx
<iframe 
  src="https://bandcamp.com/EmbeddedPlayer/album=YOUR_ALBUM_ID/size=large/bgcol=0a0a0d/linkcol=c5b4e3/"
  seamless
  style={{
    border: '2px solid rgba(197, 180, 227, 0.4)',
    borderRadius: '12px',
    width: '100%',
    height: '470px'
  }}
></iframe>
```

### Merch Section

Add a new section:
```jsx
<section>
  <SectionHeader 
    title="MERCH" 
    subtitle="[ WARRIOR GEAR ]"
  />
  
  <div className="merch-grid">
    <MerchCard 
      title="Sibhaca T-Shirt"
      price="$30"
      image="/images/tshirt.png"
    />
    {/* More items */}
  </div>
</section>
```

## 🎭 About Sibhaca

### The Warrior's Dance

Sibhaca (also spelled iSibhaca) is a traditional Zulu dance performed by warriors. It's characterized by:

- **High-energy movements** - Jumping, stomping, coordinated group movements
- **Warrior spirit** - Displays of strength, agility, and unity
- **Cultural significance** - Celebrates heritage, tells stories, marks ceremonies
- **Rhythmic patterns** - Powerful drumming and vocal chants

### Your Track's Vision

Your music bridges:
- Ancient Zulu warrior traditions
- Electronic music production
- Healing and spiritual practice
- Modern sound design

This creates a unique sonic identity: **Ancestral Electronic** or **Ceremonial Bass**

## 🎯 Marketing Ideas

### Content to Create

1. **Behind the Scenes**
   - Studio sessions
   - Field recordings in KwaZulu-Natal
   - Production breakdown

2. **Cultural Context**
   - Video about Sibhaca dance
   - Interview with Zulu cultural practitioners
   - Your journey connecting to ancestry

3. **Visualizers**
   - Lyric videos using your pastel graphics
   - Animated versions of the Locus elements
   - Particle effects synced to music

4. **Live Performances**
   - DJ sets incorporating the track
   - Live instrumentation + electronic
   - Ceremonial performance settings

### Social Media Strategy

**Instagram:**
- Carousel posts about each element
- Reels of production process
- Stories with track snippets

**TikTok:**
- Short clips of the track
- Dance challenges (modern Sibhaca)
- Behind-the-scenes snippets

**Twitter:**
- Thread about the cultural research
- Production tips
- Philosophical quotes

## 📊 Analytics & SEO

### Add Analytics

```jsx
// In index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
```

### Meta Tags for Social Sharing

```html
<!-- Open Graph -->
<meta property="og:title" content="Sibhaca - skele.t0l" />
<meta property="og:description" content="Ancient rhythms meet electronic landscapes" />
<meta property="og:image" content="/images/locus-pastel-landscape.png" />
<meta property="og:url" content="https://yoursite.com" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Sibhaca - skele.t0l" />
<meta name="twitter:description" content="Warrior's Dance - Debut Single" />
<meta name="twitter:image" content="/images/locus-pastel-landscape.png" />
```

## 🚀 Deployment

Use the same Vercel deployment process from the main guide:

```bash
# Push to GitHub
git add .
git commit -m "Music portfolio - Sibhaca release"
git push

# Vercel deploys automatically!
```

### Custom Domain Ideas

- `skeletol.com`
- `sibhaca.com`
- `warriorsound.com`
- `locusmusic.com`

## 🎵 Future Features

### Phase 2: Interactive Elements

- **Waveform Visualizer** - Show audio waveform
- **BPM Detector** - Real-time tempo display
- **Key Detector** - Show musical key
- **Stems Player** - Let fans remix (isolate drums, bass, etc.)

### Phase 3: Community

- **Comment System** - Fans can leave messages
- **Download Gate** - Email for free download
- **Remix Contest** - Upload platform for fan remixes
- **Live Chat** - Connect with listeners during releases

### Phase 4: Advanced

- **Web Audio API** - Interactive sound manipulation
- **3D Visualizations** - Three.js particle systems
- **Generative Art** - Create unique visuals per listener
- **NFT Integration** - Limited edition releases

## 📄 Files You Have

✅ `music-portfolio.jsx` - Complete React component
✅ `locus_pastel_landscape.png` - Hero background
✅ `locus_pastel_portrait.png` - Album art
✅ `locus_pastel_icon_square.png` - Social media
✅ `locus_pastel_icon_small.png` - Favicon

## 🎊 Next Steps

1. **Replace App.jsx** in your deployment folder
2. **Add your graphics** to the public folder
3. **Test locally** with `npm run dev`
4. **Connect real audio** (Spotify, SoundCloud, or audio file)
5. **Update content** (bio, track description, dates)
6. **Push to GitHub** and deploy!

---

**Built with 🎵 for the warrior artist**

*Ancient wisdom. Modern sound. Pastel dreams.*
