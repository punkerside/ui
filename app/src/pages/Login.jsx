import React, { useState } from 'react';
import { login, signUp } from '../auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const session = await login(username, password);
      console.log('Inicio de sesión exitoso:', session);
    } catch (err) {
      setError(err.message || 'Error en inicio de sesión');
    }
  };

  const handleSignUp = async () => {
    try {
      const result = await signUp(username, password);
      console.log('Registro exitoso:', result);
    } catch (err) {
      setError(err.message || 'Error en el registro');
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
      {isLogin ? (
        <button onClick={handleLogin} style={{ margin: '10px', padding: '10px', width: '100px' }}>Log in</button>
      ) : (
        <button onClick={handleSignUp} style={{ margin: '10px', padding: '10px', width: '100px' }}>Sign up</button>
      )}
      <button onClick={() => setIsLogin(!isLogin)} style={{ margin: '10px', padding: '10px', width: '100px' }}>
        {isLogin ? 'Sign up' : 'Log in'}
      </button>
    </div>
  );
};

export default Login;
