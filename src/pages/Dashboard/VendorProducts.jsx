import React, { useEffect, useState } from 'react';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    const saved = window.localStorage.getItem('wpomsProducts');
    setProducts(saved ? JSON.parse(saved) : []);
  };

  useEffect(() => {
    loadProducts();
    const interval = setInterval(loadProducts, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="product-page">
      <div className="product-page-header">
        <div>
          <h2>Product Catalog</h2>
          <p>All products added by manufacturers for vendor review.</p>
        </div>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-row">
                  No manufacturer products are available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorProducts;