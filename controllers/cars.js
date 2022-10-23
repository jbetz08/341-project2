const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const findAllCars = (req, res) => {
    mongodb
    .getDb()
    .db()
    .collection('cars')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const findOneCar = (req, res) => {
    const userId = new ObjectId(req.params.id);
    mongodb
    .getDb()
    .db()
    .collection('cars')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createOneCar = async (req, res) => {
    const car = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        miles: req.body.miles,
        mpg: req.body.mpg,
        electric: req.body.electric
    };
    const response = await mongodb.getDb().db().collection('cars').insertOne(car);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the car.');
    }
};

const updateEntireCar = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid car id to update a contact.');
    }
    const userId = new Object(req.params.id);
    const car = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        miles: req.body.miles,
        mpg: req.body.mpg,
        electric: req.body.electric
    };

    const response = await mongodb.getDb().db().collection('cars').replaceOne({ _id: userId }, car);

    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the car.');
    }
};

const deleteEntireCar = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid car id to delete a car.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('cars').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the car.');
    }
};


module.exports = {
    findAllCars,
    findOneCar,
    createOneCar,
    updateEntireCar,
    deleteEntireCar
};