const express = require('express');

const { UsersController } = require('./controller');

const router = express.Router();  // permite desarrollar las rutas independientemente de la aplicacion
// esto simplificaria lo que hicimos en ServidoresWeb, index

module.exports.UsersAPI = (app) => {
    router
        .get('/', UsersController.getUsers)
        .get('/:id', UsersController.getUser)
        .put('/:id', UsersController.updateUser)
        .post('/', UsersController.createUser)
        .delete('/:id', UsersController.deleteUser)
    // delete
    app.use(express.json())
    app.use('/api/users', router)
}