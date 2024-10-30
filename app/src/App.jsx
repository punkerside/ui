// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Theme from './pages/Theme';
import LoginOptions from './pages/LoginOptions';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NewService from './pages/NewService'; // Importa el componente NewService
import userPool from './cognitoConfig';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const userEmail = 'user@example.com'; // Reemplaza este valor con el correo real del usuario autenticado

  useEffect(() => {
    const checkSession = () => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err, session) => {
          if (session && session.isValid()) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
          setLoading(false);
        });
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login-options" />} />
          <Route path="/services" element={isAuthenticated ? <Services setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login-options" />} />
          <Route path="/theme" element={isAuthenticated ? <Theme setIsAuthenticated={setIsAuthenticated} setDarkMode={setDarkMode} darkMode={darkMode} /> : <Navigate to="/login-options" />} />
          <Route path="/login-options" element={<LoginOptions isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/new-service" element={isAuthenticated ? <NewService setIsAuthenticated={setIsAuthenticated} userEmail={userEmail} /> : <Navigate to="/login-options" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
