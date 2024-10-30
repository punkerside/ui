// src/pages/LoginOptions.jsx
import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginOptions = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  // Si el usuario ya está autenticado, redirige al Home automáticamente
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button
        onClick={() => navigate('/login')}
        style={{
          margin: '10px',
          padding: '10px',
          width: '100px',
          backgroundColor: '#20c997', // Color de fondo para Log in
          color: 'white',             // Texto en blanco
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Log in
      </button>
      <span style={{ margin: '1px', fontSize: '13px', color: '#333' }}>or</span> {/* Texto "or" entre los botones */}
      <button
        onClick={() => navigate('/signup')}
        style={{
          margin: '10px',
          padding: '10px',
          width: '100px',
          backgroundColor: '#2c3e50', // Color de fondo para Sign up
          color: 'white',             // Texto en blanco
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Sign up
      </button>
    </div>
  );
};

export default LoginOptions;
