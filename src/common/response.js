const createError = require('http-errors');

module.exports.Response = {
    sucess: (res, status=200, message='OK', body={}) => {
        res.status(status).json({message, body})
    },
    error: (res, error=null, addMessage=null) => {
        const {statusCode, message} = error ? error : new createError.InternalServerError()
        if (addMessage != null) {
            res.status(statusCode).json({message, reason: addMessage})
        } else {
            res.status(statusCode).json({message})
        }
    }
}