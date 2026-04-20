import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

const VendorDashboardLayout = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="material-symbols-outlined logo-icon" data-icon="verified_user">verified_user</span>
            WPOMS
          </div>
          <p className="sidebar-subtitle">Vendor Portal</p>
        </div>
        <nav className="sidebar-nav">
          <Link className="nav-item nav-item-active" to="/vendor">
            <span className="material-symbols-outlined nav-icon" data-icon="dashboard">dashboard</span>
            <span className="nav-text">Dashboard</span>
          </Link>
          <Link className="nav-item" to="/vendor/product-catalog">
            <span className="material-symbols-outlined nav-icon" data-icon="inventory_2">inventory_2</span>
            <span className="nav-text">Product Catalog</span>
          </Link>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined nav-icon" data-icon="receipt_long">receipt_long</span>
            <span className="nav-text">My Orders</span>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined nav-icon" data-icon="verified_user">verified_user</span>
            <span className="nav-text">Warranties</span>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined nav-icon" data-icon="local_shipping">local_shipping</span>
            <span className="nav-text">Shipments</span>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined nav-icon" data-icon="payments">payments</span>
            <span className="nav-text">Payments</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-new-entry gold-gradient" type="button">
            <span className="material-symbols-outlined" data-icon="add">add</span>
            New Order
          </button>

          <Link to="/vendor/profile" className="user-profile-link">
            <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#CBD5E1' }}>account_circle</span>
            <div className="user-info">
              <p className="user-name">Rahul Kumar</p>
              <p className="user-role">Vendor</p>
            </div>
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <h1 className="topbar-title">Vendor Dashboard</h1>
          </div>
          <div className="topbar-right"></div>
        </header>

        <div className="dashboard-content">
          <Outlet />
        </div>

        <div className="dashboard-bg-glow"></div>
      </main>
    </div>
  );
};

export default VendorDashboardLayout;
