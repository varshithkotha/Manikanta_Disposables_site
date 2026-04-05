import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX, FiImage, FiCheck, FiTrash2, FiSettings, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { uploadProduct } from '../../data/constants';
import ManageProducts from './ManageProducts';

export default function AddProductForm({ onProductAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState('cover');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size must be less than 10MB');
        return;
      }
      setImageFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setZoom(1); // reset zoom
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter a product name');
      return;
    }
    if (!imageFile) {
      setError('Please upload a product image');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('image', imageFile);
      formData.append('zoom', zoom);
      formData.append('fit', fit);

      await uploadProduct(formData);
      
      setShowSuccess(true);
      setName('');
      setImageFile(null);
      setImagePreview(null);
      setZoom(1);
      if (fileInputRef.current) fileInputRef.current.value = '';

      if (onProductAdded) onProductAdded();

      setTimeout(() => {
        setShowSuccess(false);
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to add product. Make sure the server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setImageFile(null);
    setImagePreview(null);
    setZoom(1);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* Floating Add Button & Manage Button - ONLY visible on localhost (for development/management) */}
      {window.location.hostname === 'localhost' && (
        <div className="add-product-controls">
          <motion.button
            className="add-product-fab manage-fab"
            onClick={() => setIsManageOpen(true)}
            title="Manage Products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSettings size={20} />
          </motion.button>
          
          <motion.button
            className="add-product-fabMain"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add Product"
            id="add-product-fab"
          >
            <FiPlus size={20} />
            <span>Add Product</span>
          </motion.button>
        </div>
      )}

      <ManageProducts 
        isOpen={isManageOpen} 
        onClose={() => setIsManageOpen(false)} 
        onRefresh={onProductAdded} 
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="add-product-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="add-product-modal"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence>
                {showSuccess && (
                  <motion.div className="add-product-success">
                    <div className="success-icon"><FiCheck size={48} /></div>
                    <h3>Product Added!</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showSuccess && (
                <>
                  <div className="add-product-header">
                    <div>
                      <h2>Add New Product</h2>
                      <p>Upload a product photo and name</p>
                    </div>
                    <button className="modal-close-btn" onClick={() => setIsOpen(false)}><FiX size={24} /></button>
                  </div>

                  <form className="add-product-form" onSubmit={handleSubmit}>
                    {error && <div className="form-error">⚠️ {error}</div>}

                    <div className="form-group">
                      <label>Product Name <span className="required">*</span></label>
                      <input
                        type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Premium Bubble Wrap" required maxLength={80}
                      />
                    </div>

                    <div className="form-group">
                      <label>Photo Preview (Zoom & Fit) <span className="required">*</span></label>
                      <div className={`image-upload-area ${imagePreview ? 'has-image' : ''}`} onClick={() => !imagePreview && fileInputRef.current?.click()}>
                        {imagePreview ? (
                          <div className="image-preview-container">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              style={{ transform: `scale(${zoom})`, objectFit: fit }}
                            />
                            <div className="image-preview-controls">
                              <div className="image-zoom-slider">
                                <FiMinimize2 size={14} />
                                <input 
                                  type="range" min="0.5" max="1.5" step="0.1" 
                                  value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <FiMaximize2 size={14} />
                              </div>
                              <div className="image-fit-buttons" onClick={(e) => e.stopPropagation()}>
                                <button type="button" className={`btn btn-xs ${fit === 'cover' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFit('cover')}>Fill</button>
                                <button type="button" className={`btn btn-xs ${fit === 'contain' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFit('contain')}>Fit</button>
                              </div>
                            </div>
                            <button type="button" className="remove-image-btn" onClick={(e) => { e.stopPropagation(); handleReset(); }}><FiTrash2 size={16} /></button>
                          </div>
                        ) : (
                          <div className="image-upload-placeholder">
                            <FiImage size={40} />
                            <span>Click to upload product image</span>
                          </div>
                        )}
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? <span className="btn-loading"><span className="btn-spinner"></span>Uploading...</span> : <><FiPlus /> Add Product</>}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

