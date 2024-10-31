require('dotenv').config(); // Cargar variables de entorno desde .env
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const handleAuthError = ( res, message = 'Authentication Error') => {
  res.status(401).send({ message })
}

const extractBearerToken = ( header ) => {
  return header.replace('Bearer ', '');
}

module.exports = ( req, res, next) => {
  const { authorization } = req.headers;

  if( !authorization || !authorization.startsWith('Bearer ')){
    return handleAuthError(res,'Authorization token missing or malformed');
  }

  const token = extractBearerToken(authorization);

  let payload;

  try{
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err)
    return handleAuthError(res, 'Invalid or expired token');
  }

  req.user = req.user || {};
  req.user._id = payload._id;


  next()
}