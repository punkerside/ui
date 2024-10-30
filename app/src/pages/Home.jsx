// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaUserFriends, FaServicestack } from 'react-icons/fa';
import AWS from 'aws-sdk';
import axios from 'axios';
import cognitoPool, { additionalConfig } from '../cognitoConfig';

const Home = ({ setIsAuthenticated }) => {
  const [userCount, setUserCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    const currentUser = cognitoPool.getCurrentUser();
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    currentUser.getSession((err, session) => {
      if (err) {
        console.error('Error getting session:', err);
        return;
      }

      AWS.config.update({
        region: additionalConfig.region,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: additionalConfig.IdentityPoolId,
          Logins: {
            [`cognito-idp.${additionalConfig.region}.amazonaws.com/${additionalConfig.UserPoolId}`]: session.getIdToken().getJwtToken()
          },
        }),
      });

      AWS.config.credentials.get((err) => {
        if (err) {
          console.error("Error getting credentials", err);
          return;
        }

        const cognito = new AWS.CognitoIdentityServiceProvider();

        const fetchUserCount = async () => {
          try {
            const params = {
              UserPoolId: additionalConfig.UserPoolId,
              Limit: 60,
            };

            let totalUsers = 0;
            let response;

            do {
              response = await cognito.listUsers(params).promise();
              totalUsers += response.Users.length;
              params.PaginationToken = response.PaginationToken;
            } while (response.PaginationToken);

            setUserCount(totalUsers);
          } catch (error) {
            console.error('Error fetching user count:', error);
          }
        };

        const fetchServiceCount = async () => {
          try {
            // Obtiene el token JWT del usuario autenticado
            const token = session.getIdToken().getJwtToken();

            // Llama a la API con el token en el encabezado de autorización
            const response = await axios.get('http://172.23.162.4:8000/services', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            // Filtra los servicios que están activos
            const activeServices = response.data.filter(service => service.status === 'active');
            setServiceCount(activeServices.length); // Solo cuenta los activos
          } catch (error) {
            console.error('Error fetching service count:', error);
          }
        };

        fetchUserCount();
        fetchServiceCount();
      });
    });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <div className="main-content" style={{
        marginLeft: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          textAlign: 'center'
        }}>
          <h1>Welcome!</h1>
          <p style={{ fontSize: '13px' }}>This is the home page.</p>
          
          {/* Contenedor de las tarjetas */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
            {/* Tarjeta de Usuarios */}
            <div style={{
              backgroundColor: '#1c1c1e',
              color: '#fff',
              padding: '20px',
              borderRadius: '10px',
              width: '150px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <FaUserFriends size={40} color="#20c997" />
              <h2 style={{ fontSize: '2em', margin: '10px 0' }}>{userCount}</h2>
              <p>Users in Cognito</p>
              <div style={{
                height: '5px',
                backgroundColor: '#20c997',
                borderRadius: '5px',
                position: 'absolute',
                bottom: '10px',
                left: '20px',
                right: '20px'
              }}></div>
            </div>

            {/* Tarjeta de Servicios */}
            <div style={{
              backgroundColor: '#1c1c1e',
              color: '#fff',
              padding: '20px',
              borderRadius: '10px',
              width: '150px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <FaServicestack size={40} color="#20c997" />
              <h2 style={{ fontSize: '2em', margin: '10px 0' }}>{serviceCount}</h2>
              <p>Active Services</p>
              <div style={{
                height: '5px',
                backgroundColor: '#20c997',
                borderRadius: '5px',
                position: 'absolute',
                bottom: '10px',
                left: '20px',
                right: '20px'
              }}></div>
            </div>
          </div>
        </div>

        {/* Footer siempre al fondo */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
