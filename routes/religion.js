const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/religion');

router.get('/', contactsController.findAllReligions);

router.get('/:id', contactsController.findOneReligion);

router.post('/', contactsController.addOneReligion);

router.put('/:id', contactsController.updateSingleReligion);

router.delete('/:id', contactsController.deleteReligion);

module.exports = router;