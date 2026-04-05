import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { BUSINESS } from '../../data/constants';

export default function Hero() {
  const particlesRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    if (particlesRef.current) {
      const container = particlesRef.current;
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${8 + Math.random() * 15}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        container.appendChild(particle);
      }
    }
  }, []);

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hi! I'm interested in your products. Please share details.`;

  const handleScrollToProducts = (e) => {
    e.preventDefault();
    const el = document.getElementById('products');
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg-shapes">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>
      <div className="hero-particles" ref={particlesRef}></div>

      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            🌿 Eco-Friendly & Food-Grade Products
          </div>

          <h1 className="hero-brand">
            Manikanta Disposables <br />
            <span className="hero-brand-secondary">& Bio-Degradables</span>
          </h1>

          <h2 className="hero-title">
            Your One-Stop{' '}
            <span className="highlight">Packaging</span>{' '}
            &{' '}
            <span className="highlight">Disposables</span>{' '}
            Solution
          </h2>

          <p className="hero-description">
            {BUSINESS.description}
          </p>

          <div className="hero-buttons">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              id="hero-whatsapp-btn"
            >
              <FaWhatsapp /> Chat With Us
            </a>
            <button
              className="btn btn-secondary btn-lg"
              onClick={handleScrollToProducts}
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
              id="hero-explore-btn"
            >
              Explore Products <FiArrowRight />
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">28+</div>
              <div className="hero-stat-label">Years Experience</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">1000+</div>
              <div className="hero-stat-label">Happy Clients</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Product Varieties</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="hero-card">
            <div className="hero-card-icon">♻️</div>
            <div className="hero-card-title">Eco-Friendly Solutions</div>
            <div className="hero-card-subtitle">Bio-degradable & sustainable products since 1998</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
