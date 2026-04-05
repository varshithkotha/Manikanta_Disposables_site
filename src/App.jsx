import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import Categories from './components/Categories/Categories';
import ProductCarousel from './components/ProductCarousel/ProductCarousel';
import About from './components/About/About';
import Services from './components/Services/Services';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import CTA from './components/CTA/CTA';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingButtons from './components/FloatingButtons/FloatingButtons';
import AddProductForm from './components/AddProduct/AddProductForm';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [productRefreshKey, setProductRefreshKey] = useState(0);

  useEffect(() => {
    // Smooth transition between loader and page
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleProductAdded = () => {
    setProductRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Manikanta Disposables</div>
        </div>
      </div>

      <Navbar />
      <main>
        <Hero />
        {/* Swapped order to match navbar and improve flow */}
        <ProductCarousel refreshKey={productRefreshKey} /> 
        <Marquee />
        <Categories />
        <About />
        <Services />
        <WhyChooseUs />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
