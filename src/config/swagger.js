const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const path = require('path')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Milk Store API',
      version: '1.0.0',
      description: 'API documentation for Milk Store'
    },
    // servers: [{ url: 'http://localhost:4000' }],
    servers: [{ url: `${process.env.VITE_API_URL}/` }],


    tags: [
      { name: 'App', description: 'Test API' },
      { name: 'Users', description: 'User management' },
      { name: 'Milk', description: 'Milk management' },
      { name: 'Cart', description: 'Shopping cart' },
      { name: 'Knowledge', description: 'Knowledge articles' },
      { name: 'Comment', description: 'Product comments' },
      { name: 'Contact', description: 'Send email' }
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ BearerAuth: [] }] // Áp dụng mặc định cho tất cả API
  },
  apis: [path.join(__dirname, '../routes/*.js')]
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}
