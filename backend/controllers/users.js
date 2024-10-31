require('dotenv').config(); // Cargar variables de entorno desde .env

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d'; 
const bcrypt = require('bcryptjs');

module.exports.getUserInfo = ( req, res ) => {
  User.findById(req.user._id)
  .orFail(()=>{
    const error = new Error('User Not Found')
    error.status = 404;
    throw error;
  })
  .then( user =>{
    res.json(user)
  })
  .catch((err) => {
    const statusCode = err.statusCode || 500;
    res.statuts(statusCode).send({ message:'Error Finding User', error: err.message});
  });
}

module.exports.signInUser = ( req, res ) =>{
  const { email, password } = req.body;

  User.userFinderByCredentials(email,password)
  .then((user) => {
    const payload = {
      _id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION});

    return res.send({token})
  })
  .catch((err) => {
    res.status(401).send({ message: err.message});
  })
}


module.exports.signUpUser = ( req, res ) => {
  const { email, password, name} = req.body;

  if (!email || !password || !name) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios.' });
  }

  bcrypt.hash(password,10)
  .then((hash) => {
    return User.create({email, password: hash , name})
  })
  .then(user => {
    res.status(201).json(user)
  })
  .catch((err) =>{
    if (err.code === 11000) {
      return res.status(409).send({ message: 'Email already exists' });
    }
    res.status(400).send({ message:'Error creating User', error: err.message})
  });
}