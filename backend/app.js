const { PORT =  3000 } = process.env;
const express = require('express');
const app = express();

//MongoDB
const mongoose = require('mongoose');

// Errores de celebrate
const { errors } = require('celebrate');

//Loggers de errores y solitudes
const { requestLogger, errorLogger } = require('./middleware/logger')
const { error } = require('winston');

// Routes
const users = require('./routes/users');
const articles = require('./routes/articles');

const cors = require('cors');


mongoose.connect('mongodb://localhost:27017/news_explorer')
.then(() => {
  console.log('Conexión exitosa a aroundb');
})
.catch((error) => {
  console.error('Error conectando a MongoDB:', error);
});


//Habilitar CORS

app.use(cors());
app.options('*', cors());

//Middleware para solicitudes JSON
app.use(express.json())

//Conectamos el logger de solicitudes
app.use(requestLogger);

//Routes de usuarios y Articulos

app.use('/articles', articles);
app.use('/', users);


//Conectamos el logger de errores
app.use(errorLogger);

//Controlador de celebrate para errores
app.use(errors());


// middleware para error 404
app.use(( req, res , next ) => {
  res.status(403).json({
    "message": "You don't have access to this resource"
  })
})

// Manejo de errores
app.use((err, req, res, next) => {
  // Loguear el error usando el logger de errores
  errorLogger.error(err.message || 'Error inesperado', { meta: err });
  res.status(500).send({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {

  console.log(`The server is listening in the port http://localhost:${PORT}/`);

})