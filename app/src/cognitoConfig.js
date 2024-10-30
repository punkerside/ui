import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_ABCDEF123', // Cambia por tu User Pool ID
  ClientId: 'ABCDEF12345'            // Cambia por tu App Client ID
};

export default new CognitoUserPool(poolData);
