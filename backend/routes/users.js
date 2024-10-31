const users = require('express').Router();
const { getUserInfo, signUpUser, signInUser} = require('../controllers/users');
const { celebrate, Joi} = require('celebrate');
const auth = require('../middleware/auth');


users.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  })
}) ,signInUser);

users.post('/signup',celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required()
  })
}) , signUpUser);

users.use(auth);

users.get('/users/me', getUserInfo);


module.exports = users;