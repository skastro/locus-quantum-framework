import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// [Previous particle component code remains the same]
const PastelParticles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 120;
    const colors = ['#C5B4E3', '#E8B4D9', '#B4D9C5', '#B4C5E3'];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.4 + 0.2;
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
      
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.strokeStyle = '#C5B4E3';
            ctx.globalAlpha = (1 - distance / 120) * 0.1;
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

// [Audio Player component remains the same]
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
      background: 'rgba(26, 22, 20, 0.8)',
      border: '2px solid rgba(197, 180, 227, 0.4)',
      borderRadius: '12px',
      padding: '2rem',
      backdropFilter: 'blur(20px)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{
        width: '100%',
        aspectRatio: '1',
        background: 'linear-gradient(135deg, rgba(197, 180, 227, 0.2), rgba(232, 180, 217, 0.2))',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(197, 180, 227, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            border: '2px solid rgba(197, 180, 227, 0.6)',
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
            border: '2px solid rgba(232, 180, 217, 0.6)',
            borderRadius: '50%'
          }}
        />
        <div style={{ fontSize: '4rem', opacity: 0.6 }}>🛡️</div>
      </div>
      
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h3 style={{
          fontSize: '1.5rem',
          color: '#F5EFE7',
          marginBottom: '0.5rem',
          fontFamily: '"Space Mono", monospace'
        }}>
          SIBHACA
        </h3>
        <p style={{
          color: '#C5B4E3',
          fontSize: '0.9rem',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic'
        }}>
          Warrior's Dance • skele.t0l
        </p>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(197, 180, 227, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #C5B4E3, #E8B4D9)',
              width: `${progress}%`
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#B4C5E3',
          fontFamily: '"Space Mono", monospace'
        }}>
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem'
      }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#C5B4E3',
            fontSize: '1.5rem',
            cursor: 'pointer',
            opacity: 0.6
          }}
        >
          ⏮
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C5B4E3, #E8B4D9)',
            border: 'none',
            color: '#0A0A0D',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(197, 180, 227, 0.4)'
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#C5B4E3',
            fontSize: '1.5rem',
            cursor: 'pointer',
            opacity: 0.6
          }}
        >
          ⏭
        </motion.button>
      </div>
    </div>
  );
};

