const express = require('express');

const { ProductController } = require('./controller');

const router = express.Router();  // permite desarrollar las rutas independientemente de la aplicacion
// esto simplificaria lo que hicimos en ServidoresWeb, index

module.exports.ProductsAPI = (app) => {
    router
        .get('/', ProductController.getProducts)  // http://localhost:3000/api/products/
        .get('/report', ProductController.generateReport)  // antes del /:id para no generar conflicto
        .get('/:id', ProductController.getProduct)  // http://localhost:3000/api/products/14
        .put('/:id', ProductController.updateProduct)
        .post('/', ProductController.createProduct)
        .delete('/:id', ProductController.deleteProduct)
    // delete
    app.use(express.json())
    app.use('/api/products', router)
}