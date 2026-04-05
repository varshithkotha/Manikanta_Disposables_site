import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { BUSINESS } from '../../data/constants';

export default function CTA() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hi! I want to place a bulk order. Please share details.`;

  return (
    <section className="cta-section">
      <div className="cta-bg-shape"></div>
      <div className="cta-bg-shape"></div>
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Order in Bulk?</h2>
          <p>
            Get the best wholesale prices on packaging materials, bio-degradable products,
            and disposables. Contact us today for a custom quote!
          </p>
          <div className="cta-buttons">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              id="cta-whatsapp-btn"
            >
              <FaWhatsapp /> Get a Quote on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phones[0].replace(/\s+/g, '')}`}
              className="btn btn-lg"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
              id="cta-call-btn"
            >
              Call Us Now <FiArrowRight />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