// Main Component with NEW LUNAR NODE BIO
export default function MusicPortfolio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  return (
    <div style={{
      background: '#0A0A0D',
      color: '#F5EFE7',
      minHeight: '100vh',
      fontFamily: '"Space Mono", monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <PastelParticles />
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(197, 180, 227, 0.02) 2px, rgba(197, 180, 227, 0.02) 4px)',
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
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '2px solid rgba(197, 180, 227, 0.2)',
          borderRadius: '4px',
          pointerEvents: 'none'
        }}>
          {[
            { top: '10px', left: '10px' },
            { top: '10px', right: '10px' },
            { bottom: '10px', left: '10px' },
            { bottom: '10px', right: '10px' }
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...pos,
                width: '20px',
                height: '20px',
                border: '2px solid rgba(232, 180, 217, 0.4)',
                borderRadius: '50%'
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
          <div style={{
            fontSize: '0.9rem',
            color: '#C5B4E3',
            letterSpacing: '0.3em',
            marginBottom: '1rem',
            fontFamily: '"Space Mono", monospace'
          }}>
            [ WARRIOR • ARTIST • HEALER ]
          </div>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #F5EFE7 0%, #C5B4E3 50%, #E8B4D9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em',
            textShadow: '0 0 40px rgba(197, 180, 227, 0.3)'
          }}>
            skele.t0l
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#B4C5E3',
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
                color: '#0A0A0D',
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1rem',
                background: 'transparent',
                border: '2px solid #C5B4E3',
                color: '#C5B4E3',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: '"Space Mono", monospace',
                letterSpacing: '0.05em'
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
              background: 'rgba(26, 22, 20, 0.6)',
              border: '2px solid rgba(197, 180, 227, 0.3)',
              borderRadius: '8px',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: '#E8B4D9',
              marginBottom: '1rem',
              fontFamily: '"Space Mono", monospace'
            }}>
              About the Track
            </h3>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#B4D9C5',
              fontFamily: 'Georgia, serif',
              marginBottom: '1rem'
            }}>
              <strong style={{ color: '#F5EFE7' }}>Sibhaca</strong> is a traditional Zulu warrior's dance—a powerful expression of strength, unity, and ancestral connection. This track channels that raw energy through layered percussion, atmospheric synths, and rhythmic chants.
            </p>
            
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#B4C5E3',
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
              color: '#C5B4E3'
            }}>
              <div>
                <div style={{ opacity: 0.6, marginBottom: '0.25rem' }}>Genre</div>
                <div style={{ fontWeight: 'bold' }}>Afro-Electronic</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, marginBottom: '0.25rem' }}>BPM</div>
                <div style={{ fontWeight: 'bold' }}>128</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, marginBottom: '0.25rem' }}>Key</div>
                <div style={{ fontWeight: 'bold' }}>E Minor</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, marginBottom: '0.25rem' }}>Released</div>
                <div style={{ fontWeight: 'bold' }}>Jan 2026</div>
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
          {['Spotify', 'Apple Music', 'SoundCloud', 'Bandcamp'].map((platform) => (
            <motion.a
              key={platform}
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(197, 180, 227, 0.1)',
                border: '1px solid rgba(197, 180, 227, 0.3)',
                borderRadius: '6px',
                color: '#C5B4E3',
                textDecoration: 'none',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              {platform}
            </motion.a>
          ))}
        </motion.div>
      </section>
      
      {/* ✨ NEW: LUNAR NODE BIO SECTION ✨ */}
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
          {/* North Node Card */}
          <NodeCard
            title="NORTH NODE IN LEO"
            subtitle="12th House • The Mystical Performer"
            color="#E8B4D9"
            icon="🦁"
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
          
          {/* Mars Conjunction Card */}
          <NodeCard
            title="MARS CONJUNCT NODE"
            subtitle="The Warrior's Courage"
            color="#C5B4E3"
            icon="⚔️"
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
          
          {/* Saturn Trine Card */}
          <NodeCard
            title="SATURN TRINE NODE"
            subtitle="Grounded in Purpose"
            color="#B4D9C5"
            icon="🪐"
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
        
        {/* Journey Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            marginTop: '4rem',
            background: 'rgba(26, 22, 20, 0.6)',
            border: '2px solid rgba(197, 180, 227, 0.3)',
            borderRadius: '12px',
            padding: '3rem',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}
        >
          <div style={{
            fontSize: '1.5rem',
            color: '#E8B4D9',
            marginBottom: '1.5rem',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.1em'
          }}>
            THE INTEGRATION
          </div>
          
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '2',
            color: '#B4C5E3',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            maxWidth: '800px',
            margin: '0 auto 1.5rem'
          }}>
            "My music is where all these threads converge: the <span style={{ color: '#E8B4D9' }}>warrior's courage</span> of Mars, the <span style={{ color: '#C5B4E3' }}>creative spotlight</span> of Leo, the <span style={{ color: '#B4D9C5' }}>mystical depths</span> of the 12th house, and the <span style={{ color: '#E8DCC4' }}>structural discipline</span> of Saturn."
          </p>
          
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.8',
            color: '#B4C5E3',
            fontFamily: 'Georgia, serif',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            From analytical systems to spiritual surrender. From backstage service to center stage healing. This is the journey from Aquarius to Leo, from 6th house to 12th—a warrior-healer learning to channel ancestral power through electronic ritual.
          </p>
          
          <div style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: '#C5B4E3',
            opacity: 0.7,
            letterSpacing: '0.2em'
          }}>
            North Node Leo 12° • South Node Aquarius 12° • Mars 6° • Saturn 10°
          </div>
        </motion.div>
      </section>
      
      {/* Discography */}
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
            color="#E8B4D9"
            status="OUT NOW"
          />
          
          <ReleaseCard
            title="Elements EP"
            subtitle="EP • Coming Soon"
            color="#B4D9C5"
            status="SPRING 2026"
          />
          
          <ReleaseCard
            title="Locus"
            subtitle="Album • In Progress"
            color="#C5B4E3"
            status="2027"
          />
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 2,
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(197, 180, 227, 0.2)',
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
            color: '#E8DCC4',
            marginBottom: '1rem',
            fontFamily: '"Space Mono", monospace'
          }}>
            skele.t0l
          </div>
          
          <div style={{
            fontSize: '0.9rem',
            color: '#C5B4E3',
            marginBottom: '2rem',
            letterSpacing: '0.1em'
          }}>
            [ WARRIOR • HEALER • SOUND ]
          </div>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {['Instagram', 'Twitter', 'YouTube', 'Email'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  color: '#B4C5E3',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={e => e.target.style.color = '#E8B4D9'}
                onMouseLeave={e => e.target.style.color = '#B4C5E3'}
              >
                {link}
              </a>
            ))}
          </div>
          
          <div style={{
            fontSize: '0.8rem',
            color: '#C5B4E3',
            opacity: 0.5
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
          color: #F5EFE7;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0A0A0D;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #C5B4E3, #E8B4D9);
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}

// Section Header Component
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
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #C5B4E3, transparent)',
          margin: '0 auto 1rem'
        }}
      />
      
      <div style={{
        fontSize: '0.85rem',
        color: '#C5B4E3',
        letterSpacing: '0.3em',
        marginBottom: '0.5rem'
      }}>
        {subtitle}
      </div>
      
      <h2 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #F5EFE7, #E8B4D9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '0.05em'
      }}>
        {title}
      </h2>
    </motion.div>
  );
}

// NEW: Node Card Component for Lunar Nodes
function NodeCard({ title, subtitle, color, icon, children }) {
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
        background: 'rgba(26, 22, 20, 0.6)',
        border: `2px solid ${isHovered ? color : 'rgba(197, 180, 227, 0.3)'}`,
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
        transition: 'filter 0.3s ease'
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontSize: '1.3rem',
        color: color,
        marginBottom: '0.5rem',
        fontFamily: '"Space Mono", monospace',
        letterSpacing: '0.05em'
      }}>
        {title}
      </h3>
      
      <div style={{
        fontSize: '0.85rem',
        color: '#B4C5E3',
        marginBottom: '1.5rem',
        opacity: 0.8,
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic'
      }}>
        {subtitle}
      </div>
      
      <div style={{
        fontSize: '0.95rem',
        lineHeight: '1.7',
        color: '#B4C5E3',
        fontFamily: 'Georgia, serif'
      }}>
        {children}
      </div>
    </motion.div>
  );
}

// Release Card Component
function ReleaseCard({ title, subtitle, color, status }) {
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
        background: 'rgba(26, 22, 20, 0.6)',
        border: `2px solid ${isHovered ? color : 'rgba(197, 180, 227, 0.3)'}`,
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
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        borderRadius: '6px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${color}40`,
        fontSize: '3rem',
        transition: 'transform 0.3s ease',
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
        color: '#F5EFE7',
        marginBottom: '0.25rem',
        fontFamily: '"Space Mono", monospace'
      }}>
        {title}
      </h3>
      
      <p style={{
        fontSize: '0.9rem',
        color: '#B4C5E3',
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic'
      }}>
        {subtitle}
      </p>
    </motion.div>
  );
}
