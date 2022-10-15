const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const openCors = require("../middleware/openCors");

router.use(openCors);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/cars', require('./cars'));
router.use('/religion', require('./religion'));

module.exports = router