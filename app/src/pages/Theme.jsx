// src/pages/Theme.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';

const Theme = ({ setIsAuthenticated }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <div style={{
        marginLeft: '250px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
      }}>
        <h1>Theme</h1>
        <p>This is the theme page.</p>
      </div>
    </div>
  );
};

export default Theme;
