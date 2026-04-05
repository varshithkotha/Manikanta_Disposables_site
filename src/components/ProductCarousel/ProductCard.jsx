import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMaximize2, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { BUSINESS } from '../../data/constants';

export default function ProductCard({ product, index, onClick }) {
  const [imgError, setImgError] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} from Manikanta Disposables!`,
      url: window.location.origin + (product.image || ''),
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleWhatsapp = (e) => {
    e.stopPropagation();
    const message = `Hi, I am interested in knowing the quote for: *${product.name}*`;
    const url = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      className="product-card"
      onClick={() => onClick(product)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {product.badge && (
        <span className="product-card-badge">{product.badge}</span>
      )}
      
      <div className="product-card-image">
        <div className="product-card-overlay">
          <div className="product-card-actions">
            <button className="card-action-btn" onClick={handleWhatsapp} title="Request Quote">
              <FaWhatsapp />
            </button>
            <button className="card-action-btn" onClick={handleShare} title="Share Product">
              <FiShare2 />
            </button>
            <button className="card-action-btn">
              <FiMaximize2 className="zoom-icon" size={24} />
            </button>
          </div>
          <span className="overlay-text">View Details</span>
        </div>

        {product.image && !imgError ? (
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: product.fit || 'cover',
              transform: `scale(${product.zoom || 1})`,
              transition: 'opacity 0.4s ease'
            }}
          />
        ) : (
          <span className="product-placeholder-emoji">
            📦
          </span>
        )}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        {product.description && (
          <p className="product-card-desc">{product.description}</p>
        )}
        
        <div className="product-card-footer">
          <button className="btn btn-whatsapp btn-full" onClick={handleWhatsapp}>
            <FaWhatsapp /> Request Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
}
