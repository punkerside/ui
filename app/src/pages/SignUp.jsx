// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { signUp } from '../auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const attributes = [{ Name: 'name', Value: name }, { Name: 'email', Value: email }];
      const result = await signUp(email, password, attributes);
      console.log('Registro exitoso:', result);
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión después de registrarse
    } catch (err) {
      setError(err.message || 'Error en el registro');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '200px' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '200px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '200px' }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '200px' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignUp} style={{ margin: '10px', padding: '10px', width: '100px' }}>
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
