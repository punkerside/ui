import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Home = ({ setIsAuthenticated }) => {
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
          <h1>Welcome!</h1>
          <p>This is the home page.</p>
        </div>
        <Footer /> {/* Uso del componente Footer */}
      </div>
    </div>
  );
};

export default Home;
