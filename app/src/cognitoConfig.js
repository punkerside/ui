import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_CjoxA2bkB',
  ClientId: '1ff928076h03393d9a6fqa43ek'
};

const additionalConfig = {
  region: 'us-east-1',
  IdentityPoolId: 'us-east-1:734709a0-4305-4e6d-9785-036315774214',
  UserPoolId: poolData.UserPoolId
};

export default new CognitoUserPool(poolData);
export { additionalConfig };
