const { MongoClient } = require('mongodb');  // mongodb trabaja de forma asiconcronica
const debug = require('debug')('app:module-database');

const { Config } = require('../config');

var connection = null;
module.exports.Database = (collection) =>
new Promise(async (resolve, reject) => {
        try {
            if (!connection) {  // si no hay conexion la crea
                const client = new MongoClient(Config.mongoUri);  // hace un nuevo cliente
                connection = await client.connect();  // lo conecta, el await es porque es asincronico
                debug('Nueva conexion realizada con MongoDB');
            }
            debug('Reutilizando conexion');
            const db = connection.db(Config.mongoDbName);  // se conecta a la anterior conexion
            resolve(db.collection(collection));  // obtiene la coleccion 'collection'
        } catch (error) {
            reject(error);  // si hay un error
        }
    }
    )