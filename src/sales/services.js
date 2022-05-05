const { Database } = require('../database');

const COLLECTION = 'sales'

const { ProductService } = require('../products/services');
const { UserService } = require('../users/services');

const purchaseRecord = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray()
}

// const userPurchaseRecord = async (purchaseId) => {
//     const collection = await Database(COLLECTION);
//     return collection.findOne({ _id: ObjectId(purchaseId) });
// }

const purchase = async (userId, productId, reqBody) => {
    const collection = await Database(COLLECTION);
    
    let product = await ProductService.getById(productId);
    let user = await UserService.getById(userId);

    if (product.amount >= reqBody.amount) {
        ProductService.update(productId, {"amount": product.amount - reqBody.amount});
        delete product.amount
        if (await collection.findOne({user: user.name}) === null) {
            let result = await collection.insertOne({user: user.name, purchase: [{...product, amount: reqBody.amount, total: product.price*reqBody.amount}]})
            return result.insertedId
        } else {
            let result = await collection.updateOne({user: user.name}, {$push: {purchase: {...product, amount: reqBody.amount, total: product.price*reqBody.amount}}})
            return result
        }
    } else {
        return
    }
}

module.exports.saleService = {
    purchaseRecord,
    purchase,
}