const swaggerRoute = require ("express").Router();

const swaggerUi = require ('swagger-ui-express');
// Import my Swagger JSON file
const swaggerDocument = require ('../swagger.json');

swaggerRoute.use('/', swaggerUi.serve);
// Route to set up Swagger UI with the provided Swagger JSON document
swaggerRoute.get('/', swaggerUi.setup(swaggerDocument));

module.exports= swaggerRoute;
