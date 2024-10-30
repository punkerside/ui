// src/pages/NewService.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import axios from 'axios';

const NewService = ({ setIsAuthenticated, userEmail }) => {
  const [serviceName, setServiceName] = useState('');
  const [status, setStatus] = useState('inactive');
  const navigate = useNavigate();

  const getCurrentFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      service_name: serviceName,
      status: status,
      owner: userEmail,
      latest_change: getCurrentFormattedDate(),
    };

    try {
      await axios.post('http://172.23.162.4:8000/services', newService);
      console.log("Service created:", newService);
      navigate('/services');
    } catch (error) {
      console.error("Error creating service:", error);
    }
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
        }}>
          <h2>Create New Service</h2>
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '400px',
            width: '100%',
          }}>
            <input
              type="text"
              placeholder="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
              style={{
                padding: '10px',
                margin: '10px 0',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              margin: '10px 0',
            }}>
              {/* Cambia el tamaño del texto "Status:" */}
              <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Status:</label>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: status === 'active' ? '#20c997' : '#333',
                borderRadius: '15px',
                padding: '5px 10px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '13px' // Cambia el tamaño del texto en el campo de estado
              }} onClick={() => setStatus(status === 'active' ? 'inactive' : 'active')}>
                {status.toUpperCase()}
              </div>
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '15px'
              }}
            >
              Create Service
            </button>
          </form>
        </div>
        <Footer /> {/* Footer al final del contenedor */}
      </div>
    </div>
  );
};

export default NewService;
