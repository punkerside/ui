// src/pages/LoginOptions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginOptions = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button onClick={() => navigate('/login')} style={{ margin: '10px', padding: '10px', width: '100px' }}>
        Log in
      </button>
      <button onClick={() => alert('Sign up functionality goes here')} style={{ margin: '10px', padding: '10px', width: '100px' }}>
        Sign up
      </button>
    </div>
  );
};

export default LoginOptions;
