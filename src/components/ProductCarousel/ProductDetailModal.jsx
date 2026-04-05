import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiMessageCircle, FiBox, FiShield, FiTruck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { BUSINESS } from '../../data/constants';

export default function ProductDetailModal({ product, isOpen, onClose }) {
  if (!product) return null;

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hi! I am interested in your product: *${product.name}*. Please provide more details and pricing.`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="product-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="product-modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="product-modal-close" onClick={onClose} aria-label="Close">
              <FiX size={24} />
            </button>

            <div className="product-modal-grid">
              <div className="product-modal-visual">
                <div className="product-modal-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    decoding="async"
                    onLoad={(e) => e.target.style.opacity = 1}
                    style={{
                      transform: `scale(${product.zoom || 1})`,
                      objectFit: product.fit || 'contain',
                      opacity: 0,
                      transition: 'opacity 0.5s ease'
                    }}
                  />
                </div>
              </div>

              <div className="product-modal-info">
                <div className="product-modal-header">
                  <span className="product-modal-badge">
                    {product.category || 'Premium Quality'}
                  </span>
                  <h2 className="product-modal-title">{product.name}</h2>
                </div>

                <div className="product-modal-description">
                  <p>
                    {product.description || `High-quality ${product.name} suitable for hotels, restaurants, and wholesale supply. We ensure superior durability and food-grade standards for all our products.`}
                  </p>
                </div>

                <div className="product-modal-features">
                  <div className="modal-feature">
                    <FiShield className="icon" />
                    <span>Food-Grade Quality</span>
                  </div>
                  <div className="modal-feature">
                    <FiTruck className="icon" />
                    <span>Bulk Delivery Available</span>
                  </div>
                  <div className="modal-feature">
                    <FiBox className="icon" />
                    <span>Eco-Friendly Options</span>
                  </div>
                </div>

                <div className="product-modal-actions">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg btn-full"
                  >
                    <FaWhatsapp /> Get Pricing via WhatsApp
                  </a>
                  <p className="modal-note">* Available in bulk quantities for wholesale supply.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
