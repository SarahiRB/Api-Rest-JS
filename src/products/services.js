const { ObjectId } = require('mongodb');

const { Database } = require('../database');

const { ProductsUtils } = require('./utils');

const COLLECTION = 'products'

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
// delete

const generateReport = async(name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res)
}

module.exports.ProductService = {
    getAll,  // tiene como clave el nombre de la funcion y como valor la funcion
    getById,
    create,
    update,
    deletee,
    generateReport,
}
