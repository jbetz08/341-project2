const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/cars');
const validation = require('../middleware/validation');

router.get('/', contactsController.findAllCars);

router.get('/:id', contactsController.findOneCar);

router.post('/', validation.saveCar, contactsController.createOneCar);

router.put('/:id', validation.saveCar, contactsController.updateEntireCar);

router.delete('/:id', contactsController.deleteEntireCar);

module.exports = router;