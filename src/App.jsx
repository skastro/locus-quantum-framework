import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Quantum Particle Background Component
const QuantumParticles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 150;
    const colors = ['#9D4EDD', '#FF006E', '#00F5FF', '#06FFA5'];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
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
      
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.strokeStyle = '#9D4EDD';
            ctx.globalAlpha = (1 - distance / 150) * 0.15;
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

// Orbital Ring Component
const OrbitalRing = ({ radius, particles, color, delay = 0 }) => {
  const particleElements = [];
  
  for (let i = 0; i < particles; i++) {
    const angle = (360 / particles) * i;
    particleElements.push(
      <motion.div
        key={i}
        className="orbital-particle"
        initial={{ rotate: angle }}
        animate={{ rotate: angle + 360 }}
        transition={{
          duration: 20 + radius / 10,
          repeat: Infinity,
          ease: "linear",
          delay: delay + i * 0.1
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            marginLeft: `${radius}px`,
            marginTop: '-4px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
          }}
        />
      </motion.div>
    );
  }
  
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      {particleElements}
    </div>
  );
};

// Main Website Component
export default function LocusWebsite() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  return (
    <div style={{
      background: '#0A0A0D',
      color: '#F0F4FF',
      minHeight: '100vh',
      fontFamily: '"Space Mono", monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <QuantumParticles />
      
      {/* Scanline Effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 245, 255, 0.03) 3px, rgba(0, 245, 255, 0.03) 6px)',
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
        {/* Logo with Orbital System */}
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          <div style={{
            position: 'relative',
            width: '400px',
            height: '200px'
          }}>
            <OrbitalRing radius={120} particles={5} color="#9D4EDD" delay={0} />
            <OrbitalRing radius={160} particles={7} color="#00F5FF" delay={0.5} />
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: 'relative',
                zIndex: 3,
                fontSize: '5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                margin: 0,
                background: 'linear-gradient(135deg, #F0F4FF 0%, #00F5FF 50%, #9D4EDD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(157, 78, 221, 0.5)',
                letterSpacing: '0.1em',
                lineHeight: '200px'
              }}
            >
              LOCUS
            </motion.h1>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            textAlign: 'center',
            maxWidth: '800px'
          }}
        >
          <div style={{
            fontSize: '1.2rem',
            color: '#00F5FF',
            marginBottom: '1.5rem',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.15em'
          }}>
            [ QUANTUM FRAMEWORK INITIALIZED ]
          </div>
          
          <p style={{
            fontSize: '1.3rem',
            lineHeight: '1.8',
            color: '#B4C5E3',
            marginBottom: '2rem',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Skeletal cartography for the self. A modular healing framework built from the intersection of vulnerability and structure.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 245, 255, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 3rem',
              fontSize: '1.1rem',
              background: 'transparent',
              border: '2px solid #00F5FF',
              color: '#00F5FF',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease'
            }}
          >
            BEGIN CALIBRATION
          </motion.button>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            fontSize: '2rem',
            color: '#9D4EDD',
            opacity: 0.6
          }}
        >
          ↓
        </motion.div>
      </motion.section>
      
      {/* About Section */}
      <Section
        title="THE FRAMEWORK"
        subtitle="[ STRUCTURAL INTEGRITY ]"
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <QuantumCard
            icon="⚛️"
            title="MODULAR HEALING"
            color="#9D4EDD"
            delay={0}
          >
            Build your framework one frac.t0l at a time. Each module is functional alone and as part of larger assemblies.
          </QuantumCard>
          
          <QuantumCard
            icon="🔬"
            title="FOUR ELEMENTS"
            color="#00F5FF"
            delay={0.2}
          >
            Physical Life, Emotional Life, Mental Life, Spiritual Life. Elemental domains mapped to concrete systems.
          </QuantumCard>
          
          <QuantumCard
            icon="🧬"
            title="SKELETAL STRUCTURE"
            color="#06FFA5"
            delay={0.4}
          >
            Expose the framework. See the architecture. Rebuild with intention, transparency, and systematic care.
          </QuantumCard>
        </div>
      </Section>
      
      {/* Core Principles */}
      <Section
        title="CORE PRINCIPLES"
        subtitle="[ FOUNDATIONAL AXIOMS ]"
      >
        <div style={{
          maxWidth: '900px',
          margin: '3rem auto'
        }}>
          <PrincipleItem
            number="01"
            title="To thine own self be true"
            color="#9D4EDD"
          >
            Authenticity as the foundation of wellbeing. Align internal values with external expression.
          </PrincipleItem>
          
          <PrincipleItem
            number="02"
            title="Quantum superposition of self"
            color="#00F5FF"
          >
            Multiple valid states exist simultaneously. Integration over elimination.
          </PrincipleItem>
          
          <PrincipleItem
            number="03"
            title="Systematic reconstruction"
            color="#FF006E"
          >
            Healing requires framework. Structure enables growth. Maps guide navigation.
          </PrincipleItem>
        </div>
      </Section>
      
      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 2,
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(157, 78, 221, 0.3)'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div style={{
            fontSize: '2rem',
            color: '#FFD60A',
            marginBottom: '1rem',
            fontFamily: '"Space Mono", monospace'
          }}>
            skele.t0l
          </div>
          
          <div style={{
            fontSize: '0.9rem',
            color: '#9D4EDD',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.1em'
          }}>
            [ ψ(x,t) ] • FRAMEWORK v1.0 • [ ENTANGLED ]
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
          background: rgba(0, 245, 255, 0.3);
          color: #F0F4FF;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0A0A0D;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #9D4EDD, #00F5FF);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00F5FF, #9D4EDD);
        }
      `}</style>
    </div>
  );
}

// Section Component
function Section({ title, subtitle, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '6rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '100px' } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)',
            margin: '0 auto 1rem'
          }}
        />
        
        <div style={{
          fontSize: '0.9rem',
          color: '#00F5FF',
          letterSpacing: '0.2em',
          marginBottom: '0.5rem',
          fontFamily: '"Space Mono", monospace'
        }}>
          {subtitle}
        </div>
        
        <h2 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #F0F4FF, #9D4EDD)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.05em'
        }}>
          {title}
        </h2>
      </div>
      
      {children}
    </motion.section>
  );
}

// Quantum Card Component
function QuantumCard({ icon, title, color, children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: 'rgba(26, 22, 20, 0.6)',
        border: `2px solid ${isHovered ? color : 'rgba(157, 78, 221, 0.3)'}`,
        borderRadius: '8px',
        padding: '2rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        boxShadow: isHovered ? `0 0 30px ${color}40` : 'none',
        backdropFilter: 'blur(10px)'
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
        marginBottom: '1rem',
        fontFamily: '"Space Mono", monospace',
        letterSpacing: '0.05em'
      }}>
        {title}
      </h3>
      
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.7',
        color: '#B4C5E3',
        fontFamily: 'Georgia, serif'
      }}>
        {children}
      </p>
    </motion.div>
  );
}

// Principle Item Component
function PrincipleItem({ number, title, color, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        gap: '2rem',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'rgba(26, 22, 20, 0.4)',
        borderLeft: `4px solid ${color}`,
        borderRadius: '4px',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: color,
        opacity: 0.3,
        fontFamily: '"Space Mono", monospace',
        minWidth: '80px'
      }}>
        {number}
      </div>
      
      <div>
        <h3 style={{
          fontSize: '1.5rem',
          color: '#F0F4FF',
          marginBottom: '0.5rem',
          fontFamily: '"Space Mono", monospace'
        }}>
          {title}
        </h3>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: '#B4C5E3',
          fontFamily: 'Georgia, serif'
        }}>
          {children}
        </p>
      </div>
    </motion.div>
  );
}
