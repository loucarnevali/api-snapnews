const router = require ("express").Router();

const swaggerUi = require ('swagger-ui-express');
// Import my Swagger JSON file
const swaggerDocument =require ('../swagger.json');

router.use('/', swaggerUi.serve);
// Route to set up Swagger UI with the provided Swagger JSON document
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports= router;
