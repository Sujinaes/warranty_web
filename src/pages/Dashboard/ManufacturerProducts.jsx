import React, { useEffect, useState } from 'react';

const defaultProducts = [
  {
    id: 'PR001',
    name: 'Heritage Chronograph',
    category: 'Horology',
    price: '$4,250.00',
    warranty: 'Manufacturer Lifetime',
    description: 'A precision chronograph with sapphire crystal and artisanal finishing.',
  },
  {
    id: 'PR002',
    name: 'Athenian Marble Desk',
    category: 'Furniture',
    price: '$12,800.00',
    warranty: '5-Year Structural',
    description: 'A custom marbled executive desk with solid brass inlays.',
  },
  {
    id: 'PR003',
    name: 'Onyx Fountain Pen',
    category: 'Stationery',
    price: '$850.00',
    warranty: 'Limited 2-Year',
    description: 'A handcrafted fountain pen with onyx barrel and 18k nib.',
  },
];

const ManufacturerProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    warranty: '',
    description: '',
  });

  const loadProducts = () => {
    const saved = window.localStorage.getItem('wpomsProducts');
    setProducts(saved ? JSON.parse(saved) : defaultProducts);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    loadProducts();
    const interval = setInterval(loadProducts, 1000);
    return () => clearInterval(interval);
  }, []);

  const openEditModal = (product) => {
    setEditProduct({ ...product });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditProduct(null);
    showToast('Edit cancelled');
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditProduct((current) => ({ ...current, [name]: value }));
  };

  const handleUpdateClick = () => {
    if (!editProduct.name.trim()) return;
    setShowConfirm(true);
    setPendingUpdate(editProduct);
  };

  const confirmUpdate = () => {
    const updatedProducts = products.map((p) =>
      p.id === pendingUpdate.id ? pendingUpdate : p
    );
    setProducts(updatedProducts);
    window.localStorage.setItem('wpomsProducts', JSON.stringify(updatedProducts));
    setShowConfirm(false);
    setEditModalOpen(false);
    setEditProduct(null);
    setPendingUpdate(null);
    showToast('Product updated successfully');
  };

  const cancelUpdate = () => {
    setShowConfirm(false);
    setPendingUpdate(null);
  };

  const openAddModal = () => setAddModalOpen(true);

  const closeAddModal = () => {
    setAddModalOpen(false);
    setNewProduct({ name: '', category: '', price: '', warranty: '', description: '' });
  };

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((current) => ({ ...current, [name]: value }));
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    if (!newProduct.name.trim()) {
      return;
    }

    const nextId = `PR${String(Date.now()).slice(-6)}`;
    const updatedProducts = [
      ...products,
      { id: nextId, ...newProduct },
    ];
    setProducts(updatedProducts);
    window.localStorage.setItem('wpomsProducts', JSON.stringify(updatedProducts));
    closeAddModal();
    showToast('Product added successfully');
  };

  return (
    <div className="product-page">
      <div className="product-page-header">
        <div>
          <h2>Product Catalog</h2>
          <p>Products added by this manufacturer.</p>
        </div>
        <button className="btn-add-product" onClick={openAddModal}>
          <span className="material-symbols-outlined">add</span>
          Add New Product
        </button>
      </div>

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Warranty Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="product-id">{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.warranty}</td>
                  <td className="description-cell">{product.description}</td>
                  <td className="actions-cell">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => openEditModal(product)}
                      title="Edit"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      className="action-btn delete-btn"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-row">
                  No products have been added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && editProduct && (
        <div className="product-modal-overlay" role="dialog" aria-modal="true" onClick={closeEditModal}>
          <div className="product-modal" onClick={(event) => event.stopPropagation()}>
            <div className="product-modal-header">
              <div>
                <p className="modal-subtitle">Update Product</p>
                <h2>Edit Product Details</h2>
              </div>
              <button className="modal-close-button" type="button" onClick={closeEditModal} aria-label="Close modal">
                ×
              </button>
            </div>
            <form className="product-form" onSubmit={(e) => { e.preventDefault(); handleUpdateClick(); }}>
              <div className="product-grid">
                <label className="product-field">
                  <span>Product Name</span>
                  <input
                    type="text"
                    name="name"
                    value={editProduct.name}
                    onChange={handleEditChange}
                   
                    required
                  />
                </label>
                <label className="product-field">
                  <span>Category</span>
                  <input
                    type="text"
                    name="category"
                    value={editProduct.category}
                    onChange={handleEditChange}
                  
                    required
                  />
                </label>
                <label className="product-field">
                  <span> Price</span>
                  <input
                    type="text"
                    name="price"
                    value={editProduct.price}
                    onChange={handleEditChange}
                   
                    required
                  />
                </label>
                <label className="product-field">
                  <span>Warranty Type</span>
                  <input
                    type="text"
                    name="warranty"
                    value={editProduct.warranty}
                    onChange={handleEditChange}
                  
                    required
                  />
                </label>
              </div>
              <label className="product-field product-field-full">
                <span>Product Description</span>
                <textarea
                  name="description"
                  value={editProduct.description}
                  onChange={handleEditChange}
                
                  rows={5}
                />
              </label>
              <div className="modal-actions">
                <button className="modal-button modal-button-secondary" type="button" onClick={closeEditModal}>
                  Cancel
                </button>
                <button className="modal-button modal-button-primary" type="submit">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="confirm-overlay" onClick={cancelUpdate}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure?</h3>
            <p>Do you want to update this product?</p>
            <div className="confirm-actions">
              <button className="confirm-btn cancel-btn" onClick={cancelUpdate}>
                No
              </button>
              <button className="confirm-btn confirm-btn-primary" onClick={confirmUpdate}>
                Yes, Update
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="product-modal-overlay" role="dialog" aria-modal="true" onClick={closeAddModal}>
          <div className="product-modal" onClick={(event) => event.stopPropagation()}>
            <div className="product-modal-header">
              <div>
                <p className="modal-subtitle"></p>
                <h2>Add Products</h2>
              </div>
              <button className="modal-close-button" type="button" onClick={closeAddModal} aria-label="Close modal">
                ×
              </button>
            </div>
            <form className="product-form" onSubmit={handleAddSubmit}>
              <div className="product-grid">
                <label className="product-field">
                  <span>Product Name</span>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleAddChange}
                 
                    required
                  />
                </label>
                <label className="product-field">
                  <span>Category</span>
                  <input
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleAddChange}
                   
                    required
                  />
                </label>
                <label className="product-field">
                  <span>Price</span>
                  <input
                    type="text"
                    name="price"
                    value={newProduct.price}
                    onChange={handleAddChange}
                   
                    required
                  />
                </label>
                <label className="product-field">
                  <span>Warranty Type</span>
                  <input
                    type="text"
                    name="warranty"
                    value={newProduct.warranty}
                    onChange={handleAddChange}
                   
                    required
                  />
                </label>
              </div>
              <label className="product-field product-field-full">
                <span>Product Description</span>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleAddChange}

                  rows={5}
                />
              </label>
              <div className="modal-actions">
                <button className="modal-button modal-button-secondary" type="button" onClick={closeAddModal}>
                  Cancel
                </button>
                <button className="modal-button modal-button-primary" type="submit">
                  Add to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ManufacturerProducts;