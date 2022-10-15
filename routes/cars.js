const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/cars');

router.get('/', contactsController.findAllCars);

router.get('/:id', contactsController.findOneCar);

router.post('/', contactsController.createOneCar);

router.put('/:id', contactsController.updateEntireCar);

router.delete('/:id', contactsController.deleteEntireCar);

module.exports = router;