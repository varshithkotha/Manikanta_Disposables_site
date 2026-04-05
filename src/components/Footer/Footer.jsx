import { FaWhatsapp, FaInstagram, FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { FiMapPin, FiMail } from 'react-icons/fi';
import { BUSINESS, NAV_LINKS, CATEGORIES } from '../../data/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hi! I'm interested in your products.`;

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>{BUSINESS.shortName}</h3>
            <p>{BUSINESS.tagline}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              id="footer-whatsapp-btn"
            >
              <FaWhatsapp /> Chat With Us
            </a>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Top Categories</h4>
            <ul>
              {CATEGORIES.slice(0, 6).map((cat, index) => (
                <li key={index}>
                  <a href="#categories" onClick={(e) => handleNavClick(e, '#categories')}>
                    {cat.icon} {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={BUSINESS.googleMapsLink} target="_blank" rel="noopener noreferrer">
                  <FiMapPin /> {BUSINESS.address.split(',')[0]}
                </a>
              </li>
              {BUSINESS.phones.map((phone, idx) => (
                <li key={idx}>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`}>
                    <FaPhoneAlt /> {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${BUSINESS.email}`}>
                  <FiMail /> {BUSINESS.email}
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="footer-social">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
