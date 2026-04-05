import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { NAV_LINKS, BUSINESS } from '../../data/constants';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 100;
      const ids = NAV_LINKS.map(l => l.href.replace('#', ''));
      
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hi! I am interested in your products.`;

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [mobileOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
          <div className="navbar-logo-icon">MD</div>
          <div className="navbar-logo-text">
            <span>{BUSINESS.shortName}</span>
          </div>
        </a>

        <div className="navbar-links">
          {NAV_LINKS.map(link => {
            const id = link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={activeSection === id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ position: 'relative' }}
              >
                {link.label}
                {activeSection === id && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '20%',
                    right: '20%',
                    height: '2px',
                    background: 'var(--color-primary)',
                    borderRadius: '2px'
                  }} />
                )}
              </a>
            );
          })}
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp navbar-whatsapp-btn"
          >
            <FaWhatsapp size={18} /> 
            <span className="navbar-btn-text">WhatsApp</span>
          </a>

          <button
            className={`mobile-menu-btn ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top-bar">
            <button 
              className="mobile-back-link" 
              onClick={() => setMobileOpen(false)}
            >
              <FiArrowLeft size={20} /> BACK
            </button>
            <a 
              href="#home" 
              className="mobile-home-link"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              HOME
            </a>
          </div>
          
          <div className="mobile-nav-list">
            <a 
              href="#products" 
              onClick={(e) => handleNavClick(e, '#products')}
              className={`mobile-nav-item ${activeSection === 'products' ? 'active' : ''}`}
            >
              PRODUCTS
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, '#about')}
              className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
            >
              ABOUT US
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
            >
              CONTACT
            </a>
          </div>

          <div className="mobile-menu-cta-wrap">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg btn-full"
            >
              <FaWhatsapp /> CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
