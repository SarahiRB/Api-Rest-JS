const express = require('express');

const { salesController } = require('./controller');

const router = express.Router();  // permite desarrollar las rutas independientemente de la aplicacion
// esto simplificaria lo que hicimos en ServidoresWeb, index

module.exports.salesAPI = (app) => {
    router
        .get('/', salesController.getPurchaseRecord)
        .post('/:Uid/:Pid', salesController.userPurchase)
        
    app.use(express.json())
    app.use('/api/sales', router)
}