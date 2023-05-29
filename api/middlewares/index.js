const ObjectId = require('mongoose').Types.ObjectId

const validateDbId = (req, res, next) => {
    if(ObjectId.isValid(req.params.id) == false){
        res.status(400).json({
            error: `given Object id (${req.params.id}) is not valid.`
        })
    }
    else{
        next();
    }
}

const errorHandler = (error, req, res, next) => {
    res.status(500).json({error})
}

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        error: 'no record with the given _id :' + req.params.id
    })
}

module.exports = {
    errorHandler,
    validateDbId,
    raiseRecord404Error
}