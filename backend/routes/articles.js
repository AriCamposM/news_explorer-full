const articles = require('express').Router();
const { getArticles, postArticle, deleteArticle } = require('../controllers/articles');

const { celebrate, Joi} = require('celebrate');

const auth = require('../middleware/auth');


articles.use(auth);

articles.get('/', getArticles);

articles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().uri().required(),
    urlToImage: Joi.string().uri().required(),
  })
})  ,postArticle);

articles.delete('/:articleId', deleteArticle);


module.exports = articles;