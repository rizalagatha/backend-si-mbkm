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
          url: 'https://backend-si-mbkm.vercel.app',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);

console.log(swaggerDocs);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      docExpansion: 'none',
    },
    customJs: `
      window.onload = function() {
        document.querySelector('.topbar-wrapper .link').innerText = 'SI-MBKM API Documentation'; // Ganti dengan teks yang Anda inginkan
      };
    `,
  }));
};
