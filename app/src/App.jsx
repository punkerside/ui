// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginOptions from './pages/LoginOptions';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import userPool from './cognitoConfig';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSession = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (session && session.isValid()) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false); // Fin de la verificación de sesión
      });
    } else {
      setIsAuthenticated(false);
      setLoading(false); // Fin de la verificación de sesión
    }
  };

  useEffect(() => {
    checkSession();
  }, []); // Ejecuta checkSession solo al montar el componente

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras verifica la sesión
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '40px' }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login-options" />} />
          <Route path="/login-options" element={<LoginOptions isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
