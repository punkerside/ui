import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_CjoxA2bkB',
  ClientId: '1ff928076h03393d9a6fqa43ek'
};

export default new CognitoUserPool(poolData);
