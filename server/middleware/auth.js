const jwt = require('jsonwebtoken');
const ClientError = require('../client-error');
require('dotenv/config');

// Get the id of the user from the jwt token
module.exports = (req, res, next) => {
  // Get the token from header
  const token = req.header('x-auth-token');

  if (!token) {
    return next(new ClientError('No token found, authorization denied', 401));
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    // decoded is user: { id: xxx }
    req.user = decoded.user;
    next();
  } catch (err) {
    next(new ClientError('Invalid token', 401));
  }
};
