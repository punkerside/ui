import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Theme = ({ setIsAuthenticated, setDarkMode, darkMode }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <div className="main-content" style={{
        marginLeft: '250px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <h1>Theme Settings</h1>
          <p>This is the theme settings page.</p>
          <button
            onClick={toggleDarkMode}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: darkMode ? '#666' : '#20c997',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
          </button>
        </div>
        <Footer /> {/* Uso del componente Footer */}
      </div>
    </div>
  );
};

export default Theme;
