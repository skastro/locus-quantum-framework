import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// Hybrid Particles - mostly white with occasional pastel
const HybridParticles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    // Mostly white/gray, with 20% pastel accents
    const colors = [
      '#FFFFFF', '#FFFFFF', '#FFFFFF', '#E0E0E0', '#E0E0E0', '#C0C0C0', '#C0C0C0',
      '#C5B4E3', '#E8B4D9', '#B4D9C5', '#B4C5E3' // Pastel accents
    ];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Subtle connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.globalAlpha = (1 - distance / 100) * 0.08;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }} />;
};

// Audio Player
const AudioPlayer = ({ isPlaying, onToggle }) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('3:42');
  
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
        const seconds = Math.floor((progress / 100) * 222);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, progress]);
  
  return (
    <div style={{
      background: '#0A0A0A',
      border: '2px solid #303030',
      borderRadius: '12px',
      padding: '2rem',
      backdropFilter: 'blur(20px)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      {/* Album Art */}
      <div style={{
        width: '100%',
        aspectRatio: '1',
        background: 'linear-gradient(135deg, #1A1A1A, #0A0A0A)',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #303030',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Rotating circles with pastel hints */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            border: '2px solid rgba(197, 180, 227, 0.4)',
            borderRadius: '50%'
          }}
        />
        <motion.div
          animate={{ rotate: isPlaying ? -360 : 0 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: '60%',
            height: '60%',
            border: '2px solid rgba(232, 180, 217, 0.3)',
            borderRadius: '50%'
          }}
        />
        <div style={{ fontSize: '4rem', opacity: 0.4 }}>🛡️</div>
      </div>
      
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h3 style={{
          fontSize: '1.5rem',
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontFamily: '"Space Mono", monospace'
        }}>
          SIBHACA
        </h3>
        <p style={{
          color: '#A0A0A0',
          fontSize: '0.9rem',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic'
        }}>
          Warrior's Dance • skele.t0l
        </p>
      </div>
      
      {/* Progress Bar with pastel gradient */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          width: '100%',
          height: '4px',
          background: '#202020',
          borderRadius: '2px',
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #C5B4E3, #E8B4D9, #B4C5E3)',
              width: `${progress}%`
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#808080',
          fontFamily: '"Space Mono", monospace'
        }}>
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem'
      }}>
        <motion.button
          whileHover={{ scale: 1.1, color: '#C5B4E3' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#808080',
            fontSize: '1.5rem',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
          }}
        >
          ⏮
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(197, 180, 227, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C5B4E3, #E8B4D9)',
            border: 'none',
            color: '#000000',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(197, 180, 227, 0.3)'
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1, color: '#E8B4D9' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#808080',
            fontSize: '1.5rem',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
          }}
        >
          ⏭
        </motion.button>
      </div>
    </div>
  );
};

