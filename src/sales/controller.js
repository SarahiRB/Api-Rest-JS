const createError = require('http-errors');

const debug = require('debug')('app:module-products-controller');

const { saleService } = require('./services');
const { Response } = require('../common/response');

module.exports.salesController = {
    getPurchaseRecord: async (req, res) => {
        try {
            let shopping = await saleService.purchaseRecord()
            Response.sucess(res, 200, 'Registro de compras', shopping)
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    }, 
    userPurchase: async (req, res) => {
        try {
            let {params: {Uid, Pid}} = req;
            let purchase = await saleService.purchase(Uid, Pid, req.body);
            if (!purchase) {
                Response.error(res, new createError.BadRequest(), 'La cantidad que pide excede nuestro almacenamiento')
            } else {
                Response.sucess(res, 200, 'Compra realizada', purchase);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    }
}