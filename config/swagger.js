// config/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SI-MBKM API',
      version: '1.0.0',
      description: 'Dokumentasi API untuk Sistem MBKM',
    },
    servers: [
      {
        url: 'https://backend-si-mbkm.vercel.app', // URL server Anda
      },
    ],
  },
  apis: ['./routes/*.js'], // Lokasi file route atau controller
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
