require('dotenv').config();

// module.exports es un objeto
module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DBNAME
}
