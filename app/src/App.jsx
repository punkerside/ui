import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginOptions from './pages/LoginOptions';
import Login from './pages/Login';
import Footer from './components/Footer';
import userPool from './cognitoConfig';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (session && session.isValid()) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '40px' }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login-options" />} />
          <Route path="/login-options" element={<LoginOptions />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
