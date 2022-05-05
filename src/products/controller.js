const createError = require('http-errors');

const debug = require('debug')('app:module-products-controller');

const { ProductService } = require('./services');
const { Response } = require('../common/response');

module.exports.ProductController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductService.getAll();
            Response.sucess(res, 200, 'Lista de productos', products);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductService.getById(id);
            if (!product) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.sucess(res, 200, `Producto: ${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await ProductService.create(body);
                Response.sucess(res, 201, 'Producto agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { params: { id } } = req
            const { body } = req
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                let updated = await ProductService.update(id, body)
                Response.sucess(res, 200, 'Reemplazado', updated)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { params: { id } } = req
            let deleted = await ProductService.deletee(id)
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
    // DELETE
    generateReport: (req, res) => {
        try {
            ProductService.generateReport('Inventario', res)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};