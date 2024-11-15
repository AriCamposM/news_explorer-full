# 📄 News Explorer

**News Explorer** es una aplicación web que permite a los usuarios explorar noticias de diversas fuentes en tiempo real, filtrar temas de interés, y guardar noticias favoritas. Esta aplicación utiliza dos APIs: una API personalizada desarrollada para gestionar usuarios y el guardado de noticias, y la API de terceros [News API](https://newsapi.org/) para obtener noticias actualizadas de una variedad de fuentes.

## Enlace al Proyecto

Puedes ver el proyecto en vivo aquí: [News Explorer](https://api.aricampos.ddnsfree.top)

## 🌟 Características

- **Exploración de Noticias en Tiempo Real**: Acceso a noticias actuales a través de la API de News API.
- **Búsqueda y Filtrado**: Búsqueda por palabras clave y fechas.
- **Creación y Guardado de Noticias**: Los usuarios pueden crear noticias propias y guardar otras en sus favoritos usando la API personalizada.
- **Autenticación de Usuarios**: Sistema seguro de registro e inicio de sesión para mantener los datos personales de los usuarios.

## 🚀 Tecnologías Utilizadas

- **Frontend**: React.js, CSS (con algún framework como Tailwind o Bootstrap)
- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB (para almacenar usuarios, noticias personalizadas y guardadas)
- **API Externa**: [News API](https://newsapi.org/) para obtener noticias en tiempo real
- **Autenticación**: JSON Web Tokens (JWT) para autenticación segura de usuarios en la API personalizada

## 📦 Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

1. **Clonar el repositorio**:
```bash
git clone https://github.com/tu-usuario/news-explorer.git
cd news-explorer
```

2. **Instalar dependencias: Asegúrate de que tienes Node.js y npm instalados. Luego, ejecuta**:
  ```bash
  npm install
  ```
    

3. **Configuración de variables de entorno: Crea un archivo .env en la raíz del proyecto y define las siguientes variables**:
  ```bash
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/news-explorer
    JWT_SECRET=tuSecretoJWT
    NEWS_API_KEY=tuClaveAPIdeNoticias
  ```

4. **Ejecutar la aplicación**:
  ```bash
    npm start
  ```

## 🧩 Estructura del Proyecto
```bash
📁 news-explorer
├── 📁 frontend         # Código del frontend
├── 📁 backend          # Código del backend
│   ├── 📁 config       # Configuración (base de datos, autenticación)
│   ├── 📁 models       # Modelos de MongoDB
│   ├── 📁 controllers  # Lógica del backend
│   └── 📁 routes       # Rutas de la API personalizada
└── README.md
```

# 📄 Documentación de la API

Esta es la documentación para la API interna utilizada en el proyecto **News Explorer**. La API se encarga de la autenticación de usuarios y la gestión de noticias guardadas. 

## 🌐 URL Base

La API se encuentra en: 

`https://api.arinews.utdnews.com`

---

## 🔑 Autenticación de Usuarios

La autenticación de usuarios se maneja utilizando **JSON Web Tokens (JWT)**. A continuación se detallan los endpoints para registro, inicio de sesión y obtención de información de usuario.

### 1. **POST `/signup`** - Registro de un nuevo usuario

Este endpoint permite registrar a un nuevo usuario en la plataforma.

- **Body**:
  ```json
  {
    "email": "usuario@dominio.com",
    "password": "contraseñaSegura123",
    "name": "Nombre del Usuario"
  }

Respuestas:
- 201 Created: Usuario registrado exitosamente.
- 400 Bad Request: Si el formato de los datos es incorrecto.

### 2. **POST `/signin`** - Inicio de sesión
Este endpoint permite a los usuarios autenticarse con su correo electrónico y contraseña para obtener un token JWT.
- **Body**:
  ```json
  {
  "email": "usuario@dominio.com",
  "password": "contraseñaSegura123"
  }
Respuestas:

- 200 OK: Retorna el token JWT.
- 401 Unauthorized: Si las credenciales son incorrectas.

### 3. **GET `/users/me`** - Obtener Información del Usuario
Este endpoint retorna los datos del usuario autenticado (requiere un token JWT válido en el encabezado Authorization).

- Headers:

  - Authorization: Bearer <token>

- Respuestas:

  - 200 OK: Retorna los datos del usuario.
  - 401 Unauthorized: Si el token JWT es inválido o ha expirado.

## 📰 Gestión de Noticias

La API permite a los usuarios guardar noticias en sus favoritos, obtener una lista de noticias guardadas y eliminar noticias guardadas.

### 1. **GET `/articles`** - Obtener Artículos Guardados
Este endpoint permite obtener la lista de artículos guardados por el usuario autenticado.

- Headers:

  - Authorization: Bearer <token>
- Respuestas:
  - 200 OK: Retorna un arreglo con las noticias guardadas.
  - 401 Unauthorized: Si el token JWT es inválido o no está presente.

### 2. **POST `/articles`** - Guardar una Nueva Noticia
Este endpoint permite al usuario guardar una nueva noticia en sus favoritos. El cuerpo de la solicitud debe contener los detalles de la noticia.

- **Body**:

```json
  {
  "keyword": "tecnología",
  "title": "Título de la noticia",
  "description": "Descripción breve de la noticia",
  "date": "2023-11-15",
  "source": "Nombre de la fuente",
  "url": "https://example.com/noticia",
  "urlToImage": "https://example.com/imagen.jpg"
  }
```

- Respuestas:

  - 201 Created: Noticia guardada correctamente.
  - 400 Bad Request: Si los datos no cumplen con los requisitos de validación.

### **3. DELETE `/articles/`**
- Eliminar una Noticia Guardada
Este endpoint permite eliminar una noticia guardada previamente por el usuario.

- Parameters:

  - articleId: ID de la noticia a eliminar.

- Headers:
  - Authorization: Bearer <token>

-Respuestas:
  - 200 OK: Noticia eliminada correctamente.
  - 404 Not Found: Si no se encuentra la noticia con el articleId proporcionado.
  - 401 Unauthorized: Si el token JWT es inválido o no está presente.

## 🔐 Seguridad y Autenticación
La API utiliza JSON Web Tokens (JWT) para la autenticación de usuarios. El token se debe incluir en el encabezado de la solicitud Authorization como un Bearer token para acceder a los endpoints protegidos, como **GET** `/users/me` y **GET** `/articles`.
El proceso de inicio de sesión genera un token que el usuario debe almacenar y utilizar para futuras interacciones con la API.
- 🚨 Manejo de Errores
  - `400 Bad Request:` Indica que los datos proporcionados en la solicitud son incorrectos o no cumplen con los requisitos de validación.
  - `401 Unauthorized:` Ocurre cuando el usuario no está autenticado o el token JWT no es válido.
  - `404 Not Found:` Indica que el recurso solicitado no fue encontrado.
  - `500 Internal Server Error:` Error inesperado en el servidor.

- 🎯 Ejemplo de Respuestas
  - Ejemplo de Respuesta Exitosa al Guardar una Noticia
```json
{
  "id": "12345",
  "keyword": "tecnología",
  "title": "Título de la noticia",
  "description": "Breve descripción de la noticia",
  "date": "2023-11-15",
  "source": "Fuente de la noticia",
  "url": "https://example.com/noticia",
  "urlToImage": "https://example.com/imagen.jpg"
}
```

  - Ejemplo de Respuesta de Error 401 (Token no autorizado)
```json
{
  "message": "Authorization required"
}
```
  - Ejemplo de Respuesta de Error 400 (Solicitud Incorrecta)
```json
{
  "message": "Invalid request body"
}
```

## 💡 Notas
Todos los endpoints que requieren autenticación deben incluir un token JWT en el encabezado `Authorization`.
Se utiliza el middleware celebrate para la validación de los datos en las solicitudes, asegurando que se cumplan los requisitos del cuerpo de la solicitud, como el formato de los campos y la obligatoriedad de los mismos.

