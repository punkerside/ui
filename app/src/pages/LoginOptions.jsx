import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';

const LoginOptions = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            margin: '10px',
            padding: '10px',
            width: '100px',
            backgroundColor: '#20c997',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Log in
        </button>
        <span style={{ margin: '1px', fontSize: '13px', color: '#333' }}>or</span> {/* Texto "or" entre los botones */}
        <button
          onClick={() => navigate('/signup')}
          style={{
            margin: '10px',
            padding: '10px',
            width: '100px',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign up
        </button>
      </div>
      <Footer /> {/* Uso del componente Footer */}
    </div>
  );
};

export default LoginOptions;
