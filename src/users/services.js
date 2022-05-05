const { ObjectId } = require('mongodb');

const { Database } = require('../database');

const COLLECTION = 'users'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async (id, body) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({ _id: ObjectId(id) }, {$set:{...body}});
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({ _id: ObjectId(id) });
}

module.exports.UserService = {
    getAll,  // tiene como clave el nombre de la funcion y como valor la funcion
    getById,
    create,
    update,
    deletee,
}