// Main Component
export default function MusicPortfolio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  return (
    <div style={{
      background: '#000000',
      color: '#FFFFFF',
      minHeight: '100vh',
      fontFamily: '"Space Mono", monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <HybridParticles />
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.01) 2px, rgba(255, 255, 255, 0.01) 4px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      
      {/* Hero Section */}
      <motion.section
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          opacity
        }}
      >
        {/* Minimal frame with pastel corners */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #303030',
          borderRadius: '4px',
          pointerEvents: 'none'
        }}>
          {/* Pastel corner dots */}
          {[
            { top: '10px', left: '10px', color: '#C5B4E3' },
            { top: '10px', right: '10px', color: '#E8B4D9' },
            { bottom: '10px', left: '10px', color: '#B4D9C5' },
            { bottom: '10px', right: '10px', color: '#B4C5E3' }
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
                width: '8px',
                height: '8px',
                background: pos.color,
                borderRadius: '50%',
                opacity: 0.6,
                boxShadow: `0 0 10px ${pos.color}`
              }}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '4rem' }}
        >
          {/* NEW TAGLINE */}
          <div style={{
            fontSize: '0.85rem',
            color: '#A0A0A0',
            letterSpacing: '0.4em',
            marginBottom: '1rem',
            fontFamily: '"Space Mono", monospace',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <span>INDOMITABLE SPIRIT</span>
            <span style={{ 
              color: '#C5B4E3',
              fontSize: '0.75rem',
              letterSpacing: '0.6em',
              fontWeight: 'normal'
            }}>
              l o c u s
            </span>
            <span>INFINITESIMAL ESSENCE</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#FFFFFF',
            letterSpacing: '0.1em',
            textShadow: '0 0 40px rgba(197, 180, 227, 0.2)'
          }}>
            skele.t0l
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#C0C0C0',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            marginBottom: '2rem'
          }}>
            Ancient rhythms meet electronic landscapes. <br />
            Channeling ancestral power through modern sound.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(197, 180, 227, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#featured').scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #C5B4E3, #E8B4D9)',
                border: 'none',
                color: '#000000',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: '"Space Mono", monospace',
                fontWeight: 'bold',
                letterSpacing: '0.05em'
              }}
            >
              ▶ LISTEN NOW
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#C5B4E3', color: '#C5B4E3' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1rem',
                background: 'transparent',
                border: '2px solid #FFFFFF',
                color: '#FFFFFF',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: '"Space Mono", monospace',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease'
              }}
            >
              ABOUT ME
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            fontSize: '1.5rem',
            color: '#C5B4E3',
            opacity: 0.5
          }}
        >
          ↓
        </motion.div>
      </motion.section>
      
      {/* Featured Track */}
      <section id="featured" style={{
        position: 'relative',
        zIndex: 2,
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <SectionHeader
          title="SIBHACA"
          subtitle="[ WARRIOR'S DANCE • DEBUT SINGLE ]"
        />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginTop: '4rem',
          alignItems: 'center'
        }}>
          <div>
            <AudioPlayer 
              isPlaying={isPlaying}
              onToggle={() => setIsPlaying(!isPlaying)}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              background: '#0A0A0A',
              border: '1px solid #303030',
              borderRadius: '8px',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: '#FFFFFF',
              marginBottom: '1rem',
              fontFamily: '"Space Mono", monospace'
            }}>
              About the Track
            </h3>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#C0C0C0',
              fontFamily: 'Georgia, serif',
              marginBottom: '1rem'
            }}>
              <strong style={{ color: '#FFFFFF' }}>Sibhaca</strong> is a traditional Zulu warrior's dance—a powerful expression of strength, unity, and ancestral connection. This track channels that raw energy through layered percussion, atmospheric synths, and rhythmic chants.
            </p>
            
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#A0A0A0',
              fontFamily: 'Georgia, serif',
              marginBottom: '1.5rem'
            }}>
              Recorded across three continents, blending field recordings from KwaZulu-Natal with electronic production, creating a bridge between ancient ritual and futuristic sound design.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              fontSize: '0.85rem',
              color: '#808080'
            }}>
              <div>
                <div style={{ opacity: 0.6, marginBottom: '0.25rem' }}>Genre</div>
                <div style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Afro-Electronic</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, marginBottom: '0.25rem' }}>BPM</div>
                <div style={{ fontWeight: 'bold', color: '#FFFFFF' }}>128</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, marginBottom: '0.25rem' }}>Key</div>
                <div style={{ fontWeight: 'bold', color: '#FFFFFF' }}>E Minor</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, marginBottom: '0.25rem' }}>Released</div>
                <div style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Jan 2026</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            marginTop: '3rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {['Spotify', 'Apple Music', 'SoundCloud', 'Bandcamp'].map((platform, i) => {
            const colors = ['#C5B4E3', '#E8B4D9', '#B4D9C5', '#B4C5E3'];
            return (
              <motion.a
                key={platform}
                href="#"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2, 
                  borderColor: colors[i],
                  boxShadow: `0 0 20px ${colors[i]}40`
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#0A0A0A',
                  border: '1px solid #404040',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {platform}
              </motion.a>
            );
          })}
        </motion.div>
      </section>
      
      {/* Lunar Node Bio */}
      <section id="about" style={{
        position: 'relative',
        zIndex: 2,
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <SectionHeader
          title="THE SOUL'S PATH"
          subtitle="[ WRITTEN IN THE STARS ]"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          <NodeCard
            title="NORTH NODE IN LEO"
            subtitle="12th House • The Mystical Performer"
            icon="🦁"
            color="#E8B4D9"
          >
            <p style={{ marginBottom: '1rem' }}>
              My soul's journey calls me to <strong>step into the spotlight with joy and authenticity</strong>—to share my unique light playfully with the world. Life is my stage for creative self-expression.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Yet this performance isn't for applause—it's <strong>deeply spiritual</strong>. The 12th house guides me toward surrender, compassion, and trust in the unseen. I'm moving beyond the material into mystery, intuition, and timeless truths.
            </p>
            <p>
              <em>Creative, mystical, healing pursuits.</em> The most powerful journeys are the ones within.
            </p>
          </NodeCard>
          
          <NodeCard
            title="MARS CONJUNCT NODE"
            subtitle="The Warrior's Courage"
            icon="⚔️"
            color="#C5B4E3"
          >
            <p style={{ marginBottom: '1rem' }}>
              This alignment adds <strong>courage, motivation, and a strong will</strong> to my path. I'm driven to act, compelled to prove myself—the warrior spirit flows through everything I create.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Sibhaca</strong> isn't just a track title—it's my astrological blueprint made audible. The Zulu warrior's dance channels this Mars-Node energy into sound and movement.
            </p>
            <p>
              Learning to direct this assertiveness toward <em>purpose</em> brings strength and clarity.
            </p>
          </NodeCard>
          
          <NodeCard
            title="SATURN TRINE NODE"
            subtitle="Grounded in Purpose"
            icon="🪐"
            color="#B4D9C5"
          >
            <p style={{ marginBottom: '1rem' }}>
              A natural alignment between <strong>personal responsibility and long-term goals</strong>. I tend toward maturity, self-awareness, and quiet ambition.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              My consistency and patience serve the journey well—building frameworks, creating structure, mapping the territory of consciousness. The <strong>Locus Framework</strong> itself embodies this Saturn energy.
            </p>
            <p>
              <em>Walking a grounded and meaningful life path.</em>
            </p>
          </NodeCard>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            marginTop: '4rem',
            background: '#0A0A0A',
            border: '1px solid #404040',
            borderRadius: '12px',
            padding: '3rem',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}
        >
          <div style={{
            fontSize: '1.5rem',
            color: '#FFFFFF',
            marginBottom: '1.5rem',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.1em'
          }}>
            THE INTEGRATION
          </div>
          
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '2',
            color: '#C0C0C0',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            maxWidth: '800px',
            margin: '0 auto 1.5rem'
          }}>
            "My music is where all these threads converge: the <span style={{ color: '#E8B4D9' }}>warrior's courage</span> of Mars, the <span style={{ color: '#C5B4E3' }}>creative spotlight</span> of Leo, the <span style={{ color: '#B4C5E3' }}>mystical depths</span> of the 12th house, and the <span style={{ color: '#B4D9C5' }}>structural discipline</span> of Saturn."
          </p>
          
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.8',
            color: '#A0A0A0',
            fontFamily: 'Georgia, serif',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            From analytical systems to spiritual surrender. From backstage service to center stage healing. This is the journey from Aquarius to Leo, from 6th house to 12th—a warrior-healer learning to channel ancestral power through electronic ritual.
          </p>
          
          <div style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: '#606060',
            opacity: 0.7,
            letterSpacing: '0.2em'
          }}>
            North Node Leo 12° • South Node Aquarius 12° • Mars 6° • Saturn 10°
          </div>
        </motion.div>
      </section>
      
      {/* Releases */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <SectionHeader
          title="RELEASES"
          subtitle="[ SONIC JOURNEY ]"
        />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <ReleaseCard
            title="Sibhaca"
            subtitle="Single • 2026"
            status="OUT NOW"
            color="#E8B4D9"
          />
          
          <ReleaseCard
            title="Elements EP"
            subtitle="EP • Coming Soon"
            status="SPRING 2026"
            color="#B4D9C5"
          />
          
          <ReleaseCard
            title="Locus"
            subtitle="Album • In Progress"
            status="2027"
            color="#C5B4E3"
          />
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 2,
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid #202020',
        marginTop: '4rem'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div style={{
            fontSize: '2rem',
            color: '#FFFFFF',
            marginBottom: '1rem',
            fontFamily: '"Space Mono", monospace'
          }}>
            skele.t0l
          </div>
          
          {/* NEW FOOTER TAGLINE */}
          <div style={{
            fontSize: '0.85rem',
            color: '#808080',
            marginBottom: '2rem',
            letterSpacing: '0.3em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            <span>INDOMITABLE SPIRIT</span>
            <span style={{ color: '#C5B4E3', fontSize: '0.7rem', letterSpacing: '0.5em' }}>
              l o c u s
            </span>
            <span>INFINITESIMAL ESSENCE</span>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {[
              { name: 'Instagram', color: '#E8B4D9' },
              { name: 'Twitter', color: '#C5B4E3' },
              { name: 'YouTube', color: '#B4D9C5' },
              { name: 'Email', color: '#B4C5E3' }
            ].map(link => (
              <a
                key={link.name}
                href="#"
                style={{
                  color: '#808080',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={e => e.target.style.color = link.color}
                onMouseLeave={e => e.target.style.color = '#808080'}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div style={{
            fontSize: '0.8rem',
            color: '#505050',
            opacity: 0.7
          }}>
            © 2026 skele.t0l • All Rights Reserved
          </div>
        </motion.div>
      </footer>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }
        
        ::selection {
          background: rgba(197, 180, 227, 0.3);
          color: #FFFFFF;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #C5B4E3, #E8B4D9);
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}

// Section Header
function SectionHeader({ title, subtitle }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', marginBottom: '2rem' }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: '120px' } : { width: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(197, 180, 227, 0.6), transparent)',
          margin: '0 auto 1rem'
        }}
      />
      
      <div style={{
        fontSize: '0.85rem',
        color: '#808080',
        letterSpacing: '0.3em',
        marginBottom: '0.5rem'
      }}>
        {subtitle}
      </div>
      
      <h2 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: '0.05em'
      }}>
        {title}
      </h2>
    </motion.div>
  );
}

// Node Card with pastel accent
function NodeCard({ title, subtitle, icon, color, children }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: '#0A0A0A',
        border: `2px solid ${isHovered ? color : '#303030'}`,
        borderRadius: '8px',
        padding: '2rem',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? `0 0 30px ${color}40` : 'none',
        cursor: 'default'
      }}
    >
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        filter: isHovered ? `drop-shadow(0 0 10px ${color})` : 'none',
        transition: 'filter 0.3s ease',
        opacity: isHovered ? 1 : 0.8
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontSize: '1.3rem',
        color: isHovered ? color : '#FFFFFF',
        marginBottom: '0.5rem',
        fontFamily: '"Space Mono", monospace',
        letterSpacing: '0.05em',
        transition: 'color 0.3s ease'
      }}>
        {title}
      </h3>
      
      <div style={{
        fontSize: '0.85rem',
        color: '#808080',
        marginBottom: '1.5rem',
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic'
      }}>
        {subtitle}
      </div>
      
      <div style={{
        fontSize: '0.95rem',
        lineHeight: '1.7',
        color: '#C0C0C0',
        fontFamily: 'Georgia, serif'
      }}>
        {children}
      </div>
    </motion.div>
  );
}

// Release Card with pastel accent
function ReleaseCard({ title, subtitle, status, color }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: '#0A0A0A',
        border: `2px solid ${isHovered ? color : '#303030'}`,
        borderRadius: '8px',
        padding: '2rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        boxShadow: isHovered ? `0 0 30px ${color}40` : 'none'
      }}
    >
      <div style={{
        width: '100%',
        aspectRatio: '1',
        background: `linear-gradient(135deg, ${color}15, #0A0A0A)`,
        borderRadius: '6px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${isHovered ? color : '#303030'}`,
        fontSize: '3rem',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
      }}>
        🎵
      </div>
      
      <div style={{
        fontSize: '0.75rem',
        color: color,
        letterSpacing: '0.2em',
        marginBottom: '0.5rem',
        fontWeight: 'bold'
      }}>
        {status}
      </div>
      
      <h3 style={{
        fontSize: '1.3rem',
        color: '#FFFFFF',
        marginBottom: '0.25rem',
        fontFamily: '"Space Mono", monospace'
      }}>
        {title}
      </h3>
      
      <p style={{
        fontSize: '0.9rem',
        color: '#808080',
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic'
      }}>
        {subtitle}
      </p>
    </motion.div>
  );
}
