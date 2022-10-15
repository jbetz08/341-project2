const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const findAllReligions = async (req, res) => {
    const result = await mongodb.getDb().db().collection('religion').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const findOneReligion = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('religion').find({ _id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const addOneReligion = async (req, res) => {
    const religion = {
        name: req.body.name,
        members: req.body.members
    };
    const response = await mongodb.getDb().db().collection('religion').insertOne(religion);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the religion.');
    }
};

const updateSingleReligion = async (req, res) => {
    const userId = new Object(req.params.id);
    const religion = {
        name: req.body.name,
        members: req.body.members
    };

    const response = await mongodb.getDb().db().collection('religion').replaceOne({ _id: userId }, religion);

    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the religion.');
    }
};

const deleteReligion = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('religion').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the religion.');
    }
};


module.exports = {
    findAllReligions,
    findOneReligion,
    addOneReligion,
    updateSingleReligion,
    deleteReligion
};