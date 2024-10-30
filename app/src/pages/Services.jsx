// src/pages/Services.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';

const Services = ({ setIsAuthenticated }) => {
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
        <h1>Services</h1>
        <p>This is the services page.</p>
      </div>
    </div>
  );
};

export default Services;
