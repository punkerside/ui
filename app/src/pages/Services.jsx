// src/pages/Services.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Services = ({ setIsAuthenticated }) => {
  const [services, setServices] = useState([]); // Estado para almacenar los datos de los servicios
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el campo de búsqueda
  const navigate = useNavigate();

  // Función para obtener los datos de la API
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://172.23.162.4:8000/services');
      // Agregamos un campo "localStatus" a cada servicio para manejar el estado local del interruptor
      const servicesWithLocalStatus = response.data.map(service => ({
        ...service,
        localStatus: service.status === 'active' ? 'ON' : 'OFF'
      }));
      setServices(servicesWithLocalStatus);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Llama a fetchServices cuando el componente se monta
  useEffect(() => {
    fetchServices();
  }, []);

  // Filtrado de servicios basado en el término de búsqueda
  const filteredServices = services.filter(service =>
    service.service_name && service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para alternar el estado del interruptor
  const toggleStatus = (index) => {
    setServices(prevServices => {
      const updatedServices = [...prevServices];
      updatedServices[index].localStatus = updatedServices[index].localStatus === 'ON' ? 'OFF' : 'ON';
      return updatedServices;
    });
  };

  // Función para formatear la fecha `latest_change`
  const formatDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = dateString.slice(8, 10);
    const minute = dateString.slice(10, 12);
    return `${year}-${month}-${day} ${hour}:${minute}`;
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
          padding: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Services</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search services"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  marginRight: '10px'
                }}
              />
              <button
                onClick={() => navigate('/new-service')}
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                New
              </button>
            </div>
          </div>
          {/* Tabla de servicios */}
          <table className="table-content" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Latest Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={service.service_name}>
                  <td>{service.service_name}</td>
                  <td>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '5px',
                        borderRadius: '15px',
                        border: '1px solid #ddd',
                        backgroundColor: service.localStatus === 'ON' ? '#20c997' : '#333',
                        width: '60px',
                        justifyContent: service.localStatus === 'ON' ? 'space-between' : 'space-between',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleStatus(index)}
                    >
                      {service.localStatus === 'ON' ? (
                        <>
                          <span style={{ color: '#fff', fontSize: '12px', marginLeft: '5px' }}>ON</span>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                          }}></div>
                        </>
                      ) : (
                        <>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                          }}></div>
                          <span style={{ color: '#fff', fontSize: '12px', marginRight: '5px' }}>OFF</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{service.owner}</td>
                  <td>{formatDate(service.latest_change)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Services;
