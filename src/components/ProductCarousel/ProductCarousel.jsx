import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiPackage } from 'react-icons/fi';
import { fetchProducts } from '../../data/constants';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';

export default function ProductCarousel({ refreshKey }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsAutoPlaying(false);
  };

  // Load products from API
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refreshKey]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  useEffect(() => {
    if (currentSlide >= totalSlides && totalSlides > 0) {
      setCurrentSlide(totalSlides - 1);
    }
  }, [totalSlides, currentSlide]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
    setIsAutoPlaying(false); // Stop autoplay on manual click
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handleNextClick = () => {
    nextSlide();
    setIsAutoPlaying(false); // Stop autoplay on manual click
  };

  const handlePrevClick = () => {
    if (totalSlides <= 1) return;
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false); // Stop autoplay on manual click
  };

  // Auto-play
  useEffect(() => {
    if (totalSlides <= 1 || !isAutoPlaying) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide, totalSlides, isAutoPlaying]);

  // Group products into slides
  const slides = [];
  for (let i = 0; i < products.length; i += itemsPerSlide) {
    slides.push(products.slice(i, i + itemsPerSlide));
  }

  const displayedProducts = showAll ? products : products.slice(0, 3);

  return (
    <section id="products" className="section carousel-section">
      <div className="container">
        <div className="section-header fade-in">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Products
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Quality packaging and disposable solutions for every business need.
          </motion.p>
        </div>

        {products.length === 0 ? (
          <div className="products-empty">
            <div className="products-empty-icon"><FiPackage size={48} /></div>
            <h3>No products added yet</h3>
            <p>Click the <strong>"+ Add Product"</strong> button to start adding products with their photos.</p>
          </div>
        ) : (
          <div className="carousel-container">
            {/* Mobile View - Limited to 3 + View All */}
            <div className="mobile-product-grid">
              {displayedProducts.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  product={product}
                  index={index}
                  onClick={() => openModal(product)}
                />
              ))}
              
              {!showAll && products.length > 3 && (
                <div className="view-all-container">
                  <button className="btn btn-secondary btn-full" onClick={() => setShowAll(true)}>
                    View All Products
                  </button>
                </div>
              )}

              {showAll && (
                <div className="view-all-container">
                  <button className="btn btn-secondary btn-full" onClick={() => setShowAll(false)}>
                    Show Less
                  </button>
                </div>
              )}
            </div>

            {/* Desktop/Tablet Carousel View */}
            <div className="desktop-carousel-view">
              <div className="carousel-wrapper">
                <div className="carousel-track-container">
                  <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {slides.map((slideProducts, slideIndex) => (
                      <div key={slideIndex} className="carousel-slide">
                        <div className="carousel-slide-inner">
                          {slideProducts.map((product, productIndex) => (
                            <ProductCard 
                              key={product.id || productIndex} 
                              product={product} 
                              index={productIndex} 
                              onClick={() => openModal(product)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {totalSlides > 1 && (
                  <div className="carousel-controls">
                    <button
                      className="carousel-btn"
                      onClick={handlePrevClick}
                      aria-label="Previous slide"
                      id="carousel-prev"
                    >
                      <FiChevronLeft />
                    </button>

                    <div className="carousel-dots">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                          onClick={() => goToSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      className="carousel-btn"
                      onClick={handleNextClick}
                      aria-label="Next slide"
                      id="carousel-next"
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
