import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';
import { LogoWithoutSubtitle as Logo } from '../../components/logo/Logo';

const ManufacturerDashboardLayout = () => {

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Logo />
        </div>
        <nav className="sidebar-nav">
          <Link className="nav-item nav-item-active" to="/manufacturer">
            <span className="material-symbols-outlined nav-icon" data-icon="dashboard">dashboard</span>
            <span className="nav-text">Dashboard</span>
          </Link>
          <Link className="nav-item" to="/manufacturer/product-catalog">
            <span className="material-symbols-outlined nav-icon" data-icon="inventory_2">inventory_2</span>
            <span className="nav-text">Product Catalog</span>
          </Link>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined nav-icon" data-icon="verified_user">verified_user</span>
            <span className="nav-text">Warranties</span>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined nav-icon" data-icon="shopping_cart">shopping_cart</span>
            <span className="nav-text">Purchase Orders</span>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined nav-icon" data-icon="inventory_2">inventory_2</span>
            <span className="nav-text">Archive</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <Link to="/manufacturer/profile" className="user-profile-link">
            <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#CBD5E1' }}>account_circle</span>
            <div className="user-info">
              <p className="user-name">Alexander Cole</p>
              <p className="user-role">Manufacturer</p>
            </div>
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <h1 className="topbar-title">Manufacturer Dashboard</h1>
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

export default ManufacturerDashboardLayout;
