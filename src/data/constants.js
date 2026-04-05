// ============================================
// BUSINESS DATA & CONSTANTS
// ============================================

export const BUSINESS = {
  name: "Manikanta Disposables & Bio-Degradables",
  shortName: "Manikanta Disposables",
  parentFirm: "", 
  proprietor: "Kotha Santhosh Kumar",
  tagline: "Your One-Stop Destination for Premium Packaging & Eco-Friendly Disposables",
  description: "We are a leading supplier of high-quality packaging materials, bio-degradable products, and food-grade disposables. From hotel & restaurant supplies to international food packing solutions — we deliver it all with quality and reliability.",
  
  // Contact Details
  phones: ["+91 9989808319", "+91 9246917405"],
  whatsapp: "919246917405",
  email: "manikantadisposables@gmail.com", 
  address: "Narsapur x rd to Vysya bhavan rd 1-1-129, Siddipet, Telangana 502103",
  googleMapsLink: "https://maps.app.goo.gl/3QRrY733wewXKqy78",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const CATEGORIES = [
  {
    icon: "🍽️",
    title: "Hotel & Restaurant Supplies",
    description: "Premium food-grade packing materials for hotels, restaurants, and catering businesses.",
  },
  {
    icon: "🌿",
    title: "Bio-Degradable Products",
    description: "Eco-friendly disposables including bio carry bags, wooden cutlery, and clay cups.",
  },
  {
    icon: "📦",
    title: "Packaging Materials",
    description: "Complete packaging solutions — bubble wrap, plastic wrap, standing pouches, and more.",
  },
  {
    icon: "🎉",
    title: "Party & Event Supplies",
    description: "Fancy bio utensils, designer cups, glasses, and accessories for parties & functions.",
  },
  {
    icon: "🏠",
    title: "Home Food Packing",
    description: "Safe & hygienic packing materials for home-cooked foods and online food delivery.",
  },
  {
    icon: "✈️",
    title: "International Food Packing",
    description: "Specialized packing solutions for shipping food materials to foreign countries.",
  },
  {
    icon: "🧹",
    title: "Mops, Brooms & Dusters",
    description: "High-quality cleaning supplies including mops, brooms, wipers, and dusters for every need.",
  },
  {
    icon: "🛍️",
    title: "Bio-Degradable Carry Bags",
    description: "Eco-friendly, 100% biodegradable carry bags in all sizes — strong, durable, and planet-friendly.",
  },
];

import staticProducts from './products.json';

// API endpoint for products
const API_BASE = 'http://localhost:3002';

export async function fetchProducts() {
  try {
    // Try to fetch from API first (for live updates in dev)
    const res = await fetch(`${API_BASE}/api/products`);
    if (res.ok) {
      const data = await res.json();
      return data && data.length > 0 ? data : staticProducts;
    }
  } catch (e) {
    // Silently fall back to static data if server is not running
  }
  return staticProducts;
}

export async function uploadProduct(formData) {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      body: formData, 
    });
    if (res.ok) {
      return await res.json();
    }
    const err = await res.json();
    throw new Error(err.error || 'Upload failed');
  } catch (e) {
    console.error('Error uploading product:', e);
    throw e;
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (e) {
    console.error('Error deleting product:', e);
    return false;
  }
}

export async function updateProduct(id, data) {
  try {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error('Error updating product:', e);
  }
  return null;
}

export const SERVICES = [
  {
    icon: "🚚",
    title: "Wholesale & Bulk Delivery",
    description: "Direct wholesale suppliers providing reliable and timely delivery of bulk orders right to your doorstep.",
  },
  {
    icon: "🌍",
    title: "International Food Packing",
    description: "Expert packing services for shipping food materials overseas, ensuring freshness and compliance with international standards.",
  },
  {
    icon: "🎯",
    title: "Custom Orders",
    description: "Tailored packaging solutions designed to meet your specific business requirements and branding needs.",
  },
];

export const WHY_CHOOSE_US = [
  {
    number: "28+",
    title: "Years Experience",
    description: "Since 1998 — Decades of trusted expertise in selling high-quality disposables",
  },
  {
    number: "Siddipet",
    title: "Famous Locally",
    description: "A well-renowned and trusted name across the entire Siddipet district",
  },
  {
    number: "Best",
    title: "Quality Variety",
    description: "We provide all new varieties and maintain the highest quality standards",
  },
  {
    number: "Fair",
    title: "Efficient Pricing",
    description: "We sell at reasonable and efficient prices to support your business",
  },
];

export const ABOUT_FEATURES = [
  { icon: "✅", text: "Food-Grade Certified" },
  { icon: "🌿", text: "Eco-Friendly Options" },
  { icon: "📦", text: "Bulk Discounts" },
  { icon: "🚀", text: "Fast Delivery" },
  { icon: "💯", text: "Quality Assured" },
  { icon: "🤝", text: "B2B Partnerships" },
];

export const MARQUEE_ITEMS = [
  "Bubble Wrap",
  "Bio Carry Bags",
  "Clay Cups",
  "Thali Boxes",
  "Standing Pouches",
  "Wooden Spoons",
  "Cling Wraps",
  "Aluminium Foils",
  "Tissue Papers",
  "Thick Shake Glasses",
  "Hotel Supplies",
  "International Packing",
  "Mops & Brooms",
  "Wipers & Dusters",
  "Bio-Degradable Bags",
];

export const PRODUCT_CATEGORIES = [
  "Packaging",
  "Eco-Friendly",
  "Disposables",
  "Food Grade",
  "Essentials",
  "Beverages",
  "Traditional",
  "Party",
  "Specialty",
  "Cleaning",
  "General",
];
