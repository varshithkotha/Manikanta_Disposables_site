import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiEdit2, FiCheck, FiSettings, FiImage } from 'react-icons/fi';
import { fetchProducts, deleteProduct, updateProduct } from '../../data/constants';

export default function ManageProducts({ isOpen, onClose, onRefresh }) {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [tempZoom, setTempZoom] = useState(1);
  const [tempFit, setTempFit] = useState('cover');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadProducts();
    }
  }, [isOpen]);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product and its photo?')) {
      await deleteProduct(id);
      loadProducts();
      if (onRefresh) onRefresh();
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setTempZoom(product.zoom || 1);
    setTempFit(product.fit || 'cover');
  };

  const saveEdit = async () => {
    setIsSaving(true);
    await updateProduct(editingId, { zoom: tempZoom, fit: tempFit });
    setEditingId(null);
    setIsSaving(false);
    loadProducts();
    if (onRefresh) onRefresh();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="add-product-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="manage-products-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-product-header">
              <div>
                <h2>Manage Products</h2>
                <p>Edit image display settings or remove products</p>
              </div>
              <button className="modal-close-btn" onClick={onClose}><FiX size={24} /></button>
            </div>

            <div className="manage-products-list">
              {products.length === 0 ? (
                <div className="manage-empty">No products yet.</div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="manage-item">
                    <div className="manage-item-preview">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{ 
                          objectFit: editingId === product.id ? tempFit : (product.fit || 'cover'),
                          transform: `scale(${editingId === product.id ? tempZoom : (product.zoom || 1)})`
                        }}
                      />
                    </div>
                    
                    <div className="manage-item-info">
                      <h4>{product.name}</h4>
                      {editingId === product.id ? (
                        <div className="manage-item-edit">
                          <label>Zoom Out (Crop Control):</label>
                          <input 
                            type="range" min="0.5" max="1.5" step="0.1" 
                            value={tempZoom} 
                            onChange={(e) => setTempZoom(parseFloat(e.target.value))}
                          />
                          <div className="fit-options">
                            <button 
                              className={`btn btn-xs ${tempFit === 'cover' ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => setTempFit('cover')}
                            >
                              Fill (Cover)
                            </button>
                            <button 
                              className={`btn btn-xs ${tempFit === 'contain' ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => setTempFit('contain')}
                            >
                              Fit (Contain)
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="manage-item-stats">
                          <span>Fit: {product.fit || 'cover'}</span>
                          <span>Zoom: {product.zoom || 1}</span>
                        </div>
                      )}
                    </div>

                    <div className="manage-item-actions">
                      {editingId === product.id ? (
                        <>
                          <button className="btn btn-icon btn-primary" onClick={saveEdit}>
                            {isSaving ? <span className="btn-spinner"></span> : <FiCheck />}
                          </button>
                          <button className="btn btn-icon btn-secondary" onClick={() => setEditingId(null)}><FiX /></button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-icon" onClick={() => startEdit(product)} title="Edit settings"><FiSettings /></button>
                          <button className="btn btn-icon btn-danger" onClick={() => handleDelete(product.id)} title="Delete"><FiTrash2 /></button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
