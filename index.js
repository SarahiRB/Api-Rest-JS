const express = require('express');
const debug = require('debug')('app:main');

const { Config } = require('./src/config');
const { ProductsAPI } = require('./src/products');
const { UsersAPI } = require('./src/users');
const { salesAPI } = require('./src/sales');
const { IndexAPI, NotFoundAPI } = require('./src/index');

const app = express();

app.use(express.json());

IndexAPI(app)
ProductsAPI(app)
UsersAPI(app)
salesAPI(app)
NotFoundAPI(app)

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
});

