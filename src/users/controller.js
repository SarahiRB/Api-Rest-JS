const createError = require('http-errors');

const debug = require('debug')('app:module-products-controller');

const { UserService } = require('./services');
const { Response } = require('../common/response');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UserService.getAll();
            Response.sucess(res, 200, 'Lista de usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UserService.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.sucess(res, 200, `Usuario: ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await UserService.create(body);
                Response.sucess(res, 201, 'Usuario agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { params: { id } } = req
            const { body } = req
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                let updated = await UserService.update(id, body)
                Response.sucess(res, 200, 'Reemplazado', updated)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { params: { id } } = req
            let deleted = await UserService.deletee(id)
            if (deleted.deletedCount === 0) {
                Response.error(res, new createError.NotFound())
            } else {
                Response.sucess(res, 200, 'Eliminado', deleted)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
};