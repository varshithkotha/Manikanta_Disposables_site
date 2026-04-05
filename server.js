import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Ensure directories exist
const productsDir = path.join(__dirname, 'public', 'products');
const dataDir = path.join(__dirname, 'src', 'data');
const productsJsonPath = path.join(dataDir, 'products.json');

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Initialize products.json if it doesn't exist
if (!fs.existsSync(productsJsonPath)) {
  fs.writeFileSync(productsJsonPath, JSON.stringify([], null, 2));
}

app.use(cors());
app.use(express.json());

// Serve product images statically
app.use('/product-images', express.static(productsDir));

// Multer config for product image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productsDir);
  },
  filename: (req, file, cb) => {
    // Clean filename: timestamp + sanitized original name
    const ext = path.extname(file.originalname);
    const baseName = file.originalname
      .replace(ext, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
    }
  },
});

// GET - List all products
app.get('/api/products', (req, res) => {
  try {
    const data = fs.readFileSync(productsJsonPath, 'utf-8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    res.json([]);
  }
});

// POST - Add a new product with image
app.post('/api/products', upload.single('image'), (req, res) => {
  try {
    const { name, zoom, fit } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ error: 'Name and Image are required' });
    }

    const data = fs.readFileSync(productsJsonPath, 'utf-8');
    const products = JSON.parse(data);

    const newProduct = {
      id: Date.now().toString(),
      name,
      image: `/products/${req.file.filename}`,
      zoom: zoom ? parseFloat(zoom) : 1,
      fit: fit || 'cover',
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2));

    res.json({ success: true, product: newProduct });
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(500).json({ error: 'Failed to save product data.' });
  }
});

// DELETE - Remove a product
app.delete('/api/products/:id', (req, res) => {
  try {
    const data = fs.readFileSync(productsJsonPath, 'utf-8');
    let products = JSON.parse(data);
    const product = products.find(p => p.id === req.params.id);

    if (product && product.filename) {
      const filePath = path.join(productsDir, product.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    products = products.filter(p => p.id !== req.params.id);
    fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2));

    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

// PUT - Update a product
app.put('/api/products/:id', (req, res) => {
  try {
    const { zoom, fit, name } = req.body;
    const data = fs.readFileSync(productsJsonPath, 'utf-8');
    let products = JSON.parse(data);
    const index = products.findIndex(p => p.id === req.params.id);

    if (index !== -1) {
      products[index] = {
        ...products[index],
        name: name || products[index].name,
        zoom: zoom !== undefined ? zoom : products[index].zoom,
        fit: fit || products[index].fit,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2));
      res.json({ success: true, product: products[index] });
    } else {
      res.status(404).json({ error: 'Product not found.' });
    }
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product.' });
  }
});

app.listen(PORT, () => {
  console.log(`📦 Product API server running at http://localhost:${PORT}`);
  console.log(`   Images saved to: ${productsDir}`);
});
