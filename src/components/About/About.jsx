import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { BUSINESS, ABOUT_FEATURES } from '../../data/constants';

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-card">
              <span className="about-card-icon">🏢</span>
              <h3 className="about-card-title">{BUSINESS.shortName}</h3>
              <p className="about-card-text">
                Serving businesses with premium packaging &
                eco-friendly disposable solutions. A trusted name in the industry for
                quality and reliability.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="about-info"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>
              About <span>Our Firm</span>
            </h2>
            <p>
              <strong>{BUSINESS.name}</strong> is a renowned name in the packaging and
              disposables industry. We are committed to providing the highest quality products at competitive prices.
            </p>
            <p>
              We supply a comprehensive range of packaging materials — from bubble wraps and
              tapes to bio-degradable cutlery and clay cups. We serve hotels, restaurants,
              catering services, online food businesses, and even offer specialized international
              food packing services. Whatever your packaging need, we have the perfect solution.
            </p>

            <div className="about-features">
              {ABOUT_FEATURES.map((feature, index) => (
                <div key={index} className="about-feature">
                  <div className="about-feature-icon">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="proprietor-card">
              <div className="proprietor-avatar">KS</div>
              <div className="proprietor-info">
                <h4>{BUSINESS.proprietor}</h4>
                <p>Proprietor</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
