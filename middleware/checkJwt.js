const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwksExpressJwtSecretOptions = {
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH_URL}.well-known/jwks.json` || 'https://grayandkatie.us.auth0.com/.well-known/jwks.json'
};
const jwtOptions = {
    secret: jwks.expressJwtSecret(jwksExpressJwtSecretOptions),
    audience: process.env.BASE_URL || 'http://localhost:3002',
    issuer: process.env.AUTH_URL || 'https://grayandkatie.us.auth0.com/',
    algorithms: ['RS256']
};
const jwtCheck = jwt(jwtOptions);

module.exports = jwtCheck;