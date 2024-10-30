// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaCog, FaServicestack, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; // Importación del archivo CSS
import userPool from '../cognitoConfig'; // Importa el User Pool de Cognito

const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut(); // Cierra la sesión en Cognito
    }
    setIsAuthenticated(false); // Actualiza el estado de autenticación en el componente principal
    navigate('/login-options'); // Redirige a la página de opciones de login
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/services', label: 'Services', icon: <FaServicestack /> },
  ];

  const settingsItems = [
    { path: '/theme', label: 'Theme', icon: <FaCog /> },
  ];

  const isActive = (path) => location.pathname === path ? 'active-menu-item' : '';

  return (
    <div style={{
      width: '250px',
      backgroundColor: '#333',
      color: 'white',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px 0',
    }}>
      <div>
        <div style={{ padding: '0 20px', color: '#b0b0b0', fontSize: '14px', marginBottom: '10px' }}>Manage</div>
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`menu-item ${isActive(item.path)}`}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              marginBottom: '10px',
              cursor: 'pointer',
              borderRadius: '8px',
            }}
          >
            {item.icon}
            <span style={{ marginLeft: '10px' }}>{item.label}</span>
          </div>
        ))}
        <div style={{ padding: '0 20px', color: '#b0b0b0', fontSize: '14px', marginBottom: '10px' }}>Settings</div>
        {settingsItems.map((item) => (
          <div
            key={item.path}
            className={`menu-item ${isActive(item.path)}`}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              marginBottom: '10px',
              cursor: 'pointer',
              borderRadius: '8px',
            }}
          >
            {item.icon}
            <span style={{ marginLeft: '10px' }}>{item.label}</span>
          </div>
        ))}
      </div>
      <div
        onClick={handleLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 20px',
          cursor: 'pointer',
          color: '#20c997',
        }}
      >
        <FaSignOutAlt />
        <span style={{ marginLeft: '10px' }}>Log out</span>
      </div>
    </div>
  );
};

export default Sidebar;
