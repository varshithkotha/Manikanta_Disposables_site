import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight, FiExternalLink } from 'react-icons/fi';
import { BUSINESS } from '../../data/constants';

export default function Contact() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hi! I'd like to inquire about your products.`;

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          We'd love to hear from you. Reach out via WhatsApp for the fastest response!
        </motion.p>

        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-info-section">
            <h3 className="contact-heading">
              Let's <span>Connect</span>
            </h3>
            <p className="contact-intro">
              Whether you need bulk packaging materials, bio-degradable products, or
              international food packing services — we're just a message away.
            </p>
          </div>

          <div className="contact-cards-grid">
            <motion.div 
              className="contact-detail"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="contact-detail-icon">
                <FiMapPin />
              </div>
              <div className="contact-detail-text">
                <h4>Visit Us</h4>
                <p><strong>{BUSINESS.address}</strong></p>
                <a 
                  href={BUSINESS.googleMapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  📍 Open in Maps <FiExternalLink size={14} />
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="contact-detail"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="contact-detail-icon">
                <FiPhone />
              </div>
              <div className="contact-detail-text">
                <h4>Call Us</h4>
                <div style={{ marginTop: '0.5rem' }}>
                  {BUSINESS.phones.map((phone, idx) => (
                    <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} style={{ display: 'block', fontSize: '1.1rem', fontWeight: '600' }}>
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="contact-detail"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="contact-detail-icon">
                <FiMail />
              </div>
              <div className="contact-detail-text">
                <h4>Email Us</h4>
                <p>Reach us anytime at:</p>
                <a href={`mailto:${BUSINESS.email}`} style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                  {BUSINESS.email}
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="contact-detail"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="contact-detail-icon">
                <FiClock />
              </div>
              <div className="contact-detail-text">
                <h4>Business Hours</h4>
                <div style={{ marginTop: '0.5rem' }}>
                  <p><strong>Mon - Sat:</strong> 9:00 AM - 9:00 PM</p>
                  <p><strong>Sunday:</strong> 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="contact-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              id="contact-whatsapp-btn"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phones[0].replace(/\s+/g, '')}`}
              className="btn btn-secondary btn-lg"
            >
              <FaPhoneAlt /> Call Now
            </a>
            <a
              href={BUSINESS.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              <FiMapPin /> Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
