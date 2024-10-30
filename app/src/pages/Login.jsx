// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const session = await login(username, password);
      console.log('Inicio de sesión exitoso:', session);

      // Cambia el estado de autenticación y redirige al Home
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error en inicio de sesión');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '200px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '200px' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin} style={{ margin: '10px', padding: '10px', width: '100px' }}>
        Log in
      </button>
    </div>
  );
};

export default Login;
