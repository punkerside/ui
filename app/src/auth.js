import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from './cognitoConfig';

// Función para iniciar sesión
export const login = (Username, Password) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username, Password });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => resolve(session),
      onFailure: (err) => reject(err),
    });
  });
};

// Función para registrar un usuario
export const signUp = (Username, Password, attributes = []) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(Username, Password, attributes, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
