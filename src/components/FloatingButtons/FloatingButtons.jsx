import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import { BUSINESS } from '../../data/constants';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hi! I'm interested in your products. Can you help me?`;

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
          aria-label="Chat on WhatsApp"
          id="whatsapp-float-btn"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* Scroll to Top */}
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        id="scroll-top-btn"
      >
        <FiArrowUp />
      </button>
    </>
  );
}
